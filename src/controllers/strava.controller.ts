import { error } from 'elysia';

import {
  createStravaAthlete,
  createStravaToken,
} from '@/db/services/strava.services';
import {
  STRAVA_CLIENT_ID,
  STRAVA_CLIENT_SECRET,
  STRAVA_REDIRECT_URI,
  STRAVA_WEBHOOK_URL,
} from '@/env';
import { ElysiaContext } from '@/types/elysia-context.types';

const getStravaOauth = ({ set, user }: ElysiaContext) => {
  const url = new URL('https://strava.com/oauth/authorize');

  const redirectUri = user
    ? `${STRAVA_REDIRECT_URI}?userId=${user.id}`
    : STRAVA_REDIRECT_URI;

  url.searchParams.set('client_id', STRAVA_CLIENT_ID);
  url.searchParams.set('approval_prompt', 'force');
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('redirect_uri', redirectUri);
  url.searchParams.set('scope', 'activity:read_all');

  set.status = 200;

  return { message: 'Redirecting to Strava', url: url.toString() };
};

const createSubscription = async () => {
  const url = new URL('https://www.strava.com/api/v3/push_subscriptions');

  url.searchParams.set('client_id', STRAVA_CLIENT_ID);
  url.searchParams.set('client_secret', STRAVA_CLIENT_SECRET);
  url.searchParams.set('callback_url', STRAVA_WEBHOOK_URL);
  url.searchParams.set('verify_token', 'STRAVA');

  const response = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  const data = await response.json();

  return { data };
};

const subscribeWebhook = ({ query, set }: ElysiaContext) => {
  const { mode, verify_token, challenge } = query;

  if (mode !== 'subscribe' || verify_token !== 'STRAVA') {
    set.status = 400;
    return { message: 'Invalid request' };
  }

  if (challenge) {
    set.status = 200;
    return { message: challenge };
  }

  return { message: 'Webhook subscribed' };
};

const exchangeStravaToken = async ({ query, set }: ElysiaContext) => {
  const { code, userId } = query;

  if (!code) {
    set.status = 400;
    return { message: 'No code provided' };
  }

  const url = new URL('https://www.strava.com/oauth/token');

  url.searchParams.set('client_id', STRAVA_CLIENT_ID);
  url.searchParams.set('client_secret', STRAVA_CLIENT_SECRET);
  url.searchParams.set('code', code);
  url.searchParams.set('grant_type', 'authorization_code');

  const response = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  const data = await response.json();

  const { access_token, refresh_token, expires_at, expires_in, athlete } = data;

  const stravaAthlete = await createStravaAthlete(athlete);

  await createStravaToken({
    accessToken: access_token,
    refreshToken: refresh_token,
    expiresAt: expires_at,
    expiresIn: expires_in,
    stravaAthleteId: stravaAthlete.id,
    userId: userId,
  });

  try {
    await createSubscription();

    set.status = 200;
    return { message: 'Strava token successfully created' };
  } catch (err) {
    return error(500, { message: 'Failed to create subscription', error: err });
  }
};

export default { getStravaOauth, exchangeStravaToken, subscribeWebhook };

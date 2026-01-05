import { error } from 'elysia';

import {
  createStravaActivities,
  createStravaActivity,
  createStravaAthlete,
  createStravaToken,
  findStravaTokenByUserId,
  findUserByStravaAthleteId,
  updateStravaToken,
} from '@/db/services/strava.services';
import {
  STRAVA_CLIENT_ID,
  STRAVA_CLIENT_SECRET,
  STRAVA_REDIRECT_URI,
  STRAVA_WEBHOOK_URL,
} from '@/env';
import { InferInsertType } from '@/types/drizzle.types';
import { ElysiaContext } from '@/types/elysia-context.types';
import { transformStravaActivity } from '@/utils/transform-keys.utils';

const getStravaOauth = ({ set, user }: ElysiaContext) => {
  const url = new URL('https://strava.com/oauth/authorize');

  const redirectUri = user
    ? `${
        STRAVA_REDIRECT_URI ||
        'http://localhost:9091/api/v1/strava/exchange-token'
      }?userId=${user.id}`
    : `${
        STRAVA_REDIRECT_URI ||
        'http://localhost:9091/api/v1/strava/exchange-token'
      }`;

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
  const verifyToken = query['hub.verify_token'];
  const mode = query['hub.mode'];

  if (mode !== 'subscribe' || verifyToken !== 'STRAVA') {
    set.status = 400;
    return { message: 'Invalid request' };
  }

  set.status = 200;
  return { 'hub.challenge': query['hub.challenge'], 'hub.mode': mode };
};

const refreshStravaToken = async ({ query, set }: ElysiaContext) => {
  const { code, userId } = query;

  if (!code) {
    set.status = 400;
    return false;
  }

  const stravaToken = await findStravaTokenByUserId(userId);

  if (!stravaToken) {
    set.status = 404;
    return false;
  }

  const url = new URL('https://www.strava.com/oauth/token');

  url.searchParams.set('client_id', STRAVA_CLIENT_ID);
  url.searchParams.set('client_secret', STRAVA_CLIENT_SECRET);
  url.searchParams.set('grant_type', 'refresh_token');
  url.searchParams.set('refresh_token', stravaToken.refreshToken);

  const response = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  const data: any = await response.json();

  await updateStravaToken(
    {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresAt: data.expires_at,
      expiresIn: data.expires_in,
      stravaAthleteId: stravaToken.stravaAthleteId,
      userId: userId,
    },
    stravaToken.id,
  );

  await createSubscription();
  saveUserActivities(userId);

  set.status = 200;
  return true;
};

const exchangeStravaToken = async ({
  query,
  set,
  redirect,
  ...rest
}: ElysiaContext) => {
  const { code, userId } = query;

  const isUserExists = await findStravaTokenByUserId(userId);

  if (isUserExists) {
    const isRefreshed = await refreshStravaToken({
      query,
      set,
      redirect,
      ...rest,
    });
    if (isRefreshed) {
      return redirect('com.trekhive.mobile://');
    }
    return { message: 'Strava token not found' };
  }

  if (!code) {
    set.status = 400;
    return redirect('com.trekhive.mobile://');
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

  const data: any = await response.json();

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
    saveUserActivities(userId);

    set.status = 200;
    return redirect('com.trekhive.mobile://');
  } catch (err) {
    return error(500, { message: 'Failed to create subscription', error: err });
  }
};

const handleWebhook = async ({ body, set }: ElysiaContext) => {
  const { object_id, owner_id } = body as {
    object_id: string;
    owner_id: string;
  };

  const user = await findUserByStravaAthleteId(owner_id);

  if (!user) {
    set.status = 404;
    return { message: 'User not found' };
  }

  await syncStravaActivity(user.id, object_id);
  set.status = 200;
  return { message: 'Webhook received' };
};

const syncStravaActivity = async (userId: string, activityId: string) => {
  const { data: activity } = (await getStravaActivity(userId, activityId)) as {
    data: Record<string, unknown>;
  };

  const transformedActivity = transformStravaActivity(activity);
  const stravaActivity = await createStravaActivity(
    transformedActivity as unknown as InferInsertType<'stravaActivities'>,
  );

  return { activity: stravaActivity };
};

const getStravaActivity = async (userId: string, activityId: string) => {
  const url = new URL(
    `https://www.strava.com/api/v3/athlete/activities/${activityId}`,
  );

  const stravaToken = await findStravaTokenByUserId(userId);

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${stravaToken.accessToken}`,
    },
  });

  const data = await response.json();

  return { data };
};

const saveUserActivities = async (userId: string) => {
  const url = new URL('https://www.strava.com/api/v3/athlete/activities');

  const stravaToken = await findStravaTokenByUserId(userId);

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${stravaToken.accessToken}`,
    },
  });

  const data: Record<string, unknown>[] = await response.json();

  const activities = data.map((activity) => transformStravaActivity(activity));

  const stravaActivities = await createStravaActivities(
    activities as unknown as InferInsertType<'stravaActivities'>[],
  );

  return { data: stravaActivities };
};

export default {
  getStravaOauth,
  exchangeStravaToken,
  subscribeWebhook,
  handleWebhook,
  refreshStravaToken,
};

import { generateState } from "oslo/oauth2";
import { Route } from "@/types/route.types";
import { microsoftOAuth } from "@/apps/microsoft";

const loginMicrosoft: Route = async (_, res) => {
  try {
    const microsoftOAuth2State = generateState();

    const authorizationURL = await microsoftOAuth.createAuthorizationURL({
      state: microsoftOAuth2State,
      scopes: [
        "openid",
        "profile",
        "email",
        "offline_access",
        "https://graph.microsoft.com/Calendars.ReadBasic",
        "https://graph.microsoft.com/Calendars.Read",
        "https://graph.microsoft.com/Calendars.Read.Shared",
        "https://graph.microsoft.com/Calendars.ReadWrite",
        "https://graph.microsoft.com/Calendars.ReadWrite.Shared",
      ],
    });

    res.redirect(authorizationURL.toString() + "&prompt=select_account");
  } catch (error) {
    res.status(500).json(error);
  }
};

const microsoftCallback: Route = async (req, res) => {
  try {
    const { access_token } = await microsoftOAuth.validateAuthorizationCode(
      String(req.query.code),
      {
        credentials: Bun.env.MICROSOFT_CLIENT_SECRET,
        authenticateWith: "request_body",
      }
    );

    res.status(200).json(access_token);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default { loginMicrosoft, microsoftCallback };

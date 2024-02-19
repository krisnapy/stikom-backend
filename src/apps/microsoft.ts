import { OAuth2Client } from "oslo/oauth2";

export const microsoftOAuth = new OAuth2Client(
  Bun.env.MICROSOFT_CLIENT_ID,
  `https://login.microsoftonline.com/${Bun.env.MICROSOFT_TENANT_ID}/oauth2/v2.0/authorize`,
  `https://login.microsoftonline.com/${Bun.env.MICROSOFT_TENANT_ID}/oauth2/v2.0/token`,
  {
    redirectURI: "http://localhost:9091/api/v1/microsoft/callback",
  }
);

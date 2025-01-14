import { DesktopIAPOptions, ClientFetcher } from "./types";

const oauthTokenBaseUrl = new URL("https://www.googleapis.com/oauth2/v4/token");

export async function getClientToken(
  options: DesktopIAPOptions,
  refreshToken: string,
  fetcher: ClientFetcher = fetch,
): Promise<string> {
  const body = {
    client_id: options.clientId,
    client_secret: options.clientSecret,
    refresh_token: refreshToken,
    grant_type: "refresh_token",
    audience: options.iapClientId,
  };

  const request = await fetcher(oauthTokenBaseUrl, {
    body: JSON.stringify(body),
    method: "POST",
  });

  const response = await request.json();

  return String(response["id_token"]);
}

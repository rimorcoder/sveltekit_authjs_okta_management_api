# SvelteKit Auth with Auth.js for Okta API Management

This app demonstrates how to interact with Okta APIs by using scoped OAuth 2.0 access tokens.
See https://developer.okta.com/docs/guides/implement-oauth-for-okta/main/

## Install

```bash
git clone https://github.com/rimorcoder/sveltekit_authjs.git
cd sveltekit-authjs
npm install
```

## Get Auth Credentials

You will need to get credentials for the providers you want to use.

### Okta

1. Go to Okta and login.
2. Click on Applications.
3. Click on Create App Integration.
4. Select `Web` and click `Next`.
5. Give your app a name, such as `sveltekit-auth-okta`.
6. For the redirect URI, use `http://localhost:5173/auth/callback/okta`.
6. Assign users to the application.
7. Copy the Client ID, Client Secret, and Issuer URL.

See the [Auth.js providers](https://authjs.dev/getting-started/authentication/oauth) for more information.   

## Configure Environment Variables

Create a `.env` file with the following. Comment out the providers you are not using. AUTH_SECRET is required.

```bash
AUTH_SECRET={AUTH_SECRET}
AUTH_TRUST_HOST=TRUE

AUTH_OKTA_ID={CLIENT_ID}
AUTH_OKTA_SECRET={CLIENT_SECRET}
AUTH_OKTA_ISSUER={ISSUER_URL}

PUBLIC_OKTA_DOMAIN={OKTA_DOMAIN i.e dev-123456.okta.com}
```

## Run Development

```bash
npm run dev
```

## Use
1. Go to localhost:5173
2. Click Login
3. Select the provider you want to use to login.
4. You should be redirected back to the app with a session. Note the user profile on the top right corner.
5. Click user icon and select Profile.

## Run with Docker

```bash
docker-compose up --build
``` 

## Run Production
Note: 
```bash
$env:ORIGIN="http://localhost:3000"
npm run build
node --env-file=.env build
```

## References

Uses [Tailwind](https://tailwindcss.com/docs/guides/sveltekit) and [DasiyUI](https://daisyui.com/docs/install/)

User the [Node adapter](https://kit.svelte.dev/docs/adapter-node)

Uses [Authjs](https://authjs.dev/getting-started/installation?framework=SvelteKit)
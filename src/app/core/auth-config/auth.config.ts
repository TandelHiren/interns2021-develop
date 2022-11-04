
import { AuthConfig } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';

export const authConfig: AuthConfig = {
    issuer: environment.authority,
    clientId: environment.client_id, // The "Auth Code + PKCE" client
    responseType: 'code',
    redirectUri:`${environment.redirect_uri}auth-callback`,
    silentRefreshRedirectUri: window.location.origin + '/assets/silent-renew.html',
    // silentRefreshRedirectUri: environment.silent_renew_url,
    postLogoutRedirectUri: window.location.origin + '/',
    scope: environment.scope, // Ask offline_access to support refresh token refreshes
    sessionChecksEnabled: false,
    timeoutFactor: 0.75, //
    showDebugInformation: false, // Also requires enabling "Verbose" level in devtools
    clearHashAfterLogin: false, // https://github.com/manfredsteyer/angular-oauth2-oidc/issues/457#issuecomment-431807040,
    nonceStateSeparator: 'semicolon', // Real semicolon gets mangled by IdentityServer's URI encoding,
    customQueryParams: {
        acr_values: environment.acr_values,
    }
};


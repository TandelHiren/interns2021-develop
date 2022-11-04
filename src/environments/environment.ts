// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
   // 1Authority config
  client_id: '1AutomationDev',
  // openid profile UserProfile
  scope: ' openid profile UserProfile 1AutomationApi offline_access 1AuthorityApi 1RPPDictionaryApi 1RPPPolicyServerApi',
  response_type: 'id_token token',
  authority: 'https://dev-1auth.1rivet.com',
  redirect_uri: 'http://localhost:4200/',
   // Policy server config
  policy_url: 'https://dev-policy.1rivet.com/api/userPolicy',
  policy_name: '1AutomationDev',
  apiUrl: 'http://104.45.158.75:8044/api/',
  ui_locales: 'en-US',
  defaultLanguageCode: 'en-us',
  acr_values: 'tenant:ae95adc9-4cfc-401f-814a-6a8c71aa0795',
  baseUrl: 'http://103.249.120.58:8082',
  webSocketUrl:'http://103.249.120.58:8082/log',
  version:'3.0.0'
};

/*
 * For easier ing in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

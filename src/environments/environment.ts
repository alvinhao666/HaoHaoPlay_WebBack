// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  api_url: 'http://localhost:8000/',
  token_key: 'HaoToken_Dev',
  user_key: 'HaoUser_Dev',
  production: false,
  bucket: 'dev-1253596932', /* 必须 */
  region: 'ap-nanjing',     /* 存储桶所在地域，必须字段 */
  avatarDir: 'avatar'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { initializeApp } from "firebase/app";
export const environment = {
  production: false,
  firebaseConfig : {

    apiKey: "AIzaSyAe8Frg6s-1vYdxxlxf4Q6vJQZ-79d51k4",
  
    authDomain: "tellevoapp-4bed1.firebaseapp.com",
  
    projectId: "tellevoapp-4bed1",
  
    storageBucket: "tellevoapp-4bed1.appspot.com",
  
    messagingSenderId: "619856956350",
  
    appId: "1:619856956350:web:02af4c5619754f6ba107ef"
  
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

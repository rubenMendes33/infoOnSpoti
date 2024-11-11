import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {provideAnimations} from '@angular/platform-browser/animations';
const firebaseConfig= {
  apiKey: "AIzaSyDn12m6jklcuZmi_LiKpu7lolCrIwease0",
    authDomain: "infoonspoti.firebaseapp.com",
    projectId: "infoonspoti",
    storageBucket: "infoonspoti.firebasestorage.app",
    messagingSenderId: "138686400363",
    appId: "1:138686400363:web:71712598a8ef11acfa6e2e",
    measurementId: "G-G3P38HVRY1"
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideAnimations()
  ]
};

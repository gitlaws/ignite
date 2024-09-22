import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from './app/environments/environment';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()), provideFirebaseApp(() => initializeApp({"projectId":"ignitebase","appId":"1:155175757197:web:2766cb9d0b1478a61849c4","storageBucket":"ignitebase.appspot.com","apiKey":"AIzaSyA6AfDNEK4NA2BjnqgpD9X2vlkzrnwXPms","authDomain":"ignitebase.firebaseapp.com","messagingSenderId":"155175757197"})), provideAuth(() => getAuth()),
  ],
}).catch((err) => console.error(err));

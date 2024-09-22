import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from './environments/environment';
import { AppRoutingModule } from './app.routes';
import { ToolbarComponent } from './components/common/toolbar/toolbar.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    ToolbarComponent,
    AppComponent,
  ],
  providers: [],
  bootstrap: [],
})
export class AppModule {}

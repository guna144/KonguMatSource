import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { ServicesComponent } from './pages/services/services.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AlertComponent } from './_directives/alert/alert.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HeaderComponent } from './pages/header/header.component';
import { AuthGuard } from './_guards/auth.guard.service';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { JwtInterceptor } from './_helpers/jwt.interceptor';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'home#login-popup', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '/home' }
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    GalleryComponent,
    ServicesComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    ProfileComponent,
    HeaderComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

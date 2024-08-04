import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { HttpClient, provideHttpClient } from '@angular/common/http';

import { AppComponent } from './app/app.component';
import { ImageGalleryComponent } from './app/image-gallery/image-gallery.component';
import { PhotoDetailsComponent } from './app/photo-details/photo-details.component';

const routes: Routes = [
  { path: '', component: ImageGalleryComponent },
  { path: 'photo/:id', component: PhotoDetailsComponent },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    importProvidersFrom(HttpClient),
  ]
});

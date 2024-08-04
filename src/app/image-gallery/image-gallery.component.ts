import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { catchError, of } from 'rxjs';

interface Photo {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

@Component({
  selector: 'app-image-gallery',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './image-gallery.component.html',
})
export class ImageGalleryComponent {
  private http = inject(HttpClient);
  photos = this.http.get<Photo[]>('https://jsonplaceholder.typicode.com/photos').pipe(
    catchError(err => {
      console.error('Error fetching photos:', err);
      return of([]);
    })
  );

  constructor() {
    this.photos.subscribe({
      next: data => console.log('Fetched photos:', data),
      error: err => console.error('Error fetching photos:', err),
    });
  }
}

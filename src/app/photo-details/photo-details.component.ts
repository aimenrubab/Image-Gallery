import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { switchMap, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

interface Photo {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

@Component({
  selector: 'app-photo-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './photo-details.component.html',
})
export class PhotoDetailsComponent {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);

  photo$: Observable<Photo | null> = this.route.params.pipe(
    switchMap(params => {
      const photoId = params['id'];
      if (photoId) {
        return this.http.get<Photo>(`https://jsonplaceholder.typicode.com/photos/${photoId}`).pipe(
          catchError(err => {
            console.error('Error fetching photo details:', err);
            return of(null);
          })
        );
      } else {
        return of(null);
      }
    })
  );
}

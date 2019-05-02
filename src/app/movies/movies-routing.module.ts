import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchMovieComponent } from './search-movie/search-movie.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';

const routes: Routes = [
  { path: 'movies', component: SearchMovieComponent },
  { path: 'movieDetail/:id', component: MovieDetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class MoviesRoutingModule { }

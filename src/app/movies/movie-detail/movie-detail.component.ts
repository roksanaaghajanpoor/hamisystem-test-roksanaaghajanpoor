import { MovieDetail, Ratings } from './../movie-detail';
import { HttpErrorResponse } from '@angular/common/http';
import { MoviesService } from './../movies.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  movieDetailInformation: MovieDetail;
  ratings: Ratings[] = [];

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.getMovieDetail(id);
  }

  getMovieDetail(movieId: string): void {
    this.moviesService.getMovieDetail(movieId)
      .subscribe((response: MovieDetail) => {
        response.Ratings.forEach(rating => {
          this.ratings.push(rating);
        });
        this.movieDetailInformation = response;
      }, (httpErrorResponse: HttpErrorResponse) => {
        alert("there is a problem");
      });
  }
}

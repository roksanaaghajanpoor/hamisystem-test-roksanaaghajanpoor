import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MoviesService } from '../movies.service';
import { Movie } from '../movie';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-search-movie',
  templateUrl: './search-movie.component.html',
  styleUrls: ['./search-movie.component.scss']
})
export class SearchMovieComponent implements OnInit {

  searchMovieFormGroup: FormGroup;
  allMovies: Movie[] = [];
  pageOffset: number = 1;
  totalNumberOfMovie: number = 0;
  haveResultOfSearchingMovie: boolean = true;
  serachedMovieTitle: string = '';
  paginationConfig: any;

  constructor(
    private moviesService: MoviesService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.initialSearchMovieForm();
    this.paginationConfig = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.totalNumberOfMovie
    };
  }

  initialSearchMovieForm() {
    this.searchMovieFormGroup = this.formBuilder.group({
      searchFormControl: ['']
    })
  }

  public onSubmit() {
    this.pageOffset = 1;
    this.serachedMovieTitle = this.searchMovieFormGroup.getRawValue().searchFormControl;
    this.fetchMovies(this.serachedMovieTitle, this.pageOffset)
  }

  fetchMovies(movieTitle: string, pageOffset: number) {
    let movieTitleWithoutSpace = movieTitle.replace('/\s/g,', '%20').trim();
    this.spinner.show();
    this.moviesService.getMovies(movieTitleWithoutSpace, pageOffset).subscribe(response => {
      this.spinner.hide();
      this.allMovies = [];
      this.haveResultOfSearchingMovie = (response.Response == "True") ? true : false;
      if (this.haveResultOfSearchingMovie) {
        this.totalNumberOfMovie = +response.totalResults;
        response.Search.forEach(movies => {
          this.allMovies.push(movies);
        });
        window.scroll(0,0);
      }
      this.paginationConfig.totalItems = this.totalNumberOfMovie
    }, (httpErrorResponse: HttpErrorResponse) => {
      this.spinner.hide();
      alert("there is a problem");
    });
  }

  pageChanged(event: number) {
    this.paginationConfig.currentPage = event;
    this.fetchMovies(this.serachedMovieTitle, this.paginationConfig.currentPage)
  }
}

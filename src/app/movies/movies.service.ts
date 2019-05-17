import { MovieDetail } from './movie-detail';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators'
import { SearchResult } from './movie';
import { throwError, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  mainUrl: string = 'http://www.omdbapi.com/?';
  apiKey: string = 'apikey=8695c3e8';
  firstSctionOfUrl: string = this.mainUrl + this.apiKey;
  searchedMovies: SearchResult;
  searchItemSubject: string;
  pageIndex: number;

  constructor(private http: HttpClient) { }

  getMovies(searchItem: string, pageOffset: number):Observable<SearchResult> {
    let searchQuery: string = '&s=[' + searchItem + ']';
    let page: string = '&page=' + pageOffset;
    let apiOfGetMovies: string = this.firstSctionOfUrl + searchQuery + page;
    this.pageIndex = pageOffset;
    this.searchItemSubject = searchItem;

    return this.http.get(apiOfGetMovies)
    .pipe(
      map((response: SearchResult) => {
        this.searchedMovies = response;
        return response;
      }),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getMovieAndSearchTitleAndPageIndex(){
    return {
      searchedMovies: this.searchedMovies,
      searchItemSubject: this.searchItemSubject,
      pageIndex: this.pageIndex
    }
  }

  getMovieDetail(movieId: string):Observable<MovieDetail> {
    let id: string = '&i=' + movieId 
    let apiOfGetDetial: string = this.firstSctionOfUrl + id;

    return this.http.get(apiOfGetDetial)
    .pipe(
      map((response: MovieDetail) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }
}

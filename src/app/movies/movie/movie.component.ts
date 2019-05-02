import { Movie } from '../movie';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  @Input() public movie: Movie;

  constructor() { }

  ngOnInit() { }
  
}

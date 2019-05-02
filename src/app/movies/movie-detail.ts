export class MovieDetail {
    public Title: string;
    public Year: string;
    public Rated: string;
    public Released: string;
    public Runtime: string;
    public Genre: string;
    public Director: string;
    public Writer: string;
    public Actors: string;
    public Plot: string;
    public Language: string;
    public Country: string;
    public Awards: string;
    public Poster: string;
    public Ratings: Ratings[];
    public Metascore: string;
    public imdbRating: string;
    public imdbVotes: string;
    public imdbID: string;
    public Type: string;
    public DVD: string;
    public BoxOffice: string;
    public Production: string;
    public Website: string;
    public Response: string
}

export class Ratings{
    public Source: string;
    public Value: string;
}
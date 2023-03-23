import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { SearchMovie } from './dto/search-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id:number): Movie {
    const movie = this.movies.find(movie => movie.id === id);
    if(!movie) {
      throw new NotFoundException(`Movie with ID : ${id}`);
    }
    return movie;
  }

  create(movieData: CreateMovieDto) {
    movieData
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData
    });
  }

  patch(id:number, movieData:UpdateMovieDto) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({
      ...movie,
      ...movieData
    })
  }

  deleteOne(id:number) {
    this.getOne(id);
    this.movies = this.movies.filter(movie => movie.id !== id);
  }

  search(query: SearchMovie) : Movie[] {
    let results: Movie[] = this.movies;
    for (const key in query) {
      console.log(key);
      console.log(query[key]);
      
      results = results.filter(movie => movie[key] === query[key]);
    }
    return results;
  }
}

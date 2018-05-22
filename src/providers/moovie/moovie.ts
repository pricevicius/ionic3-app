import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

/*
  Generated class for the MoovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MoovieProvider {

  private baseApiPah = "https://api.themoviedb.org/3";

  constructor(public http: Http) {
    console.log('Hello MoovieProvider Provider');
  }

  //?api_key=37ce0ad0a4f0f14e394b68f02602cc49

  public getLatestMovies(page = 1) {
    return this.http.get(this.baseApiPah + `/movie/popular?page=${page}&api_key=37ce0ad0a4f0f14e394b68f02602cc49&language=pt-BR`);
  }

  public getMovieDetails(filmeid) {
    return this.http.get(this.baseApiPah + `/movie/${filmeid}?api_key=37ce0ad0a4f0f14e394b68f02602cc49&language=pt-BR&page=1`);
  }


}

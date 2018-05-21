import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Heroe } from '../interfaces/heroe.interface';
import 'rxjs/Rx';

@Injectable()
export class HeroesService {

  heroesURL: string = 'https://heroesappv1-f8398.firebaseio.com/heroes.json';
  heroeURL: string = 'https://heroesappv1-f8398.firebaseio.com/heroes/';

  constructor ( private http: Http ) {  }

  nuevoHeroe ( heroe: Heroe) {
    let body = JSON.stringify( heroe );
    let headers = new Headers ({
      'Content-Type': 'application/json'
    });

    return this.http.post( this.heroesURL, body, { headers })
    .map( resp => {
      console.log(resp.json());
      return resp.json();
    });
  }

  actualizarHeroe ( heroe: Heroe, key$: string ) {
    let body = JSON.stringify( heroe );
    let headers = new Headers ({
      'Content-Type': 'application/json'
    });

    let url = `${ this.heroeURL }/${ key$ }.json`;

    return this.http.put( url , body, { headers })
    .map( resp=> {
      console.log(resp.json());
      return resp.json();
    });
  }

  getHeroe( key$: string ) {
    let url = `${ this.heroeURL }/${ key$ }.json`;
    return this.http.get( url )
      .map( resp => resp.json() );
  }

    getHeroes( ) {
    return this.http.get( this.heroesURL )
      .map( resp => resp.json() );
  }

  borrarHeroe(key$: string) {
    let url = `${ this.heroeURL}/${ key$ }.json`;
    return this.http.delete( url )
      .map( resp => resp.json() )
  }
}

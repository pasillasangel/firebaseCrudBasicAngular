import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroe.interface';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent implements OnInit {

  heroes: Heroe [] = [];
  loading: boolean = true;

  constructor( private _heroesService: HeroesService ) { 
    this._heroesService.getHeroes()
      .subscribe( data => {
        console.log(data);

        for ( let key$ in data ) {
          console.log(data[key$]);
          this.heroes = data;
          this.loading = false;
        }
      })
  }

  borrarHeroe( key$: string ) {
    this._heroesService.borrarHeroe(key$)
      .subscribe( resp => {
        if ( resp ) {
          console.error(resp);
        } else {
          //todo bien
          delete this.heroes[key$];
        }
        
      })
  }

  ngOnInit() {
  }

}

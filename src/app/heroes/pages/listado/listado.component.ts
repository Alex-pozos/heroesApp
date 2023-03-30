import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  constructor(private heoresService: HeroesService){}

  heroes: Heroe[] = [];

  ngOnInit() : void{
    this.heoresService.getHeroes()
    .subscribe(resp => {
      this.heroes = resp;
    });
  }

}

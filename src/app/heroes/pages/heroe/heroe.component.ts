import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  constructor(private activetedRoute: ActivatedRoute,
    private heroesServices: HeroesService,
    private router:Router) { }

  heroe!: Heroe;

  ngOnInit(): void {

    this.activetedRoute.params
      .pipe(
        switchMap(({ id }) => this.heroesServices.getHeroePorId(id))
      )
      .subscribe(heroe => {
        this.heroe = heroe;
      });

  }

  regresar(){
    this.router.navigate(['/heroes/listado']);
  }

}

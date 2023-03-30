import { Component, OnInit, Pipe } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  publishers = [

    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }

  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
  }

  constructor(private heroesService: HeroesService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) { }


  ngOnInit(): void {

    //Se agrega la siguiete condicinal ya que el navegador hace la peticion primero a la url que estamos para saber si se esta editando sí o no y de esa forma no mande un error a la hora de inicializar la aplicación

    if (!this.router.url.includes('editar')) {
      return;
    }
    this.activateRoute.params
      .pipe(
        switchMap(({ id }) => this.heroesService.getHeroePorId(id))
      )
      .subscribe(heroe => this.heroe = heroe);

  }


  guardar() {

    console.log('Esto es el nuevo heore', this.heroe);
    // Esta es una pequeña validacion del formulario 
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }

    if (this.heroe.id) {
      //Si existe un heroe con id en la bd se mandara la informacion al servicio de actualización de heroe

      this.heroesService.actualizarHeore(this.heroe)
        .subscribe(heroe => {
          this.router.navigate(['/heroes/listado']);
          this.mostarSnackBar('Registro actualizado!!')
        })
    } else {
      //En caso contrario de que no exista el heroe con el id se mandara al servicio de agregarHeroe
      this.heroesService.agregarHeore(this.heroe)
        .subscribe(heroe => {
          this.router.navigate(['/heroes/editar', heroe.id]);
          this.mostarSnackBar('Registro creado!!')
        })
    }

  }

  borrarHeroe() {

    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '300px',
      data: this.heroe
    });
    
    dialog.afterClosed().subscribe((result) => {
      if (result) {
        //Aqui se le pone un signo de admiracion dentro del this.heroe.id! ya que angular marca error ya que no controla si resibira un valor o no.
        this.heroesService.borrarHeore(this.heroe.id!)
          .subscribe(heroes => {
            this.router.navigate(['/heroes']);
          })
        
      }
    });





  }

  mostarSnackBar(mensaje: string) {
  

    this.snackBar.open(mensaje, 'Ok!',{
      duration: 4000,
    });


  }


}

import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(heroe: Heroe): string {
    // En esta parte primero con la instrucción condicional pregunamos si el heroe no tiene id coloque la imagen por default en lo que el usuario coloca una en su lugar.
    if (!heroe.id) {
      return 'assets/no-image.png';
      //Si el heroe existe y tiene una imagen que fue colocada por medio de la url se colocara en automatico
    } else if (heroe.alt_img){
      return heroe.alt_img;    
    //Aqui se colocan las imagenes que el usuario tenia por defecto dentro del json server
    }else{
      return `assets/heroes/${ heroe.id}.jpg`; 
    }

  }

}

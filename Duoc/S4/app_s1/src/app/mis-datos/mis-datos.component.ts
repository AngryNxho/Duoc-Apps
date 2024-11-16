import { Component } from '@angular/core';
import { fadeInOut, buttonClickAnimation, slideInOut } from '../animations';

@Component({
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.component.html',
  styleUrls: ['./mis-datos.component.scss'],
  animations: [fadeInOut, buttonClickAnimation, slideInOut]
})
export class MisDatosComponent {
  usuario: string = 'Usuario';
  mostrarCard: boolean = true;

  datosUsuario = {
    nombre: '',
    correo: '',
    telefono: ''
  };

  guardarDatos() {
    console.log('Datos guardados:', this.datosUsuario);
  }
}

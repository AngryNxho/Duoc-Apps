import { Component } from '@angular/core';
import { fadeInOut, slideInOut, buttonClickAnimation } from '../animations'; // Ajusta la ruta si es necesario

interface Pelicula {
  titulo: string;
  descripcion: string;
}

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
  animations: [fadeInOut, slideInOut, buttonClickAnimation] // Añade las animaciones aquí
})
export class FavoritosPage {
  favoritos: Pelicula[] = [];
  mostrarContenido = false; // Controla la visibilidad de la lista de favoritos

  constructor() {}

  ionViewWillEnter() {
    this.favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');

    // Reinicia la animación estableciendo mostrarContenido en false antes de activarla
    this.mostrarContenido = false;
    setTimeout(() => {
      this.mostrarContenido = true;
    }, 100); // Ajusta el tiempo según tu preferencia
  }
}

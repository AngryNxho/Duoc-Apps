import { Component } from '@angular/core';

// Definimos la interfaz para las películas en favoritos
interface Pelicula {
  titulo: string;
  descripcion: string;
}

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage {
  favoritos: Pelicula[] = [];

  constructor() {}

  ionViewWillEnter() {
    // Recupera la lista de favoritos desde localStorage
    this.favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
  }
}

import { Component } from '@angular/core';

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
    this.favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  usuario: string = '';
  nuevaPelicula = {
    titulo: '',
    descripcion: ''
  };

  ngOnInit() {
    this.usuario = localStorage.getItem('usuario') || 'Usuario';
  }

  agregarAFavoritos() {
    if (this.nuevaPelicula.titulo.trim() && this.nuevaPelicula.descripcion.trim()) {
      const favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
      favoritos.push({ ...this.nuevaPelicula });
      localStorage.setItem('favoritos', JSON.stringify(favoritos));
      this.nuevaPelicula = { titulo: '', descripcion: '' };
      alert('Película agregada a favoritos');
    } else {
      alert('Por favor, ingrese título y descripción.');
    }
  }
}

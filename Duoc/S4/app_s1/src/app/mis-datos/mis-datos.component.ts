import { Component, OnInit } from '@angular/core';
import { fadeInOut, buttonClickAnimation, slideInOut } from '../animations';

@Component({
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.component.html',
  styleUrls: ['./mis-datos.component.scss'],
  animations: [fadeInOut, buttonClickAnimation, slideInOut]
})
export class MisDatosComponent implements OnInit {
  usuario: string = '';
  nuevaPelicula = {
    titulo: '',
    descripcion: ''
  };
  mostrarCard = false;

  ngOnInit() {
    this.usuario = localStorage.getItem('usuario') || 'Usuario';
    this.mostrarCard = false;
    setTimeout(() => {
      this.mostrarCard = true;
    }, 100);
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

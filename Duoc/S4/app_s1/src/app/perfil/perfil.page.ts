import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { fadeInOut, slideInOut, buttonClickAnimation } from '../animations'; // Ajusta la ruta de importación si es necesario

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  animations: [fadeInOut, slideInOut, buttonClickAnimation] // Añade las animaciones aquí
})
export class PerfilPage {
  nombre: string = '';
  email: string = '';
  mostrarContenido = false; // Controla la visibilidad del contenido para activar slideInOut

  constructor(private alertController: AlertController) {}

  ionViewWillEnter() {
    // Inicializa los valores de nombre y email cada vez que la página se muestra
    this.nombre = localStorage.getItem('nombre') || '';
    this.email = localStorage.getItem('email') || '';

    // Reinicia la animación estableciendo mostrarContenido en false antes de activarla
    this.mostrarContenido = false;
    setTimeout(() => {
      this.mostrarContenido = true;
    }, 100); // Ajusta el tiempo si es necesario
  }

  async guardarPerfil() {
    localStorage.setItem('nombre', this.nombre);
    localStorage.setItem('email', this.email);

    const alert = await this.alertController.create({
      header: 'Perfil Actualizado',
      message: 'Tu perfil ha sido actualizado exitosamente.',
      buttons: ['OK']
    });
    await alert.present();
  }
}

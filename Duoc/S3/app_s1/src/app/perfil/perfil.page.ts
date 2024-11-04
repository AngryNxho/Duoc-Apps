import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage {
  nombre: string = '';
  email: string = '';

  constructor(private alertController: AlertController) {}

  async guardarPerfil() {
    // Guardar la información del perfil, aquí podrías añadir lógica para enviarla a un servidor si es necesario
    localStorage.setItem('nombre', this.nombre);
    localStorage.setItem('email', this.email);

    // Mostrar una alerta de confirmación
    const alert = await this.alertController.create({
      header: 'Perfil Actualizado',
      message: 'Tu perfil ha sido actualizado exitosamente.',
      buttons: ['OK']
    });
    await alert.present();
  }

  ngOnInit() {
    // Cargar la información de perfil desde localStorage si está disponible
    this.nombre = localStorage.getItem('nombre') || '';
    this.email = localStorage.getItem('email') || '';
  }
}

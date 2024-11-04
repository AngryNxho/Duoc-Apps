import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
})
export class ContactoPage {

  contacto = {
    nombre: '',
    email: '',
    mensaje: ''
  };

  constructor(private toastController: ToastController) {}

  async enviarMensaje() {
    const toast = await this.toastController.create({
      message: 'Mensaje enviado con éxito!',
      duration: 2000,
      color: 'success'
    });
    await toast.present();

    // Limpiar los campos después de enviar el mensaje
    this.contacto = {
      nombre: '',
      email: '',
      mensaje: ''
    };
  }
}

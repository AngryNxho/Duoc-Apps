import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { fadeInOut, slideInOut, buttonClickAnimation } from '../animations'; // Ajusta la ruta si es necesario

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  animations: [fadeInOut, slideInOut, buttonClickAnimation] // Añade las animaciones aquí
})
export class LoginPage {
  usuario: string = '';
  password: string = '';
  mostrarCard = false; // Controla la visibilidad del ion-card

  constructor(private alertController: AlertController, private navCtrl: NavController) {}

  ionViewWillEnter() {
    // Reinicia la animación al configurar mostrarCard en false antes de activarlo
    this.mostrarCard = false;
    setTimeout(() => {
      this.mostrarCard = true;
    }, 100); // Ajusta el tiempo según necesites
  }

  async login() {
    const usuarioRegex = /^[a-zA-Z0-9]{3,8}$/;
    if (!usuarioRegex.test(this.usuario)) {
      this.showAlert('Error', 'El usuario debe ser alfanumérico y tener entre 3 y 8 caracteres.');
      return;
    }

    if (this.password.length !== 4 || isNaN(Number(this.password))) {
      this.showAlert('Error', 'La contraseña debe ser un número de 4 dígitos.');
      return;
    }

    localStorage.setItem('usuario', this.usuario);
    this.navCtrl.navigateForward('/home');
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}

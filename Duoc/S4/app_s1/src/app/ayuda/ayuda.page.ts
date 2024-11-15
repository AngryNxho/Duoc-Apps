import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { fadeInOut, slideInOut, buttonClickAnimation } from '../animations'; // Ajusta la ruta si es necesario

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.page.html',
  styleUrls: ['./ayuda.page.scss'],
  animations: [fadeInOut, slideInOut, buttonClickAnimation] // Añade las animaciones aquí
})
export class AyudaPage implements OnInit {
  mostrarContenido = false; // Controla la visibilidad del contenido para activar slideInOut

  constructor(private alertController: AlertController) {}

  ngOnInit() {
    // Retraso para activar la animación de entrada en el contenido
    setTimeout(() => {
      this.mostrarContenido = true;
    }, 100); // Puedes ajustar el tiempo si es necesario
  }

  async mostrarRespuesta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Respuesta',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }
}

import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage {

  usuario = {
    nombre: 'Juan',
    apellido: 'Pérez',
    email: 'juan.perez@example.com',
    nivelEducacion: 'Universitaria',
    fechaNacimiento: new Date(1995, 4, 15)
  };

  constructor(private alertController: AlertController) {}

  async editarPerfil() {
    const alert = await this.alertController.create({
      header: 'Editar Perfil',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          placeholder: 'Nombre',
          value: this.usuario.nombre
        },
        {
          name: 'apellido',
          type: 'text',
          placeholder: 'Apellido',
          value: this.usuario.apellido
        },
        {
          name: 'email',
          type: 'email',
          placeholder: 'Email',
          value: this.usuario.email
        },
        {
          name: 'nivelEducacion',
          type: 'text',
          placeholder: 'Nivel de Educación',
          value: this.usuario.nivelEducacion
        },
        {
          name: 'fechaNacimiento',
          type: 'date',
          value: this.usuario.fechaNacimiento.toISOString().split('T')[0]
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Guardar',
          handler: (data) => {
            this.usuario.nombre = data.nombre;
            this.usuario.apellido = data.apellido;
            this.usuario.email = data.email;
            this.usuario.nivelEducacion = data.nivelEducacion;
            this.usuario.fechaNacimiento = new Date(data.fechaNacimiento);
          }
        }
      ]
    });

    await alert.present();
  }
}

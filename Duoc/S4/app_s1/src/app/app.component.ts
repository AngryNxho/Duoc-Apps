import { Component } from '@angular/core';
import { DbTaskService } from './service/myservice.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private dbTaskService: DbTaskService) {
    this.initializeApp();
  }

  async initializeApp() {
    await this.dbTaskService.initializeStorage(); // Inicializa almacenamiento
    await this.dbTaskService.initializeDatabase(); // Inicializa base de datos
  }
}

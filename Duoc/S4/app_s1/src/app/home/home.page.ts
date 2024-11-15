import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {
  segment: string = 'misDatos'; // Valor inicial del segmento

  segmentChanged(event: any) {
    this.segment = event.detail.value; // Cambia el segmento según la selección
  }
}

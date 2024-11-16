import { Component } from '@angular/core';
import { fadeInOut, buttonClickAnimation, slideInOut } from '../animations';

@Component({
  selector: 'app-experiencia-laboral',
  templateUrl: './experiencia-laboral.component.html',
  styleUrls: ['./experiencia-laboral.component.scss'],
  animations: [fadeInOut, buttonClickAnimation, slideInOut]
})
export class ExperienciaLaboralComponent {
  constructor() {}
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TestPageRoutingModule } from './test-routing.module';
import { TestPage } from './test.page';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TestPageRoutingModule,
    MatSliderModule // Asegúrate de que está importado aquí.
  ],
  declarations: [TestPage] // Asegúrate de que tu página está declarada aquí.
})
export class TestPageModule {}

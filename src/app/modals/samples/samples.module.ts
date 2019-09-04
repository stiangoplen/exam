import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SamplesPage } from './samples.page';

import {NgArrayPipesModule} from 'ngx-pipes';

const routes: Routes = [
  {
    path: '',
    component: SamplesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgArrayPipesModule
  ],
  declarations: [SamplesPage]
})
export class SamplesPageModule {}

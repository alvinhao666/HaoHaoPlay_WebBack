import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PersonalComponent} from './personal.component';
import { PersonalRouteModule } from './personal.route';


@NgModule({
  declarations: [PersonalComponent],
  imports: [
    CommonModule,
    PersonalRouteModule
  ]
})
export class PersonalModule { }

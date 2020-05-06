import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DictListComponent } from './dict-list.component';


const routes: Routes = [
  {
    path: '',
    component: DictListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DictRoutingModule { }

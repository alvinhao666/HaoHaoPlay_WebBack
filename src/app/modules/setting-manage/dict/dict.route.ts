import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DictListComponent } from './dict-list.component';
import { DictListResolve } from './dict-list.resolve';

const routes: Routes = [
  {
    path: '',
    component: DictListComponent,
    resolve: { dictList: DictListResolve },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [DictListResolve],
})
export class DictRoutingModule {}

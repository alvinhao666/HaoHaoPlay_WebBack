import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list';

const routes: Routes = [
    {
        path: '',
        component: UserListComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)],
})
export class UserRoutingModule {
}



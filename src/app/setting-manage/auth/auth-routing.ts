import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthListComponent } from './auth-list';


const routes: Routes = [
    {
        path: '',
        component: AuthListComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)],
})
export class AuthRoutingModule {
}



import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent} from './user.list';


const routes: Routes = [
    { path: 'user', component: UserListComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)],
})
export class UserRoutingModule {
}



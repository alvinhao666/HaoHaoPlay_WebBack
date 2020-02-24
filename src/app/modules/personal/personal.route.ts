import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalComponent } from './personal.component';


const routes: Routes = [
    {
        path: '',
        component: PersonalComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)],
})
export class  PersonalRouteModule {
}



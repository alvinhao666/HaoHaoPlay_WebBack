import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationListComponent } from './application-list';


const routes: Routes = [
    {
        path: '',
        component: ApplicationListComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)],
})
export class ApplicationRoutingModule {
}



import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationListComponent } from './application-list';


const routes: Routes = [
    {
        path: 'setting',
        data: { breadcrumb: '设置' },
        children: [
            { path: 'app', component: ApplicationListComponent, data: { breadcrumb: '应用管理' } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)],
})
export class ApplicationRoutingModule {
}



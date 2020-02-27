import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalComponent } from './personal.component';
import { BaseInfoComponent } from './base-info/base-info.component';
import { SafeInfoComponent } from './safe-info/safe-info.component';


const routes: Routes = [
    {
        path: '',
        component: PersonalComponent,
        children: [
            { path: 'base', component: BaseInfoComponent },
            { path: 'security', component: SafeInfoComponent }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)]
})
export class PersonalRouteModule {
}



import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalComponent } from './personal.component';
import { BaseInfoComponent } from './base-info/base-info.component';
import { SafeInfoComponent } from './safe-info/safe-info.component';
import { UserBaseInfoResolve } from './base-info/base-info.resolve';


const routes: Routes = [
    {
        path: '',
        component: PersonalComponent,
        children: [
            { path: 'base', component: BaseInfoComponent, resolve: { user: UserBaseInfoResolve } },
            { path: 'security', component: SafeInfoComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [UserBaseInfoResolve]
})
export class PersonalRouteModule {
}



import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationListComponent } from './application-list.component';
import { ApplicationTreeResolve } from './application-list.resolve';


const routes: Routes = [
    {
        path: '',
        component: ApplicationListComponent,
        resolve: { treeList: ApplicationTreeResolve }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [ApplicationTreeResolve]
})
export class ApplicationRoutingModule {
}



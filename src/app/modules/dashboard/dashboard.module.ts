import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

import { DashboardRouteModule } from './dashboard.route';

@NgModule({
    imports: [
        RouterModule,
        DashboardRouteModule
    ],
    declarations: [DashboardComponent],
    entryComponents: []
})
export class DashboardModule {
}

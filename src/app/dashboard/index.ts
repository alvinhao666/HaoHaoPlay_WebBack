import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard.component';

import { DashboardRouteModule } from './dashboard-routing';

@NgModule({
    imports: [
        DashboardRouteModule
    ],
    declarations: [DashboardComponent],
    entryComponents: []
})
export class DashboardModule {
}

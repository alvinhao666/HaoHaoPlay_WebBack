import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // *ngIf *ngFor指令
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ApplicationListComponent } from './application-list.component';

import { ApplicationRoutingModule } from './application.route';

@NgModule({
    imports: [
        CommonModule,
        NgZorroAntdModule,
        ApplicationRoutingModule
    ],
    declarations: [ApplicationListComponent],
    entryComponents: []
})
export class ApplicationModule {
}

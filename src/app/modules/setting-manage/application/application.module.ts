import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // *ngIf *ngFor指令
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ApplicationListComponent } from './application-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApplicationRoutingModule } from './application.route';
import { ApplicationEditComponent } from './application-edit/application-edit.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
        ApplicationRoutingModule
    ],
    declarations: [ApplicationListComponent, ApplicationEditComponent],
    entryComponents: []
})
export class ApplicationModule {
}

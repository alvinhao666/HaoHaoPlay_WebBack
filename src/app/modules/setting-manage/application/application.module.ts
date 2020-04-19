import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // *ngIf *ngFor指令
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { ApplicationListComponent } from './application-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApplicationRoutingModule } from './application.route';
import { ApplicationEditComponent } from './application-edit/application-edit.component';
import { ResourceEditComponent } from './resource-edit/resource-edit.component';


const NzModule = [
    NzButtonModule,
    NzMessageModule,
    NzModalModule,
    NzIconModule,
    NzCardModule,
    NzFormModule,
    NzTableModule,
    NzInputModule,
    NzInputNumberModule,
    NzTreeModule,
    NzPopconfirmModule
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ApplicationRoutingModule,
        ...NzModule
    ],
    declarations: [ApplicationListComponent, ApplicationEditComponent, ResourceEditComponent],
    entryComponents: []
})
export class ApplicationModule {
}

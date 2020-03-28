import { NgModule } from '@angular/core';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ApplicationListComponent} from './application-list.component';

import { ApplicationRoutingModule} from './application.route';

@NgModule({
    imports: [
        NgZorroAntdModule,
        ApplicationRoutingModule
    ],
    declarations: [ApplicationListComponent],
    entryComponents: []
})
export class ApplicationModule {
}

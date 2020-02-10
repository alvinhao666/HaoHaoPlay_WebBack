import { NgModule } from '@angular/core';

import { ApplicationListComponent} from './application-list';

import { ApplicationRoutingModule} from './application-routing';

@NgModule({
    imports: [
        ApplicationRoutingModule
    ],
    declarations: [ApplicationListComponent],
    entryComponents: []
})
export class ApplicationModule {
}

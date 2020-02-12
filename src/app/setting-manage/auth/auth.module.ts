import { NgModule } from '@angular/core';
import { AuthListComponent } from './auth-list.component';
import { AuthRoutingModule } from './auth.route';

@NgModule({
    imports: [
        AuthRoutingModule
    ],
    declarations: [AuthListComponent],
    entryComponents: []
})
export class AuthModule {
}

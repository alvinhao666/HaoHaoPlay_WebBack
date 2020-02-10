import { NgModule } from '@angular/core';
import { AuthListComponent } from './auth-list';
import { AuthRoutingModule } from './auth-routing';

@NgModule({
    imports: [
        AuthRoutingModule
    ],
    declarations: [AuthListComponent],
    entryComponents: []
})
export class AuthModule {
}

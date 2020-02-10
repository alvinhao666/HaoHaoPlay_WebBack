import { NgModule } from '@angular/core';

import { UserListComponent } from './user-list';

import { UserRoutingModule } from './user-routing';

@NgModule({
    imports: [
        UserRoutingModule
    ],
    declarations: [UserListComponent],
    entryComponents: []
})
export class UserModule {
}

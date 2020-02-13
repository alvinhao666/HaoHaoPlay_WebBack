import { NgModule } from '@angular/core';

import { UserListComponent } from './user-list.component';

import { UserRoutingModule } from './user.route';

@NgModule({
    imports: [
        UserRoutingModule
    ],
    declarations: [UserListComponent],
    entryComponents: []
})
export class UserModule {
}

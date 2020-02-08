import { Component, OnInit, Type } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';

@Component({
    selector: 'app-root',
    template: `<ng-container *ngComponentOutlet='componentConent'></ng-container>`,
})
export class AppComponent  implements OnInit {

    componentConent: Type<any>;

    ngOnInit() {
        this.viewSwitching();
    }

    viewSwitching() {
        const token = this.getToken();
        this.componentConent = token ? MainComponent : LoginComponent;
    }

    getToken(): string {
        return localStorage.getItem('HaoToken');
    }
}

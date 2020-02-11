import { Component, OnInit, Type } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    template: `<ng-container *ngComponentOutlet='componentConent'></ng-container>`,
    // template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {

    componentConent: Type<any>;
    constructor(private titleService: Title) { }

    ngOnInit() {
        this.titleService.setTitle('HaoHaoPlay');
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

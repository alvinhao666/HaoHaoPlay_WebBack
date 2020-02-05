import { Component, OnInit, Type, NgModuleFactoryLoader } from '@angular/core';
import { Router } from '@angular/router';

import {Core} from '../';

import { environment } from '../../environments/environment';

import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';

@Component({
    selector: 'app-root',
    template: `<ng-container *ngComponentOutlet='componentConent'></ng-container>`,
})
export class AppComponent extends Core implements OnInit {

    redirectTos: any;

    componentConent: Type<any>;

    hash: string;

    constructor() {

        super();
    }

    ngOnInit(): void {
        this.viewSwitching();
    }

    viewSwitching() {
        const token = this.getToken();
        this.componentConent =  LoginComponent;
    }

    getToken(): string {
        return sessionStorage.getItem('HaoToken') || localStorage.getItem('HaoToken');
    }
}

import { Component, OnInit, Type } from '@angular/core';

import { Title } from '@angular/platform-browser';
import { Router, NavigationError, NavigationCancel, NavigationStart } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
    selector: 'app-root',
    // template: `<ng-container *ngComponentOutlet='componentConent'></ng-container>`,
    template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {

    componentConent: Type<any>;
    constructor(
        private router: Router,
        private titleService: Title,
        public msg: NzMessageService,
    ) {
        this.routerHandle();
    }


    ngOnInit() {
        this.titleService.setTitle('好好玩后台系管理统');
        // this.viewSwitching();
    }

    // viewSwitching() {
    //     const token = this.getToken();
    //     this.componentConent = token ? MainComponent : LoginComponent;
    // }

    private routerHandle() {
        this.router.events.subscribe(evt => {
            if (evt instanceof NavigationError || evt instanceof NavigationCancel) {
                if (evt instanceof NavigationError) {
                    this.msg.error(`${evt.url}地址无效`, { nzDuration: 1000 * 3 });
                }
                if (this.getToken()) {
                    this.goTo('main/dashboard');
                } else {
                    this.goTo('/login');
                }
                return;
            }
            if (evt instanceof NavigationStart) {
                if (this.getToken()) {
                    if (evt.url === '/' || evt.url === '/login') {
                        this.goTo('main/dashboard');
                    }
                } else {
                    if (evt.url !== '/' && evt.url !== '/login') {
                        this.goTo('/login');
                    }
                }
                return;
            }
        });
    }

    private getToken(): string {
        return localStorage.getItem('HaoToken');
    }


    private goTo(url: string) {
        this.router.navigateByUrl(url);
    }
}

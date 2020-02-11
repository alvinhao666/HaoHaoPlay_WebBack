import { Component, OnInit, Type } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { Title } from '@angular/platform-browser';
import { Router, NavigationError, NavigationCancel, NavigationEnd } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
    selector: 'app-root',
    template: `<ng-container *ngComponentOutlet='componentConent'></ng-container>`,
    // template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
    private unsubscribe$ = new Subject<void>();
    componentConent: Type<any>;
    constructor(
        router: Router,
        private titleService: Title,
        public msg: NzMessageService,
        ) {

        router.events.pipe(takeUntil(this.unsubscribe$)).subscribe(evt => {

            if (evt instanceof NavigationError || evt instanceof NavigationCancel) {
   
                if (evt instanceof NavigationError) {
                    msg.error(`${evt.url}地址无效`, { nzDuration: 1000 * 3 });
                }
                router.navigateByUrl('/');
            }
            // if (!(evt instanceof NavigationEnd)) {
            //     console.log("123")
            //     // return;
            //     router.navigateByUrl('/');
            // }
        });
    }


    ngOnInit() {
        this.titleService.setTitle('好好玩');
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

import { Injectable } from '@angular/core';
import {  CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class MainGuard implements CanLoad {

    constructor(private router: Router) { }

    canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if (this.getToken()) {
            return true;
        } else {
            this.router.navigateByUrl('login');
        }
        return false;
    }

    private getToken(): string {
        return localStorage.getItem(environment.token_key);
    }
}
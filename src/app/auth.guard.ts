import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root'})
export class AuthGuard implements CanActivate {


    constructor(private router: Router) { }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        if (this.getToken()) {
            this.router.navigateByUrl('main');
        } else {
            this.router.navigateByUrl('login');
        }

        // 如果可以跳转页面，返回true,不能，则返回false
        return true;
    }



    private getToken(): string {
        return localStorage.getItem(environment.token_key);
    }

}
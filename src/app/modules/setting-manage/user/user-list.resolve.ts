import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { H_Http } from '@core';

@Injectable()
export class UserListResolve implements Resolve<any> {
  constructor(private http: H_Http) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return this.http
      .get(`User/GetPagedList`, {
        PageIndex: 1,
        PageSize: 10,
      })
      .toPromise()
      .then((d) => {
        return d;
      });
  }
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class UserInfoSubject {

    public userInfo$ = new Subject();
    
}
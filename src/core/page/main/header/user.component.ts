import { Component, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'header-user',
  templateUrl: './user.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class HeaderUserComponent {
  constructor(

  ) { }

  logout() {
    delete localStorage['HaoToken'];
    location.reload();
  }
}

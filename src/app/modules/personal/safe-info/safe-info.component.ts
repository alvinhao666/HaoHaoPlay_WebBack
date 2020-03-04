import { Component, OnInit } from '@angular/core';
import { H_Http } from '@core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-safe-info',
  templateUrl: './safe-info.component.html',
  styleUrls: ['./safe-info.component.less']
})
export class SafeInfoComponent implements OnInit {


  passwordLevel = '';
  phone = '';
  email = '';
  constructor(
    private router: ActivatedRoute) {
      this.getCurrentUserSecurity();
  }

  ngOnInit() {
  }

  getCurrentUserSecurity() {
    const user = this.router.snapshot.data.user;
    this.passwordLevel = user.PasswordLevel;
    this.phone = user.Phone;
    this.email = user.Email;
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { H_Http } from '@core';
import { ActivatedRoute } from '@angular/router';
import { UpdatePwdComponent } from '../update-pwd/update-pwd.component';

@Component({
  selector: 'app-safe-info',
  templateUrl: './safe-info.component.html',
  styleUrls: ['./safe-info.component.less']
})
export class SafeInfoComponent implements OnInit {

  @ViewChild('DiaglogUpdatePwd', { static: false }) dialogUpdatePwd: UpdatePwdComponent;

  passwordLevel = '';
  pwdLevelColor = 'white';
  phone = '';
  email = '';
  constructor(
    private router: ActivatedRoute,
    private http: H_Http) {
    this.getCurrentUserSecurity();
  }

  ngOnInit() {
  }

  getCurrentUserSecurity() {
    const user = this.router.snapshot.data.user;
    this.passwordLevel = user.PasswordLevel;
    this.phone = user.Phone;
    this.email = user.Email;
    this.handlePwdLevelColor();
  }

  showDialogUpdatePwd() {
    this.dialogUpdatePwd.isVisible = true;
  }

  updateSecurityInfo() {
    this.http.get(`CurrentUser/SecurityInfo`).subscribe(d => {
      if (d === null) return;
      this.passwordLevel = d.PasswordLevel;
      this.phone = d.Phone;
      this.email = d.Email;
      this.handlePwdLevelColor();
    });
  }

  handlePwdLevelColor() {
    if (this.passwordLevel === '弱') {
      this.pwdLevelColor = 'red';
    } else if (this.passwordLevel === '中') {
      this.pwdLevelColor = 'orange';
    } else if (this.passwordLevel === '强') {
      this.pwdLevelColor = 'green';
    }
  }
}

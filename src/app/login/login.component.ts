import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import JSEncrypt from 'jsencrypt';
import { H_Http } from '@core';
import { Router } from '@angular/router';
import { environment } from '@env/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent {
  form: FormGroup;

  type = 0;
  count = 0;

  publicKey =
    'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1fpTQ+BwBGPcRZsoMSc7wt5J2CyGXmf6YZQLB+o9l/2fTCrn1YQ8agf5GZvu3ntIStdgEKzAYZPI+QzGUFd3Nl15i9BsU3ZHFYr/VaoswKnQ8ZozNB5EzexPL8JQkNCkaPNaW04V6YZ7K3rXg7W7EQxWoEgndHsdTOa3uTvXYdVmAFrt5DXGDPQG1FLKgs1VRUP/xgYOOtd5MC6Jtlx9YdbAGeSU7tVCLq+4SEiT8uWEZLTq8GYpSg1+gtHwXglYKMF7/e0+EC1zkD9Khe6jSu9ErCfD9syIpN5k6Qllljvvet1c0FRJByJvUUWL1Q9yko2uBnbA7byDfTeFuPvI/wIDAQAB';

  loginLoading = false;

  nProgress = require('nprogress').configure({ showSpinner: false });
  constructor(
    private fb: FormBuilder,
    public msg: NzMessageService,
    private http: H_Http,
    private router: Router
  ) {
    this.form = this.fb.group({
      account: [null, Validators.required],
      password: [null, Validators.required],
      mobile: [null, [Validators.required, Validators.pattern(/^1\d{10}$/)]],
      captcha: [null, Validators.required],
      remember: [true],
    });
  }

  get account() {
    return this.form.controls.account;
  }
  get password() {
    return this.form.controls.password;
  }
  get remember() {
    return this.form.controls.remember;
  }
  get mobile() {
    return this.form.controls.mobile;
  }
  get captcha() {
    return this.form.controls.captcha;
  }

  switch(ret: any) {
    this.type = ret.index;
  }

  submit() {
    if (this.type === 0) {
      this.account.markAsDirty();
      this.account.updateValueAndValidity();
      this.password.markAsDirty();
      this.password.updateValueAndValidity();
      if (this.account.invalid || this.password.invalid) return;
    } else {
      this.mobile.markAsDirty();
      this.mobile.updateValueAndValidity();
      this.captcha.markAsDirty();
      this.captcha.updateValueAndValidity();
      if (this.mobile.invalid || this.captcha.invalid) return;
    }

    const jsencrypt = new JSEncrypt();

    jsencrypt.setPublicKey(this.publicKey);
    const pwd = jsencrypt.encrypt(this.password.value);

    this.nProgress.start();
    this.loginLoading = true;
    this.http
      .post('LoginByAccountPwd', {
        Account: this.account.value,
        Password: pwd,
        IsRememberLogin: this.remember.value,
      })
      .subscribe(
        (d) => {
          if (d === null) {
            this.loginLoading = false;
            this.nProgress.done();
            return;
          }

          localStorage.setItem(environment.token_key, d.Jwt);
          // localStorage.removeItem(environment.user_key);
          localStorage.setItem(environment.user_key, JSON.stringify(d));

          // Core.authNums = d.AuthNums;
          // location.reload();
          // location.href = location.href.split('/')[0] + '/main/dashboard';
          this.router.navigateByUrl('main/dashboard');
          this.nProgress.done();
          // location.reload();
        },
        (e) => {
          this.loginLoading = false;
          this.nProgress.done();
        }
        // () => {  //顺利完成后调用
        //   console.log('complete');
        // }
      );
  }
}

import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { H_Http, CoreEdit } from '@core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'dialog-update-pwd',
  templateUrl: './update-pwd.component.html',
  styleUrls: ['./update-pwd.component.less']
})
export class UpdatePwdComponent extends CoreEdit {

  isVisible = false;

  loading = false;

  form: FormGroup;

  passwordLevel = '';
  levelColor = '';

  regexWeak = /^[0-9A-Za-z]{6,16}$/;
  regexMedium = /^(?=.{6,16})[0-9A-Za-z]*[^0-9A-Za-z][0-9A-Za-z]*$/;
  regexStrong = /^(?=.{6,16})([0-9A-Za-z]*[^0-9A-Za-z][0-9A-Za-z]*){2,}$/;

  @Output() onSave = new EventEmitter();



  get fPassword() {
    return this.form.controls.fPassword;
  }

  get fRePassword() {
    return this.form.controls.fRePassword;
  }

  get fOldPassword() {
    return this.form.controls.fOldPassword;
  }

  passwordValidator = (control: FormControl): { [s: string]: boolean } => {
    if (control.value) {
      if (control.value === this.form.controls.fOldPassword.value) {
        return { error: true, same: true };
      }
    }
    return {};
  }


  rePasswordValidator = (control: FormControl): { [s: string]: boolean } => {
    if (control.value) {
      if (control.value !== this.form.controls.fPassword.value) {
        return { error: true, notEqual: true };
      }
    }
    return {};
  }


  constructor(
    private fb: FormBuilder,
    private http: H_Http,
    private msg: NzMessageService) {
    super();
    this.form = this.fb.group({
      fOldPassword: [null, Validators.required],
      fPassword: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(16), this.passwordValidator]],
      fRePassword: [null, [Validators.required, this.rePasswordValidator]]
    });
  }




  oldPwdChange(value: string) {
    setTimeout(() => this.form.controls.fPassword.updateValueAndValidity());
  }

  newPwdChange(value: string) {
    setTimeout(() => {
      this.form.controls.fRePassword.updateValueAndValidity();
      this.checkPasswordLevel(value);
    }, 300);
  }

  handleCancel() {
    this.reset();
  }

  handleOk() {
    if (!this.checkForm(this.form)) return;
    this.loading = true;
    this.http.put('CurrentUser/UpdatePassword', {
      OldPassword: this.fOldPassword.value,
      NewPassword: this.fPassword.value,
      RePassword: this.fRePassword.value
    }).subscribe(d => {
      this.loading = false;
      if (d === null) return;
      this.msg.success('更新成功');
      this.onSave.emit();
      this.reset();
    }, e => {
      this.loading = false;
    });
  }

  checkPasswordLevel(password: string) {

    if (this.regexWeak.test(password)) {
      this.passwordLevel = '弱';
      this.levelColor = 'red';
    } else if (this.regexMedium.test(password)) {
      this.passwordLevel = '中';
      this.levelColor = 'orange';
    } else if (this.regexStrong.test(password)) {
      this.passwordLevel = '强';
      this.levelColor = 'green';
    } else {
      this.passwordLevel = '';
    }
  }

  reset() {
    this.isVisible = false;

    // tslint:disable-next-line:forin
    // for (const key in this.form.controls) {
    //   this.form.controls[key].markAsPristine();
    //   this.form.controls[key].updateValueAndValidity();
    // }
    this.resetForm(this.form);
  }
}


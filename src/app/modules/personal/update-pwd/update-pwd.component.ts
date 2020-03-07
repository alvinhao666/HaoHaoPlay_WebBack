import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { H_Http, CoreEdit, ComparePwdValidators, CompareOldPwdValidators } from '@core';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'dialog-update-pwd',
  templateUrl: './update-pwd.component.html',
  styleUrls: ['./update-pwd.component.less']
})
export class UpdatePwdComponent extends CoreEdit implements OnInit {

  isVisible = false;

  loading = false;

  form: FormGroup;

  passwordLevel = '';
  levelColor = '';

  regexWeak = /^[0-9A-Za-z]{6,16}$/;
  regexMedium = /^(?=.{6,16})[0-9A-Za-z]*[^0-9A-Za-z][0-9A-Za-z]*$/;
  regexStrong = /^(?=.{6,16})([0-9A-Za-z]*[^0-9A-Za-z][0-9A-Za-z]*){2,}$/;

  @Output() onSave = new EventEmitter();

  // 定义一个行为subject
  passwordChange$ = new BehaviorSubject('');

  get fPassword() {
    return this.form.controls.fPassword;
  }

  get fRePassword() {
    return this.form.controls.fRePassword;
  }

  get fOldPassword() {
    return this.form.controls.fOldPassword;
  }


  constructor(
    private fb: FormBuilder,
    private http: H_Http,
    private msg: NzMessageService) {
    super();
    this.form = this.fb.group({
      fOldPassword: [null, Validators.required],
      fPassword: [null, [Validators.required, CompareOldPwdValidators.match('fOldPassword')]],
      fRePassword: [null, [Validators.required, ComparePwdValidators.equal('fPassword')]]
    });
  }

  ngOnInit() {
    this.passwordChange$
      .asObservable()
      .pipe(debounceTime(300)) // debounceTime(200) 间隔时间 200ms
      .subscribe((value: string) => this.checkPasswordLevel(value));
  }

  passwordChange(value: string) {
    this.passwordChange$.next(value);
  }

  handleCancel() {
    this.reset();
  }

  handleOk() {
    if (!this.checkForm(this.form)) return;
    this.loading = true;
    this.http.put('User/UpdateCurrentPassword', {
      OldPassword: this.fOldPassword.value,
      NewPassword: this.fPassword.value,
      RePassword: this.fRePassword.value
    }).subscribe(d => {
      this.loading = false;
      if (!d) return;
      this.onSave.emit();
      this.msg.success('更新成功');
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
    this.form.reset();
  }
}


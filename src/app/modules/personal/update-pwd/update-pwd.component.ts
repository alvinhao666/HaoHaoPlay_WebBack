import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { H_Http } from '@core';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'dialog-update-pwd',
  templateUrl: './update-pwd.component.html',
  styleUrls: ['./update-pwd.component.less']
})
export class UpdatePwdComponent implements OnInit {

  isVisible = false;

  validateForm: FormGroup;

  passwordLevel = '';
  levelColor = '';

  regexWeak = /^[0-9A-Za-z]{6,16}$/;
  regexMedium = /^(?=.{6,16})[0-9A-Za-z]*[^0-9A-Za-z][0-9A-Za-z]*$/;
  regexStrong = /^(?=.{6,16})([0-9A-Za-z]*[^0-9A-Za-z][0-9A-Za-z]*){2,}$/;

  @Output() onSave = new EventEmitter();

  // 定义一个行为subject
  passwordChange$ = new BehaviorSubject('');

  get fPassword() {
    return this.validateForm.controls.fPassword;
  }

  get fRePassword() {
    return this.validateForm.controls.fRePassword;
  }

  get fOldPassword() {
    return this.validateForm.controls.fOldPassword;
  }


  constructor(
    private fb: FormBuilder,
    private http: H_Http,
    private msg: NzMessageService) {
    this.validateForm = this.fb.group({
      fOldPassword: [null, Validators.required],
      fPassword: [null, Validators.required],
      fRePassword: [null, CompareValidators.match('fPassword')]
    });
  }

  ngOnInit() {
    this.passwordChange$
      .asObservable()
      .pipe(debounceTime(300)) // debounceTime(200) 间隔时间 200ms
      .subscribe((value: string) => this.checkPasswordLevel(value));

    // this.validateForm.get('fPassword').valueChanges.subscribe(d => {
    //   this.passwordChange$.next(d);
    // });


    // // 订阅
    // password$.subscribe(data => {
    //   this.projectOfOption = data;
    //   this.isLoading = false;
    // });
  }
  passwordChange(value: string) {
    this.passwordChange$.next(value);
  }

  handleCancel() {
    this.isVisible = false;
  }

  handleOk() {
    this.fOldPassword.markAsDirty();
    this.fOldPassword.updateValueAndValidity();
    this.fPassword.markAsDirty();
    this.fPassword.updateValueAndValidity();
    this.fRePassword.markAsDirty();
    this.fRePassword.updateValueAndValidity();
    if (this.fOldPassword.invalid || this.fPassword.invalid || this.fRePassword.invalid) return;

    this.http.put('User/UpdateCurrentPassword', {
      OldPassword: this.fOldPassword.value,
      NewPassword: this.fPassword.value,
      RePassword: this.fRePassword.value
    }).subscribe(d => {
      if (!d) return;
      this.onSave.emit();
      this.msg.success('更新成功');
      this.isVisible = false;
      this.validateForm.reset();
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

}

export class CompareValidators {
  static match(targetField: string): ValidatorFn {
    return (self: AbstractControl): { [key: string]: any } => {    //这里严格按照ValidatorFn的声明来
      const form = self.parent;
      if (form) {
        const targetControl: AbstractControl = form.controls[targetField];
        if (targetControl.value == null || (targetControl.value && self.value !== targetControl.value)) {   //如果两个值不一致
          return { match: '' };
        }
      }
    };
  }
}
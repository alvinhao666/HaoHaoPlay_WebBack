import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  ValidationErrors,
} from '@angular/forms';
import { H_Http, CoreEdit } from '@core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'modal-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.less'],
})
export class UserEditComponent extends CoreEdit {
  visible = false;

  @Input() title = '';

  // @Output() onClose = new EventEmitter();

  @Output() onSave = new EventEmitter();

  isEdit = false;

  userId: any = null;

  form: FormGroup;

  roles = null;

  get Account() {
    return this.form.controls.Account;
  }

  get Name() {
    return this.form.controls.Name;
  }

  get Password() {
    return this.form.controls.Password;
  }
  get RePassword() {
    return this.form.controls.RePassword;
  }

  get Birthday() {
    return this.form.controls.Birthday;
  }

  get Gender() {
    return this.form.controls.Gender;
  }

  get Phone() {
    return this.form.controls.Phone;
  }

  get Email() {
    return this.form.controls.Email;
  }

  get WeChat() {
    return this.form.controls.WeChat;
  }

  get QQ() {
    return this.form.controls.QQ;
  }

  get Role() {
    return this.form.controls.Role;
  }

  timerOfAccount = null;
  accountAsyncValidator = (control: FormControl) => {
    return new Observable((observer: Observer<ValidationErrors | null>) => {
      if (this.timerOfAccount) {
        clearTimeout(this.timerOfAccount);
        this.timerOfAccount = null;
      }

      this.timerOfAccount = setTimeout(() => {
        if (control.value === '') return;
        this.http
          .get(`User/IsExistAccount?Account=${control.value}`)
          .subscribe((d) => {
            if (d === null) return;

            if (d === false) {
              observer.next(null);
              observer.complete();
            }

            observer.next({ error: true, existAccount: d });

            observer.complete();
          });
      }, 300);
    });
  };

  rePasswordValidator = (control: FormControl): { [s: string]: boolean } => {
    if (control.value) {
      if (control.value !== this.form.controls.Password.value) {
        return { error: true, notEqual: true };
      }
    }
    return {};
  };

  constructor(
    private fb: FormBuilder,
    private http: H_Http,
    public msg: NzMessageService
  ) {
    super();
    this.form = this.fb.group({
      Account: [
        null,
        [Validators.required, Validators.pattern(/^[0-9a-zA-Z]*$/)],
        [this.accountAsyncValidator],
      ],
      Name: [null, Validators.required],
      Password: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(16),
        ],
      ],
      RePassword: [null, [Validators.required, this.rePasswordValidator]],
      Birthday: [null, Validators.required],
      Gender: [null, Validators.required],
      Phone: [
        null,
        [
          Validators.required,
          Validators.pattern(
            /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
          ),
        ],
      ],
      Email: [null, Validators.email],
      Wechat: [null, Validators.nullValidator],
      QQ: [null, Validators.nullValidator],
      Role: [null, Validators.required],
    });
  }

  newPwdChange(value: string) {
    //this.newPwdChange$.next(value);
    setTimeout(() => this.form.controls.RePassword.updateValueAndValidity());
  }

  getRoles() {
    this.http.get(`User/GetRoleList`).subscribe((d) => {
      if (d === null) return;
      this.roles = d;
    });
  }

  close() {
    // this.onClose.emit();
    this.reset();
  }

  save() {
    if (!this.validate()) return;
    if (this.isEdit && this.userId) {
      this.editUser(this.userId);
    } else {
      this.addUser();
    }
  }

  addUser() {
    this.http
      .post('User/Add', {
        Account: this.Account.value,
        Password: this.Password.value,
        Name: this.Name.value,
        Gender: parseInt(this.Gender.value, 10),
        Birthday: this.Birthday.value,
        Phone: this.Phone.value,
        Email: this.Email.value,
        WeChat: this.WeChat.value,
        QQ: this.QQ.value,
        RoleId: this.Role.value,
      })
      .subscribe((d) => {
        if (d === null) return;
        this.msg.success('添加成功');
        this.onSave.emit();
        this.reset();
      });
  }

  editUser(id: any) {
    this.http
      .put(`User/Update/${id}`, {
        Name: this.Name.value,
        Gender: parseInt(this.Gender.value, 10),
        Birthday: this.Birthday.value,
        Phone: this.Phone.value,
        Email: this.Email.value,
        WeChat: this.WeChat.value,
        QQ: this.QQ.value,
      })
      .subscribe((d) => {
        if (d === null) return;
        this.msg.success('编辑成功');
        this.onSave.emit();
        this.reset();
      });
  }

  async showUser(id: any) {
    this.isEdit = true;
    await this.http
      .get(`User/Get/${id}`)
      .toPromise()
      .then((d) => {
        if (d === null) return;
        // this.form.get('fName').setValue(d.Name);
        this.form.patchValue({ ...d, Gender: d.Gender.toString() });
        this.userId = d.Id;
      });
  }

  validate(): boolean {
    let flag = true;
    for (const key of Object.keys(this.form.controls)) {
      if (
        this.isEdit &&
        (key === 'Account' ||
          key === 'Password' ||
          key === 'RePassword' ||
          key === 'Role')
      )
        continue;
      this.form.controls[key].markAsDirty();
      this.form.controls[key].updateValueAndValidity();
      flag = flag && !this.form.controls[key].invalid;
    }
    return flag;
  }

  reset() {
    this.visible = false;
    setTimeout(() => {
      this.resetForm(this.form);
      this.isEdit = false;
      this.userId = null;
    }, 300);
  }
}

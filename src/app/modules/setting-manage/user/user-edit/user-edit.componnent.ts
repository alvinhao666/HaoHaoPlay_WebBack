import { OnInit, Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { H_Http, ComparePwdValidators, CoreEdit } from '@core';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
    selector: 'modal-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.less']
})

export class UserEditComponent extends CoreEdit implements OnInit {

    visible = false;

    @Input() title = '';

    // @Output() onClose = new EventEmitter();

    @Output() onSave = new EventEmitter();

    isEdit = false;

    userId: any = null;

    form: FormGroup;

    roles = null;

    get fLoginName() {
        return this.form.controls.fLoginName;
    }

    get fName() {
        return this.form.controls.fName;
    }

    get fPassword() {
        return this.form.controls.fPassword;
    }
    get fRePassword() {
        return this.form.controls.fRePassword;
    }

    get fAge() {
        return this.form.controls.fAge;
    }

    get fGender() {
        return this.form.controls.fGender;
    }

    get fPhone() {
        return this.form.controls.fPhone;
    }

    get fEmail() {
        return this.form.controls.fEmail;
    }

    get fWechat() {
        return this.form.controls.fWechat;
    }

    get fQQ() {
        return this.form.controls.fQQ;
    }

    get fRole() {
        return this.form.controls.fRole;
    }

    constructor(
        private fb: FormBuilder,
        private http: H_Http,
        public msg: NzMessageService) {
        super();
        this.form = this.fb.group({
            fLoginName: [null, Validators.required],
            fName: [null, Validators.required],
            fPassword: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
            fRePassword: [null, [Validators.required, ComparePwdValidators.equal('fPassword')]],
            fAge: [null, Validators.required],
            fGender: [null, Validators.required],
            fPhone: [null, [Validators.required, Validators.pattern(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/)]],
            fEmail: [null, Validators.email],
            fWechat: [null, Validators.nullValidator],
            fQQ: [null, Validators.nullValidator],
            fRole: [null, Validators.required]
        });
    }

    ngOnInit() {

    }

    getRoles() {
        this.http.get(`User/GetRole`).subscribe(d => {
            if (!d) return;
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
            .post('User', {
                LoginName: this.fLoginName.value,
                Password: this.fPassword.value,
                Name: this.fName.value,
                Gender: parseInt(this.fGender.value, 10),
                Age: this.fAge.value,
                Phone: this.fPhone.value,
                Email: this.fEmail.value,
                WeChat: this.fWechat.value,
                QQ: this.fQQ.value,
                RoleId: this.fRole.value
            })
            .subscribe(d => {
                if (!d) return;
                this.msg.success('添加成功');
                this.onSave.emit();
                this.reset();
            });
    }

    editUser(id: any) {
        this.http
            .put(`User/${id}`, {
                Name: this.fName.value,
                Gender: parseInt(this.fGender.value, 10),
                Age: this.fAge.value,
                Phone: this.fPhone.value,
                Email: this.fEmail.value,
                WeChat: this.fWechat.value,
                QQ: this.fQQ.value
            })
            .subscribe(d => {
                if (!d) return;
                this.msg.success('编辑成功');
                this.onSave.emit();
                this.reset();
            });
    }

    async showUser(id: any) {
        this.isEdit = true;
        await this.http.get(`User/${id}`).toPromise().then(d => {
            if (!d) return;
            this.form.get('fName').setValue(d.Name);
            this.form.get('fGender').setValue(d.Gender.toString());
            this.form.get('fAge').setValue(d.Age);
            this.form.get('fPhone').setValue(d.Phone);
            this.form.get('fEmail').setValue(d.Email);
            this.form.get('fWechat').setValue(d.WeChat);
            this.form.get('fQQ').setValue(d.QQ);
            this.userId = d.Id;
        });
    }

    validate(): boolean {
        let flag = true;
        for (const key of Object.keys(this.form.controls)) {
            if (this.isEdit && (key === 'fLoginName' || key === 'fPassword' || key === 'fRePassword')) continue;
            this.form.controls[key].markAsDirty();
            this.form.controls[key].updateValueAndValidity();
            flag = flag && !this.form.controls[key].invalid;
        }
        return flag;
    }

    reset() {
        this.visible = false;
        this.form.reset();
        this.isEdit = false;
        this.userId = null;
    }
}
import { OnInit, Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { H_Http } from '@core';

@Component({
    selector: 'slider-user',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.less']
})

export class UserEditComponent implements OnInit {

    @Input() visible = false;

    @Input() title = '';

    @Output() onClose = new EventEmitter();

    @Output() onAdd = new EventEmitter();

    isEdit = false;

    validateForm: FormGroup;

    formatterAge = value => value && `${value}`;
    parserAge = value => value && value.replace('.', '');



    get fLoginName() {
        return this.validateForm.controls.fLoginName;
    }

    get fName() {
        return this.validateForm.controls.fName;
    }

    get fPassword() {
        return this.validateForm.controls.fPassword;
    }
    get fRePassword() {
        return this.validateForm.controls.fRePassword;
    }

    get fAge() {
        return this.validateForm.controls.fAge;
    }

    get fGender() {
        return this.validateForm.controls.fGender;
    }

    get fPhone() {
        return this.validateForm.controls.fPhone;
    }

    get fEmail() {
        return this.validateForm.controls.fEmail;
    }

    get fWechat() {
        return this.validateForm.controls.fWechat;
    }

    constructor(
        private fb: FormBuilder,
        private http: H_Http
    ) {
        this.validateForm = this.fb.group({
            fLoginName: [null, [Validators.required]],
            fName: [null, [Validators.required]],
            fPassword: [null, [Validators.required]],
            fRePassword: [null, [CompareValidators.match('fPassword')]],
            fAge: [null, [Validators.required]],
            fGender: [null, [Validators.required]],
            fPhone: [null, [Validators.required, Validators.pattern(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/)]],
            fEmail: [null, [Validators.email]],
            fWechat: [null, [Validators.nullValidator]],
        });
    }

    ngOnInit() {

    }

    close() {
        this.onClose.emit();
        this.reset();
    }

    add() {
        if (!this.validate()) return;
        this.saveUser();
    }

    saveUser() {
        let data = {
            Name: this.fName.value,
            Gender: parseInt(this.fGender.value, 10),
            Age: this.fAge.value,
            Phone: this.fPhone.value,
            Email: this.fEmail.value,
            WeChat: this.fWechat.value
        };
        if (!this.isEdit) {
            data = Object.assign(data, {
                LoginName: this.fLoginName.value,
                Password: this.fPassword.value
            });
        }
        this.http
            .post('User')
            .subscribe(() => {
                this.onAdd.emit();
                this.reset();
            });
    }

    showUser(id: any) {
        this.isEdit = true;
        this.http.get(`User/${id}`).subscribe((d: any) => {
            this.validateForm.get('fName').setValue(d.Name);
            this.validateForm.get('fGender').setValue(d.Gender.toString());
            this.validateForm.get('fAge').setValue(d.Age);
            this.validateForm.get('fPhone').setValue(d.Phone);
            this.validateForm.get('fEmail').setValue(d.Email);
            this.validateForm.get('fWechat').setValue(d.WeChat);
        });
    }

    validate(): boolean {
        let flag = true;
        for (const key of Object.keys(this.validateForm.controls)) {
            this.validateForm.controls[key].markAsDirty();
            this.validateForm.controls[key].updateValueAndValidity();
            flag = flag && !this.validateForm.controls[key].invalid;
        }
        return flag;
    }

    reset() {
        this.validateForm.reset();
        this.isEdit = false;
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
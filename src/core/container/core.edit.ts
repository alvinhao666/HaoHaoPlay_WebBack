import { FormGroup } from '@angular/forms';
import { Core } from './core';

export class CoreEdit extends Core {

    /**
      *\d为数字、\D为非数字、/g为全局匹配、在之前加/只是语法原因
      *将非数字部分替换为""
      **/
    formatterInt = value => value && `${value}`;
    parserInt = value => value.trim().replace(/\D/g, '');

    constructor() {
        super();
    }

    checkForm(form: FormGroup): boolean {
        let flag = true;
        for (const key of Object.keys(form.controls)) {
            form.controls[key].markAsDirty();
            form.controls[key].updateValueAndValidity();
            flag = flag && !form.controls[key].invalid;
        }
        return flag;
    }

    resetForm(form: FormGroup) {
        form.reset();
        for (const key of Object.keys(form.controls)) {
            form.controls[key].markAsPristine();
            form.controls[key].updateValueAndValidity();
        }
    }
}
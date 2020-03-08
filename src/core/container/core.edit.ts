import { FormGroup } from '@angular/forms';
import { CoreContainer } from './core.container';

export abstract class CoreEdit extends CoreContainer {

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
}
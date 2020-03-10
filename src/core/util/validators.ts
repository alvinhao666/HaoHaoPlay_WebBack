import { ValidatorFn, AbstractControl } from '@angular/forms';

// 验证重复密码是否一致
export class ComparePwdValidators {
    static equal(targetField: string): ValidatorFn {
        return (self: AbstractControl): { [key: string]: any } => {    //这里严格按照ValidatorFn的声明来
            const form = self.parent;
            if (form) {
                const targetControl: AbstractControl = form.controls[targetField];
                if (self.value && self.value !== targetControl.value) {   //如果两个值不一致
                    return { notEqual: true };
                }
            }
        };
    }
}

// 验证跟原密码是否相同
export class CompareOldPwdValidators {
    static match(targetField: string): ValidatorFn {
        return (self: AbstractControl): { [key: string]: any } => {    //这里严格按照ValidatorFn的声明来
            const form = self.parent;
            if (form) {
                const targetControl: AbstractControl = form.controls[targetField];
                if (self.value && self.value === targetControl.value) {   //如果两个值一样
                    return { same: true };
                }
            }
        };
    }
}

import { ValidatorFn, AbstractControl } from '@angular/forms';

export class CompareEqualValidators {
    static equal(targetField: string): ValidatorFn {
      return (self: AbstractControl): { [key: string]: any } => {    //这里严格按照ValidatorFn的声明来
        const form = self.parent;
        if (form) {
          const targetControl: AbstractControl = form.controls[targetField];
          if ( self.value !== targetControl.value) {   //如果两个值不一致
            return { notEqual: true };
          }
        }
      };
    }
  }
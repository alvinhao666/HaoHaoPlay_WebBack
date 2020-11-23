import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { H_Http, icons } from '@core';

@Component({
  selector: 'dialog-application-edit',
  templateUrl: './application-edit.component.html',
  styleUrls: ['./application-edit.component.less']
})
export class ApplicationEditComponent {

  isVisible = false;

  form: FormGroup;

  iconList: string[];

  @Input() type = null; // 当前点击的node

  @Input() Id = null;

  @Output() onSave = new EventEmitter();

  @Input() title = '';

  get fName() {
    return this.form.controls.fName;
  }

  get fIcon() {
    return this.form.controls.fIcon;
  }

  get fRouterUrl() {
    return this.form.controls.fRouterUrl;
  }


  get fSort() {
    return this.form.controls.fSort;
  }


  constructor(
    private http: H_Http,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      fName: [null, Validators.required],
      fIcon: [null, Validators.required],
      fRouterUrl: [null, Validators.required],
      fSort: [null, Validators.required]
    });

    this.iconList = icons;
    // icons.forEach(element => {
    //   this.iconList.push(element);
    // });
    // icons.forEach(element => {
    //   this.iconList.push(element);
    // });
    // icons.forEach(element => {
    //   this.iconList.push(element);
    // });
    // icons.forEach(element => {
    //   this.iconList.push(element);
    // });
    // icons.forEach(element => {
    //   this.iconList.push(element);
    // });
  }

  // onInputIcon(event: InputEvent) {

  //   const inputLength = event.data.length;
  //   this.fIcon.setValue(this.fIcon.value.substring(0, this.fIcon.value.length - inputLength));
  // }

  // onKeyDownIcon(event: KeyboardEvent) {
  //   return false; //任何 都不能输入
  // }

  // onKeyUpIcon(event: KeyboardEvent) {
  //   console.log("sdf")
  //   let temp = ''; 
  //   for (let i = 0; i < this.fIcon.value.length; i++) {
  //     if (this.fIcon.value.charCodeAt(i) > 0 && this.fIcon.value.charCodeAt(i) < 255)
  //       temp += this.fIcon.value.charAt(i);
  //   }

  //   this.fIcon.setValue(temp);
  // }



  handleCancel() {
    this.reset();
  }

  handleOk() {
    if (!this.checkForm(this.form)) return;
    this.http.post(`Module/Add`, {
      Name: this.fName.value,
      Icon: this.fIcon.value,
      RouterUrl: this.fRouterUrl.value,
      Sort: this.fSort.value,
      Type: this.type + 1,
      ParentId: this.Id
    }).subscribe(d => {
      if (!d) return;
      this.onSave.emit();
      this.reset();
    });
  }

  reset() {
    this.isVisible = false;
    this.form.reset();
  }

  checkForm(form: FormGroup): boolean {
    let flag = true;
    for (const key of Object.keys(form.controls)) {
      if ((this.type === 0 && key === 'fRouterUrl') || (this.type === 1 && key === 'fIcon')) continue;
      form.controls[key].markAsDirty();
      form.controls[key].updateValueAndValidity();
      flag = flag && !form.controls[key].invalid;
    }
    return flag;
  }
}

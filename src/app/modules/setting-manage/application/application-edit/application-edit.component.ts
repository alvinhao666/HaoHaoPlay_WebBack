import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { H_Http } from '@core';

@Component({
  selector: 'dialog-application-edit',
  templateUrl: './application-edit.component.html',
  styleUrls: ['./application-edit.component.less']
})
export class ApplicationEditComponent implements OnInit {

  isVisible = false;

  form: FormGroup;

  @Input() type = null; // 当前点击的node

  @Input() Id = null;

  @Output() onSave = new EventEmitter();

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
  }

  ngOnInit() {
  }


  handleCancel() {
    this.reset();
  }

  handleOk() {
    this.isVisible = false;
    this.http.post(`Module`, {
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
      if ((this.type === 1 && key === 'fRouterUrl') || (this.type === 0 && key === 'fIcon')) continue;
      form.controls[key].markAsDirty();
      form.controls[key].updateValueAndValidity();
      flag = flag && !form.controls[key].invalid;
    }
    return flag;
  }
}

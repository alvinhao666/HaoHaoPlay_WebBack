import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { H_Http, CoreEdit } from '@core';

@Component({
  selector: 'dialog-resource-edit',
  templateUrl: './resource-edit.component.html',
  styleUrls: ['./resource-edit.component.less']
})
export class ResourceEditComponent extends CoreEdit  {

  isVisible = false;

  form: FormGroup;

  @Input() Id = null;
  @Output() onSave = new EventEmitter();

  get fName() {
    return this.form.controls.fName;
  }

  get fAlias() {
    return this.form.controls.fAlias;
  }


  constructor(
    private http: H_Http,
    private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      fName: [null, Validators.required],
      fAlias: [null, [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
    });
  }


  handleOk() {
    if (!this.checkForm(this.form)) return;
    this.http.post(`Resource/Add`, {
      Name: this.fName.value,
      ParentId: this.Id,
      Alias: this.fAlias.value
    }).subscribe(d => {
      if (d === null) return;
      this.onSave.emit();
      this.reset();
    });
  }

  handleCancel() {
    this.reset();
  }

  reset() {
    this.isVisible = false;
    this.resetForm(this.form);
  }

}

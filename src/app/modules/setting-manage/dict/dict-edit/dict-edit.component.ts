import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CoreEdit, H_Http } from '@core';

@Component({
  selector: 'app-dict-edit',
  templateUrl: './dict-edit.component.html',
  styleUrls: ['./dict-edit.component.less']
})
export class DictEditComponent extends CoreEdit implements OnInit {

  visible = false;

  @Output() onSave = new EventEmitter();

  form: FormGroup;

  get fDictCode() {
    return this.form.controls.fDictCode;
  }

  get fDictName() {
    return this.form.controls.fDictName;
  }

  get fRemark() {
    return this.form.controls.fRemark;
  }

  constructor(
    private fb: FormBuilder,
    private http: H_Http) {
    super();
    this.form = this.fb.group({
      fDictName: [null, Validators.required],
      fDictCode: [null, Validators.required],
      fRemark: [null]
    });
  }

  ngOnInit(): void {
  }

  close() {
    this.reset();
  }

  save() {
    if (!this.checkForm(this.form)) return;
    this.http.post('Dict', {
      DictCode: this.fDictCode.value,
      fDictName: this.fDictName.value,
      fRemark: this.fRemark.value
    }).subscribe(d => {
      if (!d) return;
      this.onSave.emit();
      this.reset();
    });
  }

  reset() {
    this.visible = false;
    this.form.reset();
  }
}

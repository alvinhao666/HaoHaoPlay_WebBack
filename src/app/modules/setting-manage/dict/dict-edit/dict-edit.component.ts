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

  title = '';

  isUpdate = false;

  dictId = null;

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

    if (this.isUpdate) {
      this.update();
    } else {
      this.add();
    }
  }

  add() {
    this.http.post('Dict/AddDict', {
      DictCode: this.fDictCode.value,
      DictName: this.fDictName.value,
      Remark: this.fRemark.value
    }).subscribe(d => {
      if (!d) return;
      this.onSave.emit();
      this.reset();
    });
  }

  update() {
    this.http.put(`Dict/UpdateDict/${this.dictId}`, {
      DictCode: this.fDictCode.value,
      DictName: this.fDictName.value,
      Remark: this.fRemark.value
    }).subscribe(d => {
      if (!d) return;
      this.onSave.emit();
      this.reset();
    });
  }

  showDict(d: any) {
    this.form.get('fDictName').setValue(d.DictName);
    this.form.get('fDictCode').setValue(d.DictCode);
    this.form.get('fRemark').setValue(d.Remark);
    this.dictId = d.Id;
    this.isUpdate = true;
  }

  reset() {
    this.visible = false;
    this.isUpdate = false;
    this.dictId = null;
    this.form.reset();
  }
}

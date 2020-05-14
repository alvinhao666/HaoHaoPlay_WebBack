import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { H_Http, CoreEdit } from '@core';

@Component({
  selector: 'app-dict-item-edit',
  templateUrl: './dict-item-edit.component.html',
  styleUrls: ['./dict-item-edit.component.less']
})
export class DictItemEditComponent extends CoreEdit implements OnInit {

  visible = false;

  title = '';

  isUpdate = false;

  dictId = null;

  @Output() onSave = new EventEmitter();

  form: FormGroup;

  get fItemValue() {
    return this.form.controls.fItemValue;
  }

  get fItemName() {
    return this.form.controls.fItemName;
  }

  get fSort() {
    return this.form.controls.fSort;
  }

  get fRemark() {
    return this.form.controls.fRemark;
  }

  constructor(
    private fb: FormBuilder,
    private http: H_Http) {
    super();
    this.form = this.fb.group({
      fItemName: [null, Validators.required],
      fItemValue: [null, Validators.required],
      fSort: [null],
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
    this.http.post('Dict/AddDictItem', {
      ItemValue: this.fItemValue.value,
      ItemName: this.fItemName.value,
      Remark: this.fRemark.value,
      ParentId: this.dictId
    }).subscribe(d => {
      if (!d) return;
      this.onSave.emit();
      this.reset();
    });
  }

  update() {
    this.http.put(`Dict/UpdateDictItem/${this.dictId}`, {
      ItemValue: parseInt(this.fItemValue.value, 10),
      ItemName: this.fItemName.value,
      Remark: this.fRemark.value,
      Sort: parseInt(this.fSort.value, 10)
    }).subscribe(d => {
      if (!d) return;
      this.onSave.emit();
      this.reset();
    });
  }

  showDictItem(d: any) {
    this.form.get('fItemName').setValue(d.ItemName);
    this.form.get('fItemValue').setValue(d.ItemValue);
    this.form.get('fSort').setValue(d.Sort);
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

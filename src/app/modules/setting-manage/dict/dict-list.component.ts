import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CoreContainer } from '@core';
import { DictEditComponent } from './dict-edit/dict-edit.component';

@Component({
  selector: 'app-dict',
  templateUrl: './dict-list.component.html',
  styleUrls: ['./dict-list.component.less']
})
export class DictListComponent extends CoreContainer implements OnInit {


  @ViewChild('dialogDictEdit', { static: false }) dialogDictEdit: DictEditComponent;

  searchForm: FormGroup;

  tableLoading: false;

  dataSet: null;

  pageIndex = 1;
  pageSize = 10;
  total = 1;

  get sDictName() {
    return this.searchForm.controls.sDictName;
  }

  get sDictCode() {
    return this.searchForm.controls.sDictCode;
  }


  constructor(
    private fb: FormBuilder) {
    super();
    this.searchForm = this.fb.group({
      sDictName: [null],
      sDictCode: [null]
    });
  }

  ngOnInit(): void {
  }


  addDict() {
    this.dialogDictEdit.visible = true;
  }
}

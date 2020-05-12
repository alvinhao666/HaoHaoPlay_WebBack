import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CoreContainer, H_Http } from '@core';
import { DictEditComponent } from './dict-edit/dict-edit.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dict',
  templateUrl: './dict-list.component.html',
  styleUrls: ['./dict-list.component.less']
})
export class DictListComponent extends CoreContainer implements OnInit {


  @ViewChild('dialogDictEdit', { static: false }) dialogDictEdit: DictEditComponent;

  searchForm: FormGroup;

  tableLoading = false;

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
    private fb: FormBuilder,
    private http: H_Http,
    private activedRoute: ActivatedRoute) {
    super();
    this.searchForm = this.fb.group({
      sDictName: [null],
      sDictCode: [null]
    });
  }

  ngOnInit(): void {
    this.dataSet = this.activedRoute.snapshot.data.dictList.Items;

  }


  addDict() {
    this.dialogDictEdit.visible = true;
  }

  // 查询字典列表
  getDicts() {
    this.tableLoading = true;
    this.http.get('Dict/GetDictList', {
      PageIndex: this.pageIndex,
      PageSize: this.pageSize,
      DictName: this.sDictName.value,
      DictCode: this.sDictCode.value
    }).subscribe(d => {
      this.tableLoading = false;
      if (!d) return;
      this.dataSet = d.Items;
    }, e => {
      this.tableLoading = false;
    });
  }


  pageIndexChange(pageIndex: number) {
    this.pageIndex = pageIndex;
    this.getDicts();
  }

  pageSizeChange(pageSize: number) {
    this.pageSize = pageSize;
    this.getDicts();
  }

  // 保存字典
  onSaveDict() {
    this.getDicts();
  }
}

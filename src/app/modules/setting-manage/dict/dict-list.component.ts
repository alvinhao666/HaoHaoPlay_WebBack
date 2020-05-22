import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CoreContainer, H_Http } from '@core';
import { DictEditComponent } from './dict-edit/dict-edit.component';
import { ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { DictItemListComponent } from './dict-item-list/dict-item-list.component';

@Component({
  selector: 'app-dict',
  templateUrl: './dict-list.component.html',
  styleUrls: ['./dict-list.component.less']
})
export class DictListComponent extends CoreContainer implements OnInit {


  @ViewChild('dialogDictEdit', { static: false }) dialogDictEdit: DictEditComponent;

  @ViewChild('dialogDictItemList', { static: false }) dialogDictItemList: DictItemListComponent;

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
    private modal: NzModalService,
    private activedRoute: ActivatedRoute) {
    super();
    this.searchForm = this.fb.group({
      sDictName: [null],
      sDictCode: [null]
    });
  }

  ngOnInit(): void {

    const d = this.activedRoute.snapshot.data.dictList;
    this.dataSet = d.Items;
    this.pageIndex = d.PageIndex;
    this.pageSize = d.PageSize;
    this.total = d.TotalCount;
  }


  addDict() {
    this.dialogDictEdit.title = '添加字典';
    this.dialogDictEdit.visible = true;
  }

  // 查询字典列表
  getDicts() {
    this.tableLoading = true;
    this.http.get('Dict/GetDictPagedList', {
      PageIndex: this.pageIndex,
      PageSize: this.pageSize,
      DictName: this.sDictName.value,
      DictCode: this.sDictCode.value
    }).subscribe(d => {
      this.tableLoading = false;
      if (!d) return;
      this.dataSet = d.Items;
      this.pageIndex = d.PageIndex;
      this.pageSize = d.PageSize;
      this.total = d.TotalCount;
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

  editDict(data: any) {
    this.dialogDictEdit.showDict(data);
    this.dialogDictEdit.title = '编辑字典';
    this.dialogDictEdit.visible = true;
  }

  deleteDict(data: any) {
    this.modal.confirm({
      nzTitle: `确认删除 ${data.DictName}?`,
      nzOnOk: () => this.http.delete(`Dict/DeleteDict/${data.Id}`).subscribe(d => {
        if (!d) return;
        this.getDicts();
      })
    });
  }

  async showDictItem(data: any) {
    await this.dialogDictItemList.getDictItem(data.Id);
    this.dialogDictItemList.visible = true;
    this.dialogDictItemList.title = data.DictName;
  }
}

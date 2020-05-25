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

  // tableLoading = false;

  // dataSet: null;

  // pageIndex = 1;
  // pageSize = 10;
  // totalCount = 1;

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

    this.searchFn = this.getDicts;

    this.searchForm = this.fb.group({
      sDictName: [null],
      sDictCode: [null]
    });
  }

  ngOnInit(): void {
    this.setTableData(this.activedRoute.snapshot.data.dictList);
  }


  // 查询字典列表
  getDicts() {
    return this.http.get('Dict/GetDictPagedList', this.handleSearchParam({
      DictName: this.sDictName.value,
      DictCode: this.sDictCode.value
    }));
  }


  addDict() {
    this.dialogDictEdit.title = '添加字典';
    this.dialogDictEdit.visible = true;
  }


  // 保存字典
  onSaveDict() {
    this.initPageIndex();
    this.search();
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
        this.search();
      })
    });
  }

  async showDictItem(data: any) {
    await this.dialogDictItemList.getDictItem(data.Id);
    this.dialogDictItemList.visible = true;
    this.dialogDictItemList.title = data.DictName;
  }
}

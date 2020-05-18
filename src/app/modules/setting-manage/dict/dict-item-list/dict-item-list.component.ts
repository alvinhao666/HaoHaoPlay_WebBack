import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DictItemEditComponent } from '../dict-item-edit/dict-item-edit.component';
import { H_Http, CoreContainer } from '@core';

@Component({
  selector: 'app-dict-item-list',
  templateUrl: './dict-item-list.component.html',
  styleUrls: ['./dict-item-list.component.less']
})
export class DictItemListComponent extends CoreContainer implements OnInit {


  @ViewChild('dialogDictItemEdit', { static: false }) dialogDictItemEdit: DictItemEditComponent;

  visible = false;

  title = '';

  searchForm: FormGroup;


  dataSet = null;

  pageIndex = 1;
  pageSize = 10;
  total = 1;

  tableLoading = false;

  dictId = null;

  get sItemName() {
    return this.searchForm.controls.sItemName;
  }

  constructor(
    private fb: FormBuilder,
    private http: H_Http) {
    super();
    this.searchForm = this.fb.group({
      sItemName: [null]
    });
  }

  ngOnInit(): void {
  }


  close() {
    this.visible = false;
    this.searchForm.reset();
  }

  addDictItem() {
    this.dialogDictItemEdit.visible = true;
    this.dialogDictItemEdit.title = '添加数据项';
    this.dialogDictItemEdit.dictId = this.dictId;
  }

  async getDictItem(id: string) {
    this.dictId = id;
    this.tableLoading = true;
    await this.http.get('Dict/GetDictItemList', {
      PageIndex: this.pageIndex,
      PageSize: this.pageSize,
      ItemName: this.sItemName.value,
      ParentId: id
    }).toPromise().then(d => {
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

  deleteItem(d: any) {
    this.http.delete(`Dict/DeleteDictItem/${d.Id}`).subscribe(d => {
      if (!d) return;
      this.getDictItem(this.dictId);
    });
  }

  editItem(d: any) {
    this.dialogDictItemEdit.visible = true;
    this.dialogDictItemEdit.title = '编辑数据项';
    this.dialogDictItemEdit.showDictItem(d);
  }

  pageIndexChange(pageIndex: number) {
    this.pageIndex = pageIndex;
    this.getDictItem(this.dictId);
  }

  pageSizeChange(pageSize: number) {
    this.pageSize = pageSize;
    this.getDictItem(this.dictId);
  }
}

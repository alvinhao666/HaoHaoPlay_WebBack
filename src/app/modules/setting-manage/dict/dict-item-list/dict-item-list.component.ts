import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DictItemEditComponent } from '../dict-item-edit/dict-item-edit.component';
import { H_Http, CoreContainer } from '@core';

@Component({
  selector: 'app-dict-item-list',
  templateUrl: './dict-item-list.component.html',
  styleUrls: ['./dict-item-list.component.less'],
})
export class DictItemListComponent extends CoreContainer implements OnInit {
  @ViewChild('dialogDictItemEdit', { static: false })
  dialogDictItemEdit: DictItemEditComponent;

  @Output() onClose = new EventEmitter();

  visible = false;

  title = '';

  searchForm: FormGroup;

  dictId = null;

  get sItemName() {
    return this.searchForm.controls.sItemName;
  }

  constructor(private fb: FormBuilder, private http: H_Http) {
    super();
    this.searchPagedListFn = this.getDictItem;
    this.searchForm = this.fb.group({
      sItemName: [null],
    });
  }

  ngOnInit(): void {}

  close() {
    this.visible = false;
    this.searchForm.reset();
    this.onClose.emit();
  }

  addDictItem() {
    this.dialogDictItemEdit.visible = true;
    this.dialogDictItemEdit.title = '添加数据项';
    this.dialogDictItemEdit.dictId = this.dictId;
  }

  getDictItem() {
    // this.searchParam = this.dictId;
    return this.http.get(
      'Dict/GetDictItemPagedList',
      this.setPagedQueryParam({
        ItemName: this.sItemName.value,
        ParentId: this.dictId,
      })
    );
  }

  deleteItem(d: any) {
    this.http.delete(`Dict/DeleteDictItem/${d.Id}`).subscribe((d) => {
      if (d === null) return;
      this.search();
    });
  }

  editItem(d: any) {
    this.dialogDictItemEdit.visible = true;
    this.dialogDictItemEdit.title = '编辑数据项';
    this.dialogDictItemEdit.showDictItem(d);
  }
}

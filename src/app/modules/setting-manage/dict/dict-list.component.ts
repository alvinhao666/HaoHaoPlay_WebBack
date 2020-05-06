import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CoreContainer } from '@core';

@Component({
  selector: 'app-dict',
  templateUrl: './dict-list.component.html',
  styleUrls: ['./dict-list.component.less']
})
export class DictListComponent extends CoreContainer implements OnInit {

  searchForm: FormGroup;

  tableLoading: false;

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

}

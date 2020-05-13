import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dict-item-list',
  templateUrl: './dict-item-list.component.html',
  styleUrls: ['./dict-item-list.component.less']
})
export class DictItemListComponent implements OnInit {

  visible = false;

  title = '';

  searchForm: FormGroup;

  constructor(
    private fb: FormBuilder) {

    this.searchForm = this.fb.group({
      sItemName: [null]
    });
  }

  ngOnInit(): void {
  }


  close() {
    this.visible = false;
  }
}

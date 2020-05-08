import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CoreEdit } from '@core';

@Component({
  selector: 'app-dict-edit',
  templateUrl: './dict-edit.component.html',
  styleUrls: ['./dict-edit.component.less']
})
export class DictEditComponent extends CoreEdit implements OnInit {

  @Input() visible = false;

  form: FormGroup;

  constructor(
    private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      fDictName: [null, Validators.required],
      fDictCode: [null, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  close() {
    this.visible = false;
  }

  save() {
    if (!this.checkForm(this.form)) return;
    this.visible = false;
  }
}

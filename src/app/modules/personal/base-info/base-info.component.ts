import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-base-info',
  templateUrl: './base-info.component.html',
  styleUrls: ['./base-info.component.less']
})
export class BaseInfoComponent implements OnInit {

  validateForm: FormGroup;
  formatterAge = value => value && `${value}`;
  parserAge = value => value && value.replace('.', '');
  constructor(
    private fb: FormBuilder) { 
      this.validateForm = this.fb.group({
        fName: ['', [Validators.required]],
        fGender: [null, [Validators.required]],
        fAge: [null, [Validators.required]]
      });
    }

  ngOnInit() {
  }

}

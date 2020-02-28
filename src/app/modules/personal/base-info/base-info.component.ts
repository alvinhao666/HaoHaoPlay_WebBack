import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { H_Http } from '@core';
import { NzMessageService } from 'ng-zorro-antd';


@Component({
  selector: 'app-base-info',
  templateUrl: './base-info.component.html',
  styleUrls: ['./base-info.component.less']
})
export class BaseInfoComponent implements OnInit {


  firstName = '';

  validateForm: FormGroup;

  formatterAge = value => value && `${value}`;
  parserAge = value => value && value.replace('.', '');


  get fAge() {
    return this.validateForm.controls.fAge;
  }

  get fGender() {
    return this.validateForm.controls.fGender;
  }

  get fName() {
    return this.validateForm.controls.fName;
  }

  get fNickName() {
    return this.validateForm.controls.fNickName;
  }
  get fProfile() {
    return this.validateForm.controls.fProfile;
  }
  get fHomeAddress() {
    return this.validateForm.controls.fHomeAddress;
  }


  constructor(
    private fb: FormBuilder,
    private http: H_Http,
    private msg: NzMessageService) {
    this.validateForm = this.fb.group({
      fName: [null, [Validators.required]],
      fNickName: [null],
      fGender: [null],
      fAge: [null, [Validators.required]],
      fProfile: [null],
      fHomeAddress: [null]
    });
    this.getCurrentUser();
  }

  async ngOnInit() {

  }

  getCurrentUser() {
    this.http.get(`User/Current`).subscribe(d => {
      if (!d) return;
      this.firstName = d.Name.substring(0, 1);
      this.validateForm.get('fName').setValue(d.Name);
      this.validateForm.get('fNickName').setValue(d.NickName);
      this.validateForm.get('fGender').setValue(d.Gender.toString());
      this.validateForm.get('fAge').setValue(d.Age);
      this.validateForm.get('fProfile').setValue(d.Profile);
      this.validateForm.get('fHomeAddress').setValue(d.HomeAddress);

      // this.validateForm.get('fPhone').setValue(d.Phone);
      // this.validateForm.get('fEmail').setValue(d.Email);
      // this.validateForm.get('fWechat').setValue(d.WeChat);
    });
  }

  update() {
    this.http.put(`User/UpdateCurrentUserBaseInfo`, {
      Name: this.fName.value,
      NickName: this.fNickName.value,
      Gender: parseInt(this.fGender.value, 10),
      Age: this.fAge.value,
      Profile: this.fProfile.value,
      HomeAddress: this.fHomeAddress.value
    }).subscribe(d => {
      if (!d) return;
      this.msg.success('更新成功');
    });
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { H_Http, CoreEdit, getColorByFirstName } from '@core';
import { NzMessageService } from 'ng-zorro-antd';
import { ActivatedRoute } from '@angular/router';
import { UserInfoSubject } from '../../../share/user-info.subject';
import { AvatarComponent } from '../avatar/avatar.component';


@Component({
  selector: 'app-base-info',
  templateUrl: './base-info.component.html',
  styleUrls: ['./base-info.component.less']
})
export class BaseInfoComponent extends CoreEdit implements OnInit {


  @ViewChild('DialogAvator', { static: false }) dialogAavator: AvatarComponent;

  form: FormGroup;

  loading = false;

  // user: Observable<any>;

  formatterAge = value => value && `${value}`;
  parserAge = value => value && value.replace('.', '');


  get fAge() {
    return this.form.controls.fAge;
  }

  get fGender() {
    return this.form.controls.fGender;
  }

  get fName() {
    return this.form.controls.fName;
  }

  get fNickName() {
    return this.form.controls.fNickName;
  }
  get fProfile() {
    return this.form.controls.fProfile;
  }
  get fHomeAddress() {
    return this.form.controls.fHomeAddress;
  }


  constructor(
    private fb: FormBuilder,
    private http: H_Http,
    private msg: NzMessageService,
    private router: ActivatedRoute,
    private userInfoSubject: UserInfoSubject) {
    super();
    this.form = this.fb.group({
      fName: [null, Validators.required],
      fNickName: [null],
      fGender: [null],
      fAge: [null, Validators.required],
      fProfile: [null],
      fHomeAddress: [null]
    });
    this.setCurrentUser(this.router.snapshot.data.user);

  }

  ngOnInit() {

  }

  setCurrentUser(user: any) {
    this.firstName = user.Name.substring(0, 1);
    this.firstNameBgColor = getColorByFirstName(user.FirstNameSpell);
    // this.setFirstName(user.Name.substring(0, 1));
    // this.setFirstNameBgColor(getColorByFirstName(user.FirstNameSpell));
    this.form.get('fName').setValue(user.Name);
    this.form.get('fNickName').setValue(user.NickName);
    this.form.get('fGender').setValue(user.Gender.toString());
    this.form.get('fAge').setValue(user.Age);
    this.form.get('fProfile').setValue(user.Profile);
    this.form.get('fHomeAddress').setValue(user.HomeAddress);
    this.userInfoSubject.userInfo$.next({ Name: user.Name, FirstName: this.firstName, FirstNameBgColor: this.firstNameBgColor });
  }

  update() {
    if (!this.checkForm(this.form)) return;
    this.loading = true;
    this.http.put(`User/UpdateCurrentBaseInfo`, {
      Name: this.fName.value,
      NickName: this.fNickName.value,
      Gender: parseInt(this.fGender.value, 10),
      Age: this.fAge.value,
      Profile: this.fProfile.value,
      HomeAddress: this.fHomeAddress.value
    }).subscribe(d => {
      this.loading = false;
      if (!d) return;
      this.msg.success('更新成功');
      this.getUser();
    }, e => {
      this.loading = false;
    });
  }

  getUser() {
    this.http.get(`User/Current`).subscribe(d => {
      if (!d) return;
      this.setCurrentUser(d);
    });
  }

  showAvatarDialog() {
    this.dialogAavator.isVisible = true;
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { H_Http, CoreEdit, getColorByFirstName } from '@core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute } from '@angular/router';
import { UserInfoSubject } from '../../../share/subjects/user-info.subject';
import { AvatarComponent } from '../avatar/avatar.component';
import { environment } from '@env/environment';


@Component({
  selector: 'app-base-info',
  templateUrl: './base-info.component.html',
  styleUrls: ['./base-info.component.less']
})
export class BaseInfoComponent extends CoreEdit implements OnInit {


  @ViewChild('DialogAvator', { static: false }) dialogAavator: AvatarComponent;

  form: FormGroup;

  loading = false;

  headImgUrl = null;
  firstName = '';

  firstNameBgColor = '';

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
  }

  ngOnInit() {
    this.setCurrentUser(this.router.snapshot.data.user);
  }

  setCurrentUser(user: any) {
    this.firstName = user.Name.substring(0, 1);
    this.firstNameBgColor = getColorByFirstName(user.FirstNameSpell);
    // if (user.HeadImgUrl) {
    //   this.headImgUrl = environment.api_url + `AvatarFile/${user.HeadImgUrl}`;
    // }
    this.headImgUrl = user.HeadImgUrl || user.HeadImgUrl;
    // this.setFirstName(user.Name.substring(0, 1));
    // this.setFirstNameBgColor(getColorByFirstName(user.FirstNameSpell));
    this.form.get('fName').setValue(user.Name);
    this.form.get('fNickName').setValue(user.NickName);
    this.form.get('fGender').setValue(user.Gender.toString());
    this.form.get('fAge').setValue(user.Age);
    this.form.get('fProfile').setValue(user.Profile);
    this.form.get('fHomeAddress').setValue(user.HomeAddress);

  }

  update() {
    if (!this.checkForm(this.form)) return;
    this.loading = true;
    this.http.put(`CurrentUser/UpdateBaseInfo`, {
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
    this.http.get(`CurrentUser/GetUser`).subscribe(d => {
      if (!d) return;
      this.setCurrentUser(d);
      // if (d.HeadImgUrl) {
      //   this.headImgUrl = environment.api_url + `AvatarFile/${d.HeadImgUrl}`;
      // }
      this.headImgUrl = d.HeadImgUrl || d.HeadImgUrl;
      this.userInfoSubject.userInfo$.next({ Name: d.Name, FirstName: this.firstName, FirstNameBgColor: this.firstNameBgColor, HeadImgUrl: d.HeadImgUrl });
    });
  }

  showAvatarDialog() {
    this.dialogAavator.isVisible = true;
  }
}

import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { H_Http, getColorByFirstName, CoreContainer } from '@core';
import { UserInfoSubject } from '../share/user-info.subject';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent extends CoreContainer implements OnInit {

  isCollapsed = false;

  name = '';

  headImgUrl = null;

  constructor(
    private http: H_Http,
    private userInfoSubject: UserInfoSubject) {
    super();
    this.userInfoSubject.userInfo$.subscribe((d: any) => {
      this.name = d.Name;
      this.firstName = d.FirstName;
      this.firstNameBgColor = d.FirstNameBgColor;
      this.headImgUrl = d.HeadImgUrl;
    });
  }

  ngOnInit() {
    this.http.get(`User/Current`).subscribe(d => {
      if (!d) return;
      this.name = d.Name;
      this.firstName = this.name.substring(0, 1);
      this.firstNameBgColor = getColorByFirstName(d.FirstNameSpell);
      this.headImgUrl = environment.api_url + `AvatarFile/${d.HeadImgUrl}`;
    });
  }


  // 退出登录
  logout() {
    localStorage.removeItem(environment.token_key);
    location.href = location.href.split('/')[0];
    // location.reload();
  }
}

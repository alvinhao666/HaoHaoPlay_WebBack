import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { H_Http, getColorByFirstName, CoreContainer } from '@core';
import { UserInfoSubject } from '../share/user-info.subject';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent extends CoreContainer implements OnInit {

  isCollapsed = false;

  name = '';

  headImgUrl = null;

  menus = null;

  constructor(
    private http: H_Http,
    private router: Router,
    private msg: NzMessageService,
    private userInfoSubject: UserInfoSubject) {
    super();
    this.userInfoSubject.userInfo$.subscribe((d: any) => {
      this.name = d.Name;
      this.firstName = d.FirstName;
      this.firstNameBgColor = d.FirstNameBgColor;
      if (d.HeadImgUrl) {
        this.headImgUrl = d.HeadImgUrl;
      }
    });
  }

  ngOnInit() {
    const user = localStorage.getItem(environment.user_key);
    if (!user) {
      this.msg.error('当前用户数据异常，请重新登录');
      this.logout();
      return;
    }
    const d = JSON.parse(user);
    this.menus = d.Menus;
    this.name = d.Name;
    this.firstName = this.name.substring(0, 1);
    this.firstNameBgColor = getColorByFirstName(d.FirstNameSpell);
    if (d.HeadImgUrl) {
      this.headImgUrl = environment.api_url + `AvatarFile/${d.HeadImgUrl}`;
    }
  }


  // 退出登录
  logout() {
    this.http.post('Logout').subscribe(d => {
      if (!d) return;
      localStorage.removeItem(environment.token_key);
      location.href = location.href.split('/')[0];
      // location.reload();
    });
  }
}

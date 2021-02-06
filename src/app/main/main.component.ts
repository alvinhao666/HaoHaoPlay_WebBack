import { Component } from '@angular/core';
import { environment } from '@env/environment';
import { H_Http, getColorByFirstName } from '@core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Core, CoreContainer } from '@core';
import { Router } from '@angular/router';
import PubSub from 'pubsub-js';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent extends CoreContainer {

  isCollapsed = false;

  name = '';

  firstName = '';

  firstNameBgColor = '';

  headImgUrl = null;

  menus = null;

  nProgress = require('nprogress').configure({ showSpinner: false });

  constructor(
    private http: H_Http,
    private router: Router,
    private msg: NzMessageService) {
    super();

    this.init();

    PubSub.subscribe('avatar_change', (msg, d) => {
      this.name = d.Name;
      this.firstName = d.FirstName;
      this.firstNameBgColor = d.FirstNameBgColor;
      if (d.HeadImgUrl) {
        // this.headImgUrl = environment.api_url + `AvatarFile/${d.HeadImgUrl}`;
        this.headImgUrl = d.HeadImgUrl;
        const value = localStorage.getItem(environment.user_key);
        const user = JSON.parse(value);
        user.HeadImgUrl = d.HeadImgUrl;
        localStorage.setItem(environment.user_key, JSON.stringify(user));
      }
    });
  }

  init() {
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

    // if (d.HeadImgUrl) {
    //   this.headImgUrl = environment.api_url + `AvatarFile/${d.HeadImgUrl}`;
    // }

    this.headImgUrl = d.HeadImgUrl || d.HeadImgUrl;
    Core.authNums = d.AuthNums;
  }


  // 退出登录
  logout() {
    this.nProgress.start();
    this.http.post('CurrentUser/Logout').subscribe(d => {
      if (d === null) {
        this.nProgress.done();
        return;
      }
      localStorage.removeItem(environment.token_key);
      // location.href = location.href.split('/')[0];
      this.router.navigateByUrl('/');
      // location.reload();
      this.nProgress.done();
    });
  }
}

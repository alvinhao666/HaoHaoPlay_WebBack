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
    private userInfo$: UserInfoSubject) {
    super();

    // const orignalSetItem = localStorage.setItem;
    // localStorage.setItem = function (key, value) {
    //   const setItemEvent = new Event('setItemEvent');
    //   setItemEvent['key'] = key;
    //   setItemEvent['value'] = value;
    //   window.dispatchEvent(setItemEvent);
    //   orignalSetItem.apply(this, arguments);
    // };
    // window.addEventListener('setItemEvent', function (e) {
    //   console.log('1123')
    //   if (e['key'] === 'H_FirstName') {
    //     // 执行你的逻辑
    //     this.firstName = e['value'];
    //   } else if (e['key'] === 'H_FirstNameBgColor') {
    //     this.firstNameBgColor = e['value'];
    //   }
    // });
    this.userInfo$.userSubject.subscribe((d: any) => {
      this.firstName = d.firstName;
      this.firstNameBgColor = d.firstNameBgColor;
    });
  }

  ngOnInit() {
    this.http.get(`User/Current`).subscribe(d => {
      if (!d) return;
      this.name = d.Name;
      this.firstName = this.name.substring(0, 1);
      this.firstNameBgColor = getColorByFirstName(d.FirstNameSpell);
      this.headImgUrl = d.HeadImgUrl;
    });
  }


  // 退出登录
  logout() {
    localStorage.removeItem(environment.token_key);
    location.href = location.href.split('/')[0];
    // location.reload();
  }
}

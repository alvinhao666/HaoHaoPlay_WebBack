import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {

  isCollapsed = false;


  constructor() { }

  ngOnInit() {
  }


  // 退出登录
  logout() {
    localStorage.removeItem('HaoToken');
    location.reload();
  }
}

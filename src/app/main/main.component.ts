import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@env/environment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {

  isCollapsed = false;


  constructor(private router: Router) { }

  ngOnInit() {
  }


  // 退出登录
  logout() {
    localStorage.removeItem(environment.token_key);
    location.href = location.href.split('/')[0];
    // location.reload();
  }
}

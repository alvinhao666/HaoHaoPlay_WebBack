import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { H_Http } from '@core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {

  isCollapsed = false;

  name = '';

  constructor(private http: H_Http) { }

  ngOnInit() {
    this.http.get(`User/Current`).subscribe(d => {
      console.log('21',d)
      if (!d) return;
      this.name = d.Name;
    });
  }


  // 退出登录
  logout() {
    localStorage.removeItem(environment.token_key);
    location.href = location.href.split('/')[0];
    // location.reload();
  }
}

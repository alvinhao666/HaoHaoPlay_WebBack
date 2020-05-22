import { Component, OnInit, Input } from '@angular/core';
import { H_Http } from '@core';

@Component({
  selector: 'slider-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.less']
})
export class UserViewComponent implements OnInit {

  visible = false;

  title = '查看用户';

  user: any;

  constructor(
    private http: H_Http) {

  }

  ngOnInit() {

  }

  close() {
    this.visible = false;
  }

  async showUser(id: any) {

    await this.http.get(`User/Get/${id}`).toPromise().then(d => {
      if (!d) return;
      this.user = d;
      this.visible = true;
    });
  }
}

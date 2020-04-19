import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.less']
})
export class RoleComponent implements OnInit {

  roleData = null;

  title = null;

  constructor(
    private router: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.roleData = this.router.snapshot.data.roleList;
  }



  viewRole(role: any) {
    this.title = role.Name + '的权限';
  }
}

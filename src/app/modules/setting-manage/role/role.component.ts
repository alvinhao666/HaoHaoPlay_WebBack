import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { H_Http } from '@core';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.less']
})
export class RoleComponent implements OnInit {

  roleData = null;

  title = null;

  nodes = null;

  checkedKeys = null;

  constructor(
    private router: ActivatedRoute,
    private http: H_Http
  ) { }

  ngOnInit() {
    this.roleData = this.router.snapshot.data.roleList;
  }



  viewRole(role: any) {
    this.title = role.Name + '的权限';
    this.http.get(`Role/GetRoleModule/${role.Id}`).subscribe(d => {
      if (!d) return;
      this.nodes = d.Nodes;
      this.checkedKeys = d.CheckedKeys;
      console.log(this.checkedKeys)
    });
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { H_Http } from '@core';
import { NzFormatEmitEvent, NzTreeComponent, NzTreeNode, NzMessageService } from 'ng-zorro-antd';

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


  @ViewChild('tree', { static: false }) tree: NzTreeComponent;


  arrayKey: string[];

  roleId = null;

  constructor(
    private router: ActivatedRoute,
    private http: H_Http,
    private msg: NzMessageService,
  ) { }

  ngOnInit() {
    this.roleData = this.router.snapshot.data.roleList;
  }



  viewRole(role: any) {
    this.roleId = role.Id;
    this.title = role.Name + '的权限';
    this.InitTree(role.Id);
  }

  InitTree(id: string) {
    this.http.get(`Role/GetRoleModule/${id}`).subscribe(d => {
      if (!d) return;
      this.nodes = d.Nodes;
      this.checkedKeys = d.CheckedKeys;
    });
  }


  checkBoxChange(event: NzFormatEmitEvent) {
    const checkedNodes = this.tree.getCheckedNodeList();
    const halfCheckedNodes = this.tree.getHalfCheckedNodeList();
    console.log(checkedNodes);
    console.log(halfCheckedNodes);
    this.arrayKey = [];
    this.handleCheckedTreeNode(checkedNodes, this.arrayKey);
    halfCheckedNodes.forEach((item: NzTreeNode) => {
      this.arrayKey.push(item.key);
    });
    console.log(this.arrayKey);
  }

  handleCheckedTreeNode(nodes: NzTreeNode[], arrayKey: string[]) {
    nodes.forEach((item: NzTreeNode) => {
      if (item.isChecked && item.children.length === 0) {
        arrayKey.push(item.key);
      } else {
        if (item.isAllChecked && item.children.length > 0) {
          arrayKey.push(item.key);
          this.handleCheckedTreeNode(item.children, arrayKey);
        }
      }
    });
  }

  updateRoleModule() {
    this.http.put(`Role/UpdateRoleAuth/${this.roleId}`, {
      ModuleIds: this.arrayKey
    }).subscribe(d => {
      if (!d) return;
      this.msg.success('更新成功');
      this.InitTree(this.roleId);
    });
  }
}

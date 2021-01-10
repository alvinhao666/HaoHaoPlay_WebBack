import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { H_Http, CoreContainer } from '@core';
import { NzTreeComponent, NzTreeNode } from 'ng-zorro-antd/tree';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.less']
})
export class RoleComponent extends CoreContainer implements OnInit {

  roleData = null;

  title = null;

  nodes = null;

  checkedKeys = null;


  @ViewChild('tree', { static: false }) tree: NzTreeComponent;


  arrayKey: string[];

  roleId = null;

  virtualHeight = '500px';

  constructor(
    private router: ActivatedRoute,
    private http: H_Http,
    private msg: NzMessageService,
    private modalSrv: NzModalService) {
    super();
  }

  ngOnInit() {
    this.roleData = this.router.snapshot.data.roleList;
    this.virtualHeight = (document.body.clientHeight - 225) + 'px';
  }



  viewRole(role: any) {
    this.roleId = role.Id;
    this.title = role.Name + '的权限';
    this.InitTree(role.Id);
  }

  InitTree(id: string) {
    this.http.get(`Role/GetRoleModule/${id}`).subscribe(d => {
      if (d === null) return;
      this.nodes = d.Nodes;
      this.checkedKeys = d.CheckedKeys;
    });
  }


  // checkBoxChange(event: NzFormatEmitEvent) {

  // }

  handleCheckedTreeNode(nodes: NzTreeNode[], arrayKey: string[]) {
    nodes.forEach((item: NzTreeNode) => {
      if (item.isChecked && item.children.length === 0) {
        arrayKey.push(item.key);
      } else {
        if (item.isChecked && item.children.length > 0) {
          arrayKey.push(item.key);
          this.handleCheckedTreeNode(item.children, arrayKey);
        }
      }
    });
  }

  update() {
    this.modalSrv.confirm({
      nzTitle: '确认更新?',
      nzOnOk: () => {
        this.updateRoleModule();
      }
    });
  }

  updateRoleModule() {
    const checkedNodes = this.tree.getCheckedNodeList();
    const halfCheckedNodes = this.tree.getHalfCheckedNodeList();
    this.arrayKey = [];
    this.handleCheckedTreeNode(checkedNodes, this.arrayKey);
    halfCheckedNodes.forEach((item: NzTreeNode) => {
      this.arrayKey.push(item.key);
    });

    this.http.put(`Role/UpdateRoleAuth/${this.roleId}`, {
      ModuleIds: this.arrayKey
    }).subscribe(d => {
      if (d === null) return;
      this.msg.success('更新成功');
      this.InitTree(this.roleId);
    });
  }
}

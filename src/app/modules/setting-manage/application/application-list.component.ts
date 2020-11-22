import { OnInit, Component, ViewChild } from '@angular/core';
import { H_Http, CoreContainer, icons } from '@core';
import { ActivatedRoute } from '@angular/router';
import { NzTreeNode, NzFormatEmitEvent } from 'ng-zorro-antd/tree';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicationEditComponent } from './application-edit/application-edit.component';
import { ResourceEditComponent } from './resource-edit/resource-edit.component';

@Component({
    selector: 'application-list',
    templateUrl: './application-list.component.html',
    styleUrls: ['./application-list.component.less']
})

export class ApplicationListComponent extends CoreContainer implements OnInit {


    @ViewChild('DiaglogApplicationEdit', { static: false }) dialogApplication: ApplicationEditComponent;


    @ViewChild('DiaglogResourceEdit', { static: false }) dialogResource: ResourceEditComponent;

    nodes = null;

    activedNode: any = { key: '0' };

    type = 0;
    title = '';
    iconName = '';

    form: FormGroup;

    resourceData = null;
    editCache: { [key: string]: { edit: boolean; data: any } } = {};


    iconList: string[];

    get fName() {
        return this.form.controls.fName;
    }

    get fIcon() {
        return this.form.controls.fIcon;
    }

    get fRouterUrl() {
        return this.form.controls.fRouterUrl;
    }


    get fSort() {
        return this.form.controls.fSort;
    }

    constructor(
        private http: H_Http,
        private router: ActivatedRoute,
        private fb: FormBuilder,
        private modalSrv: NzModalService,
        private msg: NzMessageService) {

        super();

        this.iconList = icons;
        this.form = this.fb.group({
            fName: [null, Validators.required],
            fIcon: [null, Validators.required],
            fRouterUrl: [null, Validators.required],
            fSort: [null, Validators.required],
            fCode: [{ value: null, disabled: true }, Validators.nullValidator]
        });
    }


    ngOnInit(): void {
        this.nodes = this.router.snapshot.data.treeList;
    }


    onInputIcon(event: InputEvent) {

        const inputLength = event.data.length;
        this.fIcon.setValue(this.fIcon.value.substring(0, this.fIcon.value.length - inputLength));
    }

    onKeyDownIcon(event: KeyboardEvent) {
        return false; //任何 都不能输入
    }


    select(data: NzFormatEmitEvent): void {
        if (this.activedNode.key === data.node.key) return;
        this.activedNode = data.node;
        this.getNodeInfo(data.node);
    }

    getNodes() {
        this.http.get(`Module/GetList`).subscribe(d => {
            if (!d) return;
            this.nodes = d;
        });
    }

    getNodeInfo(node: any) {
        if (node.key === '0') {
            this.type = 0;
            return;
        }
        this.http.get(`Module/Get/${node.key}`).subscribe(d => {
            if (!d) return;
            this.type = d.Type;
            this.iconName = d.Icon;
            this.form.get('fName').setValue(d.Name);
            this.form.get('fSort').setValue(d.Sort);
            this.form.get('fIcon').setValue(d.Icon);
            this.form.get('fRouterUrl').setValue(d.RouterUrl);
            this.form.get('fCode').setValue(d.Code);
            if (this.type === 2) {
                this.resourceData = d.Resources;
                this.handleResourceData();
            }
        });
    }

    addNode(e: Event) {
        e.stopPropagation();
        if (this.type === 0) {
            this.title = '添加主菜单';
        } else {
            this.title = '添加应用';
        }
        this.dialogApplication.isVisible = true;
    }


    updateNode() {

        if (!this.checkForm(this.form)) return;
        this.modalSrv.confirm({
            nzTitle: '确认更新?',
            nzOnOk: () => {
                this.http.put(`Module/Update/${this.activedNode.key}`, {
                    Name: this.fName.value,
                    Icon: this.fIcon.value,
                    RouterUrl: this.fRouterUrl.value,
                    Sort: this.fSort.value,
                    Type: this.type
                }).subscribe(d => {
                    if (!d) return;
                    this.msg.success('更新成功');
                    this.getNodes();
                });
            }
        });
    }

    deleteNode() {
        this.modalSrv.confirm({
            nzTitle: '确认删除?',
            nzOnOk: () => {
                this.http.delete(`Module/Delete/${this.activedNode.key}`).subscribe(d => {
                    if (!d) return;
                    this.getNodes();
                    this.activedNode = { key: '0' };
                    this.type = null;
                });
            }
        });
    }

    saveAddNode() {
        this.getNodes();
    }

    checkForm(form: FormGroup): boolean {
        let flag = true;
        for (const key of Object.keys(form.controls)) {
            if ((this.type === 1 && key === 'fRouterUrl') || (this.type === 2 && key === 'fIcon')) continue;
            form.controls[key].markAsDirty();
            form.controls[key].updateValueAndValidity();
            flag = flag && !form.controls[key].invalid;
        }
        return flag;
    }

    //添加资源
    addResource() {
        this.dialogResource.isVisible = true;
    }

    getResources() {
        this.http.get(`Resource/GetList/${this.activedNode.key}`).subscribe(d => {
            if (!d) return;
            this.resourceData = d;
            this.handleResourceData();
        });
    }

    handleResourceData() {
        this.resourceData.forEach(item => {
            this.editCache[item.Id] = {
                edit: false,
                data: { ...item }
            };
        });
    }

    saveAddResource() {
        this.getResources();
    }

    deleteResource(id: any) {
        this.http.delete(`Resource/Delete/${id}`).subscribe(d => {
            if (!d) return;
            this.getResources();
        });
    }

    startEdit(id: string): void {
        this.editCache[id].edit = true;
    }

    saveEdit(id: string): void {
        this.http.put(`Resource/Update/${this.editCache[id].data.Id}`, {
            Name: this.editCache[id].data.Name,
            Sort: parseInt(this.editCache[id].data.Sort, 10)
        }).subscribe(d => {
            if (!d) return;
            this.msg.success('更新成功');
            this.getResources();
        });
    }


    cancelEdit(id: string): void {
        const index = this.resourceData.findIndex(item => item.Id === id);
        this.editCache[id] = {
            data: { ...this.resourceData[index] },
            edit: false
        };
    }

}

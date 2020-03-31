import { OnInit, Component } from '@angular/core';
import { H_Http } from '@core';
import { ActivatedRoute } from '@angular/router';
import { NzTreeNode, NzFormatEmitEvent, NzModalService } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'application-list',
    templateUrl: './application-list.component.html',
    styleUrls: ['./application-list.component.less']
})

export class ApplicationListComponent implements OnInit {

    nodes = null;

    activedNode: any = { key: '0' };

    type = null;
    iconName = '';

    form: FormGroup;


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
        private modalSrv: NzModalService) {
        this.form = this.fb.group({
            fName: [null, Validators.required],
            fIcon: [null, Validators.required],
            fRouterUrl: [null, Validators.required],
            fSort: [null, Validators.required]
        });
    }


    ngOnInit(): void {
        this.nodes = this.router.snapshot.data.treeList;
    }


    select(data: NzFormatEmitEvent): void {
        this.activedNode = data.node;
        this.getNodeInfo(data.node);
    }

    getNodes() {
        this.http.get(`Module`).subscribe(d => {
            if (!d) return;
            this.nodes = d;
        });
    }

    getNodeInfo(node: any) {
        this.http.get(`Module/${node.key}`).subscribe(d => {
            if (!d) return;
            this.type = d.Type;
            this.iconName = d.Icon;
            this.form.get('fName').setValue(d.Name);
            this.form.get('fSort').setValue(d.Sort);
            this.form.get('fIcon').setValue(d.Icon);
            this.form.get('fRouterUrl').setValue(d.RouterUrl);
        });
    }

    addNode() {

    }

    updateNode() {

        if (!this.checkForm(this.form)) return;
        this.modalSrv.confirm({
            nzTitle: '确认更新?',
            nzOnOk: () => {
                this.http.put(`Module/${this.activedNode.key}`, {
                    Name: this.fName.value,
                    Icon: this.fIcon.value,
                    RouterUrl: this.fRouterUrl.value,
                    Sort: this.fSort.value,
                    Type: this.type
                }).subscribe(d => {
                    if (!d) return;
                    this.getNodes();
                });
            }
        });
    }

    deleteNode() {
        this.modalSrv.confirm({
            nzTitle: '确认删除?',
            nzOnOk: () => {
                this.http.delete(`Module/${this.activedNode.key}`).subscribe(d => {
                    if (!d) return;
                    this.getNodes();
                    this.activedNode = { key: '0' };
                    this.type = null;
                });
            }
        });
    }

    checkForm(form: FormGroup): boolean {
        let flag = true;
        for (const key of Object.keys(form.controls)) {
            if (this.type === 1 && key === 'fRouterUrl' || this.type === 2 && key === 'fIcon') continue;
            form.controls[key].markAsDirty();
            form.controls[key].updateValueAndValidity();
            flag = flag && !form.controls[key].invalid;
        }
        return flag;
    }
}

import { OnInit, Component } from '@angular/core';
import { H_Http } from '@core';
import { ActivatedRoute } from '@angular/router';
import { NzTreeNode, NzFormatEmitEvent } from 'ng-zorro-antd';
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

    constructor(
        private http: H_Http,
        private router: ActivatedRoute,
        private fb: FormBuilder) {
        this.form = this.fb.group({
            fTitle: [null],
            fIcon: [null],
            fUrl: [null],
            fSort: [null]
        });
    }


    ngOnInit(): void {
        this.nodes = this.router.snapshot.data.treeList;
    }


    select(data: NzFormatEmitEvent): void {
        this.activedNode = data.node;
        this.getNodeInfo(data.node);
    }

    getNodeInfo(node: any) {
        this.http.get(`Module/${node.key}`).subscribe(d => {
            if (!d) return;
            this.type = d.Type;
            this.iconName = d.Icon;
            this.form.get('fTitle').setValue(d.Name);
            this.form.get('fSort').setValue(d.Sort);
            this.form.get('fIcon').setValue(d.Icon);
            this.form.get('fUrl').setValue(d.RouterUrl);
        });
    }

    addNode() {

    }
}

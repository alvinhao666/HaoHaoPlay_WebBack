import { OnInit, Component } from '@angular/core';
import { H_Http } from '@core';
import { ActivatedRoute } from '@angular/router';
import { NzTreeNode, NzFormatEmitEvent } from 'ng-zorro-antd';

@Component({
    selector: 'application-list',
    templateUrl: './application-list.component.html',
    styleUrls: ['./application-list.component.less']
})

export class ApplicationListComponent implements OnInit {

    nodes = null;

    activedNode: any = { key: '0' };

    type = null;

    constructor(
        private http: H_Http,
        private router: ActivatedRoute) {

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
            console.log(d);
        });
    }
}

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

    activedNode: NzTreeNode;

    constructor(
        private http: H_Http,
        private router: ActivatedRoute) {

    }


    ngOnInit(): void {
        this.nodes = this.router.snapshot.data.treeList;
    }


    activeNode(data: NzFormatEmitEvent): void {
        // tslint:disable-next-line:no-non-null-assertion
        this.activedNode = data.node!;
    }
}

import { OnInit, Component } from '@angular/core';
import { H_Http } from '@core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'application-list',
    templateUrl: './application-list.component.html',
    styleUrls: ['./application-list.component.less']
})

export class ApplicationListComponent implements OnInit {

    nodes = null;

    constructor(
        private http: H_Http,
        private router: ActivatedRoute) {

    }


    ngOnInit(): void {
        this.nodes = this.router.snapshot.data.treeList;
    }

}

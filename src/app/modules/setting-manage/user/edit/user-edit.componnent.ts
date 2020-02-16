import { OnInit, Component, Input } from '@angular/core';

@Component({
    selector: 'slider-user',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.less']
})

export class UserEditComponent implements OnInit {

    @Input()
    visible = false;


    constructor() {

    }

    ngOnInit() {

    }

    close() {
        this.visible = false;
    }
}
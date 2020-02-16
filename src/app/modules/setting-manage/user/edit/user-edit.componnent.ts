import { OnInit, Component, Input, Output, EventEmitter, ComponentRef } from '@angular/core';

@Component({
    selector: 'slider-user',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.less']
})

export class UserEditComponent implements OnInit {

    @Input() visible = false;

    @Input() title = '';

    @Output() onClose = new EventEmitter();

    constructor() {

    }

    ngOnInit() {

    }

    close() {
        this.onClose.emit();
    }
}
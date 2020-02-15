import { OnInit, Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { H_Http } from '@core';
// import { UserEditComponent } from './edit/user-edit.componnent';
// import { NzDrawerService } from 'ng-zorro-antd';

@Component({
    selector: 'setting-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.less']
})

export class UserListComponent implements OnInit {

    searchForm: FormGroup;
    statuses = [
        { text: '注销', value: 'false' },
        { text: '启用', value: 'true' }
    ];
    filterGender = [
        { text: '男', value: '1' },
        { text: '女', value: '0' }
    ];
    sGender = '';

    dataSet: any[] = [];

    pageIndex = 1;
    pageSize = 10;
    total = 1;

    sortValue = '';
    sortKey = '';


    get sName() {
        return this.searchForm.controls.sName;
    }

    get sPhone() {
        return this.searchForm.controls.sPhone;
    }

    get sEnabled() {
        return this.searchForm.controls.sEnabled;
    }

    get sLastLoginTime() {
        return this.searchForm.controls.sLastLoginTime;
    }


    constructor(
        private fb: FormBuilder,
        private http: H_Http,
        // private drawerService: NzDrawerService
    ) {
        this.searchForm = this.fb.group({
            sName: [null],
            sPhone: [null],
            sGender: [null],
            sEnabled: [null],
            sLastLoginTime: [null]
        });
    }



    ngOnInit() {
        this.getUsers();
    }


    pageIndexChange(pageIndex: number) {
        this.pageIndex = pageIndex;
        this.getUsers();
    }

    pageSizeChange(pageSize: number) {
        this.pageSize = pageSize;
        this.getUsers();
    }

    sort(sort: { key: string, value: string }): void {
        this.sortKey = sort.key;
        if (sort.value === 'ascend')
            this.sortValue = '0';
        else if (sort.value === 'descend')
            this.sortValue = '1';
        else
            this.sortValue = '';
        this.getUsers();
    }

    updateFilter(values: string[]): void {
        if (values.length !== this.filterGender.length && values.length > 0)
            this.sGender = values[0];
        else
            this.sGender = '';
        this.getUsers();
    }

    //查询用户
    getUsers() {
        this.http
            .get('User', {
                // Name: this.sName.value || '',
                // Phone: this.sPhone.value || '',
                Gender: this.sGender,
                // Enabled: this.sEnabled.value || '',
                // LastLoginTimeStart: this.sLastLoginTime.value && this.datePipe.transform(this.sLastLoginTime.value[0], 'yyyy-MM-dd HH:mm') || '',
                // LastLoginTimeEnd: this.sLastLoginTime.value && this.datePipe.transform(this.sLastLoginTime.value[1], 'yyyy-MM-dd HH:mm') || '',
                PageIndex: this.pageIndex,
                PageSize: this.pageSize,
                SortField: this.sortKey,
                OrderByType: this.sortValue
            })
            .subscribe((d: any) => {
                this.dataSet = d.Items;
                this.pageIndex = d.PageIndex;
                this.pageSize = d.PageSize;
                this.total = d.TotalCount;
            });
    }

    addUser() {
        // const drawerRef = this.drawerService.create<UserEditComponent, { value: string }, string>({
        //     nzTitle: '新增用户',
        //     nzContent: UserEditComponent
        //     // nzContentParams: {
        //     //     value: this.value
        //     // }
        //   });

        //   drawerRef.afterOpen.subscribe(() => {
        //     console.log('Drawer(Component) open');
        //   });

        //   drawerRef.afterClose.subscribe(data => {
        //     console.log(data);
        //     if (typeof data === 'string') {
        //     //   this.value = data;
        //     }
        //   });
    }

}

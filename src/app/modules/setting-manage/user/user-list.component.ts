import { OnInit, Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { H_Http } from '@core';
import { DatePipe } from '@angular/common';
import { environment } from '@env/environment';
import { UploadFile, NzModalService } from 'ng-zorro-antd';
import { UserEditComponent } from './user-edit/user-edit.componnent';
import { UserViewComponent } from './user-view/user-view.component';
import { ActivatedRoute } from '@angular/router';
import { Core } from '@core/container/core';

@Component({
    selector: 'user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.less']
})

export class UserListComponent extends Core implements OnInit {

    @ViewChild('silderUserEdit', { static: false }) sliderUserEdit: UserEditComponent;
    @ViewChild('silderUserView', { static: false }) sliderUserView: UserViewComponent;
    slider_edit_visible = false;
    slider_edit_title = '';

    slider_view_visible = false;
    slider_view_title = '';

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

    uploading = false;
    fileList: UploadFile[] = [];



    tableLoading = false;
    constructor(
        private fb: FormBuilder,
        private http: H_Http,
        private datePipe: DatePipe,
        private modalSrv: NzModalService,
        private router: ActivatedRoute) {

        super();
        this.searchForm = this.fb.group({
            sName: [null],
            sPhone: [null],
            sEnabled: [null],
            sLastLoginTime: [null]
        });
    }



    ngOnInit() {
        const d = this.router.snapshot.data.userList;
        this.dataSet = d.Items;
        this.total = d.TotalCount;
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
        this.tableLoading = true;
        this.http
            .get('User', {
                Name: this.sName.value || '',
                Phone: this.sPhone.value || '',
                Gender: this.sGender,
                Enabled: this.sEnabled.value || '',
                LastLoginTimeStart: this.sLastLoginTime.value && this.datePipe.transform(this.sLastLoginTime.value[0], 'yyyy-MM-dd') || '',
                LastLoginTimeEnd: this.sLastLoginTime.value && this.datePipe.transform(this.sLastLoginTime.value[1], 'yyyy-MM-dd') || '',
                PageIndex: this.pageIndex,
                PageSize: this.pageSize,
                SortField: this.sortKey,
                OrderByType: this.sortValue
            })
            .subscribe(d => {
                this.tableLoading = false;
                if (!d) return;
                this.dataSet = d.Items;
                this.pageIndex = d.PageIndex;
                this.pageSize = d.PageSize;
                this.total = d.TotalCount;
            }, e => {
                this.tableLoading = false;
            }
            );
    }

    export() {
        this.http
            .get('User/Export', {
                Name: this.sName.value || '',
                Phone: this.sPhone.value || '',
                Gender: this.sGender,
                Enabled: this.sEnabled.value || '',
                LastLoginTimeStart: this.sLastLoginTime.value && this.datePipe.transform(this.sLastLoginTime.value[0], 'yyyy-MM-dd') || '',
                LastLoginTimeEnd: this.sLastLoginTime.value && this.datePipe.transform(this.sLastLoginTime.value[1], 'yyyy-MM-dd') || '',
                OrderFileds: this.sortValue && (this.sortKey + this.sortValue)
            })
            .subscribe((d: any) => {
                const a = document.createElement('a'); //创建一个<a></a>标签
                a.href = `${environment.api_url}ExportExcel/${d.FileName}?Authorization=${this.getToken()}&FileId=${d.FileId}`;
                a.download = '系统用户.xlsx';  //文件名称   //跨域的时候 名字不会改
                a.style.display = 'none';
                document.body.appendChild(a);
                a.click();
                a.remove();
            });
    }

    exportTemplate() {
        const a = document.createElement('a'); //创建一个<a></a>标签
        a.href = `${environment.api_url}template/user.xlsx?Authorization=${this.getToken()}`;
        a.download = '用户模板.xlsx';  //文件名称   //跨域的时候 名字不会改
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        a.remove();
    }

    addUser() {
        this.slider_edit_title = '添加用户';
        this.slider_edit_visible = true;
        this.sliderUserEdit.getRoles();
    }


    beforeUpload = (file: UploadFile): boolean => {
        const isExist = this.fileList.find(a => a.name === file.name);
        if (!isExist) {
            this.fileList = this.fileList.concat(file);
        }
        return false;
    }

    closeEditSlider() {
        this.slider_edit_visible = false;
    }

    onSave() {
        this.slider_edit_visible = false;
        this.pageIndex = 1;
        this.getUsers();
    }

    //删除用户
    delete(data: any) {
        this.modalSrv.confirm({
            nzTitle: `确认删除 ${data.Name}?`,
            nzOnOk: () => this.http
                .delete(`User/${data.Id}`)
                .subscribe(() => {
                    this.getUsers();
                })
        });
    }

    //注销用户
    disable(data: any) {
        this.modalSrv.confirm({
            nzTitle: `确认注销 ${data.Name}?`,
            nzOnOk: () => this.http
                .put(`User/Disable/${data.Id}`)
                .subscribe(() => {
                    this.getUsers();
                })
        });
    }

    //启用用户
    enable(data: any) {
        this.modalSrv.confirm({
            nzTitle: `确认启用 ${data.Name}?`,
            nzOnOk: () => this.http
                .put(`User/Enable/${data.Id}`)
                .subscribe(() => {
                    this.getUsers();
                })
        });
    }

    async edit(id: any) {
        await this.sliderUserEdit.showUser(id);
        this.slider_edit_title = '编辑用户';
        this.slider_edit_visible = true;
    }

    async view(id: any) {
        await this.sliderUserView.showUser(id);
        this.slider_view_visible = true;
    }


    private getToken(): string {
        return localStorage.getItem(environment.token_key);
    }
}

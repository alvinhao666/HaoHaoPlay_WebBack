import { OnInit, Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { H_Http } from '@core';
import { DatePipe } from '@angular/common';
import { environment } from '@env/environment';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserEditComponent } from './user-edit/user-edit.componnent';
import { UserViewComponent } from './user-view/user-view.component';
import { ActivatedRoute } from '@angular/router';
import { CoreContainer } from '@core';

@Component({
    selector: 'user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.less']
})

export class UserListComponent extends CoreContainer implements OnInit {

    @ViewChild('silderUserEdit', { static: false }) sliderUserEdit: UserEditComponent;
    @ViewChild('silderUserView', { static: false }) sliderUserView: UserViewComponent;

    searchForm: FormGroup;
    statuses = [
        { text: '注销', value: 'false' },
        { text: '启用', value: 'true' }
    ];
    filterGender = [
        { text: '男', value: '1' },
        { text: '女', value: '0' }
    ];
    sGender = null;

    colSortAge = SortUser.Age;

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
    fileList: NzUploadFile[] = [];

    constructor(
        private fb: FormBuilder,
        private http: H_Http,
        private datePipe: DatePipe,
        private modalSrv: NzModalService,
        private router: ActivatedRoute,
        public msg: NzMessageService) {

        super();

        this.searchPagedListFn = this.getUsers;

        this.searchForm = this.fb.group({
            sName: [null],
            sPhone: [null],
            sEnabled: [null],
            sLastLoginTime: [null]
        });
    }



    ngOnInit() {
        this.scrollValue.y = '400px';
        this.scrollValue.x = (window.innerWidth - 296 - 50) + 'px';

        this.setTableData(this.router.snapshot.data.userList);
    }

    //查询用户
    getUsers() {
        return this.http
            .get('User/GetPagedList', this.setQueryParam({
                Name: this.sName.value,
                Phone: this.sPhone.value,
                Gender: this.sGender,
                Enabled: this.sEnabled.value,
                LastLoginTimeStart: this.sLastLoginTime.value && this.datePipe.transform(this.sLastLoginTime.value[0], 'yyyy-MM-dd'),
                LastLoginTimeEnd: this.sLastLoginTime.value && this.datePipe.transform(this.sLastLoginTime.value[1], 'yyyy-MM-dd')
            }));
    }



    updateFilter(values: string[]): void {
        if (values.length !== this.filterGender.length && values.length > 0)
            this.sGender = values[0];
        else
            this.sGender = null;
        this.reSearch();
    }


    export() {
        this.http
            .get('User/Export', {
                Name: this.sName.value,
                Phone: this.sPhone.value,
                Gender: this.sGender,
                Enabled: this.sEnabled.value,
                LastLoginTimeStart: this.sLastLoginTime.value && this.datePipe.transform(this.sLastLoginTime.value[0], 'yyyy-MM-dd'),
                LastLoginTimeEnd: this.sLastLoginTime.value && this.datePipe.transform(this.sLastLoginTime.value[1], 'yyyy-MM-dd')
                // OrderFileds: this.sortValue && (this.sortKey + this.sortValue)
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
        a.href = `${environment.api_url}file_template/user.xlsx?Authorization=${this.getToken()}`;
        a.download = '用户模板.xlsx';  //文件名称   //跨域的时候 名字不会改
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        a.remove();
    }

    addUser() {
        this.sliderUserEdit.visible = true;
        this.sliderUserEdit.title = '添加用户';
        this.sliderUserEdit.getRoles();
    }


    beforeUpload = (file: NzUploadFile): boolean => {
        const isExist = this.fileList.find(a => a.name === file.name);
        if (!isExist) {
            this.fileList = this.fileList.concat(file);
        }
        return false;
    }

    importExcel() {
        const formData = new FormData();
        // tslint:disable-next-line:no-any
        this.fileList.forEach((file: any) => {
            formData.append('用户数据', file);
        });

        this.http.post('User/Import', formData).subscribe(d => {
            if (!d) return;
            this.msg.success('导入成功');
        });
    }

    //删除用户
    delete(data: any) {
        this.modalSrv.confirm({
            nzTitle: `确认删除 ${data.Name}?`,
            nzOnOk: () => this.http
                .delete(`User/Delete/${data.Id}`)
                .subscribe(() => {
                    this.search();
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
                    this.search();
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
                    this.search();
                })
        });
    }

    async edit(id: any) {
        await this.sliderUserEdit.showUser(id);
        this.sliderUserEdit.title = '编辑用户';
        this.sliderUserEdit.visible = true;
    }

    async view(id: any) {
        await this.sliderUserView.showUser(id);
        this.sliderUserView.visible = true;
    }


    private getToken(): string {
        return localStorage.getItem(environment.token_key);
    }
}


export enum SortUser {
    Age
}
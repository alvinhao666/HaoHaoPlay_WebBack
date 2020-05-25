import { Core } from './core';
import { Observable } from 'rxjs';

export class CoreContainer extends Core {

    //当前页码
    pageIndex = 1;
    //每页条数
    pageSize = 10;
    //总数
    totalCount = 1;
    //数据集
    dataSet: any[] = [];
    //查询显示加载动画
    tableLoading = false;
    //滚动
    scrollValue = { x: '0px', y: '0px' };

    //分页查询方法入参
    // searchParam: any = null;

    //分页查询方法
    searchFn: (param?: any) => Observable<any>;

    constructor() {
        super();
    }

    // 检查权限
    checkAuth(authCode: string): boolean {
        const auths = authCode.split('_');
        if (auths.length < 2) return false;
        const layer = parseInt(auths[0], 10);
        if (isNaN(layer)) return false;
        const index = layer - 1;
        if (index < 0) return false;
        const num = Number(auths[1]);
        const authNum = Number(Core.authNums[index]);
        return (num & authNum) === num;
    }

    search() {
        this.tableLoading = true;
        this.searchFn().subscribe(d => {
            this.tableLoading = false;
            this.setTableData(d);
        }, e => {
            this.tableLoading = false;
        });
    }

    pageIndexChange(pageIndex: number) {
        this.pageIndex = pageIndex;
        this.search();
    }

    pageSizeChange(pageSize: number) {
        this.pageSize = pageSize;
        this.search();
    }


    initPageIndex() {
        this.pageIndex = 1;
    }


    handleSearchParam(param?: any): any {
        return Object.assign(param, {
            PageIndex: this.pageIndex,
            PageSize: this.pageSize,
        });
    }

    setTableData(d: any) {
        if (!d) return;
        this.dataSet = d.Items;
        this.pageIndex = d.PageIndex;
        this.pageSize = d.PageSize;
        this.totalCount = d.TotalCount;
    }
}
import { Core } from './core';

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

    searchPagedListParam: any = null;

    searchPagedListFn: (param?: any) => void;

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

    pageIndexChange(pageIndex: number) {
        this.pageIndex = pageIndex; 
        this.searchPagedListFn(this.searchPagedListParam);
    }

    pageSizeChange(pageSize: number) {
        this.pageSize = pageSize;
        this.searchPagedListFn(this.searchPagedListParam);
    }
}
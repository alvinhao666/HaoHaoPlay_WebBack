import { Core } from './core';

export class CoreContainer extends Core {

    //当前页码
    pageIndex = 1;
    //每页条数
    pageSize = 10;
    //总数
    totalCount = 1;

    constructor() {
        super();
    }

    // 检查权限
    CheckAuth(authCode: string): boolean {
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
 
    }

    pageSizeChange(pageSize: number) {
        this.pageSize = pageSize;
    }
}
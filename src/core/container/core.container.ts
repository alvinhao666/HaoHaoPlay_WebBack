import { Core } from './core';

export class CoreContainer extends Core {

    constructor() {
        super();
    }

    // 检查权限
    CheckAuth(authCode: string): boolean {
        const auths = authCode.split('_');
        const index = parseInt(auths[0], 10) - 1;
        const num = Number(auths[1]);
        const authNum = Number(Core.authNums[index]);
        return (num & authNum) === num;
    }
}
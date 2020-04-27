import { Core } from './core';

export class CoreContainer extends Core {

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
}
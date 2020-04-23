export class Core {

    public static authNums: string[]; //浏览器刷新会消失

    constructor() {

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
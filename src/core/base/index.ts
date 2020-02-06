import { Injector } from '@angular/core';

export class Core {
    static modules: any[];
    static strategies: string[];
    static injector: Injector;

    protected injector: Injector;

    constructor() {
        this.injector = Core.injector;
    }
}

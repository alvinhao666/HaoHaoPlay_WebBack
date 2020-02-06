import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';

export * from './base';
export * from './net';
// export * from './util';

@NgModule({
    imports: [CommonModule],
})

export class CoreModule { }



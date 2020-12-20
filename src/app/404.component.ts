import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'app-page-404',
    template: `<div class="exception404">
                <div class="exception-img-block">
                    <div class="exception__img" style="background-image: url('../../assets/img/404.svg');background-color : #f0f2f5;"></div>
                </div>
                <div class="exception__cont">
                    <h1 class="exception__cont-title">404</h1>
                    <div class="exception__cont-desc">抱歉，你访问的页面不存在</div>
                    <button nz-button="" class="ant-btn ant-btn-primary ng-star-inserted" (click)="location.back()"><span class="ng-star-inserted">返回</span></button>
                </div>
              </div>
   
              `,
    styles: [`
        .exception404{
            display: flex;
            align-items: center;
            height: 100%;

            background-color : #f0f2f5;
        }
        .exception-img-block {
            flex: 0 0 62.5%;
            width: 62.5%;
            padding-right: 152px;
            zoom: 1;
        }
        .exception__img {
            float: right;
            width: 100%;
            max-width: 430px;
            height: 360px;
            background-repeat: no-repeat;
            background-position: 50% 50%;
            background-size: 100% 100%;
        }
        .exception__cont-title {
            margin-bottom: 24px;
            color: #434e59;
            font-weight: 600;
            font-size: 72px;
            line-height: 72px;
        }
        .exception__cont-desc {
            margin-bottom: 16px;
            color: rgba(0,0,0,.45);
            font-size: 20px;
            line-height: 28px;
        }
    `
    ]
})
export class Exception404Component {

    constructor(
        public location: Location) {
    }
}

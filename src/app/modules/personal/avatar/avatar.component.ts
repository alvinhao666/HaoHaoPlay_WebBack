import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { cropbox, H_Http } from '@core';
import { Console } from 'console';

@Component({
  selector: 'dialog-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.less']
})
export class AvatarComponent implements OnInit {

  isVisible = false;

  options = {
    imageBox: '.imageBox',
    thumbBox: '.thumbBox',
    // spinner: '.spinner',
    imgSrc: '',
    previewBoxF: '.previewBoxF',
    previewBoxS: '.previewBoxS'
  };

  cropper: any = null;

  cos: any = null;

  @Output() onSave = new EventEmitter();

  constructor(
    private msg: NzMessageService,
    private http: H_Http) { }


  ngOnInit() {
    const COS = require('cos-js-sdk-v5');
    this.cos = new COS({ getAuthorization: this.getTencentCosFederationToken.bind(this) });

  }

  getTencentCosFederationToken(options, callback) {
    this.http.get('Common/GetTencentCosFederationToken').subscribe(d => {
      if (d === null) return;
      const credentials = d && d.Credentials;
      callback({
        TmpSecretId: credentials.TmpSecretId,
        TmpSecretKey: credentials.TmpSecretKey,
        XCosSecurityToken: credentials.Token,
        // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
        StartTime: d.StartTime, // 时间戳，单位秒，如：1580000000
        ExpiredTime: d.ExpiredTime, // 时间戳，单位秒，如：1580000900
      });
    });
  }

  handleCancel() {
    this.isVisible = false;
  }

  async handleOk() {
    //const baseStr = this.cropper.getDataURL();
    const blob = this.cropper.getBlob();

    let bucket = '';
    let key = '';
    let region = '';

    await this.http.get('Common/GetUploadAvatarInfo').toPromise().then(d => {
      if (d === null) return;
      bucket = d.Bucket;
      key = d.Key;
      region = d.Region;
    });

    this.cos.putObject({
      Bucket: bucket, /* 必须 */
      Region: region,     /* 存储桶所在地域，必须字段 */
      Key: key,              /* 必须 */
      Body: blob,                /* 必须 */
      onProgress: function (progressData) {
        console.log(JSON.stringify(progressData));
      }
    }, this.updateHeadImage.bind(this)); 
  }

  updateHeadImage(err, data) {
    
    console.log(err);
    this.http.put('CurrentUser/UpdateHeadImg', { HeadImageUrl: data.Location }).subscribe(d => {
      if (d === null) return;
      this.onSave.emit();
      this.msg.success('更新成功');
    });
  }

  upload() {
    const input = document.getElementById('avatarInput');
    input.click();
    input.onchange = this.changeImg.bind(this);
  }

  changeImg(e: any) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = async function () {
      const url = reader.result as string;
      this.options.imgSrc = url;
      await cropbox(this.options).then((obj) => {
        this.cropper = obj;
        this.cropper.draw();
      });
    }.bind(this);
    reader.readAsDataURL(file);
  }

  turnLeft() {
    this.cropper.turnLeft();
  }

  turnRight() {
    this.cropper.turnRight();
  }

  large() {
    this.cropper.zoomIn();
  }

  reduce() {
    this.cropper.zoomOut();
  }
}


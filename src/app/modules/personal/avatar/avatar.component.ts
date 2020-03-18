import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';



@Component({
  selector: 'dialog-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.less']
})
export class AvatarComponent implements OnInit {

  isVisible = false;

  degree = 0;

  x = 0;
  y = 0;

  isDown = false;

  // isDrag = false;

  i = 1;

  baseUrl = '';

  constructor(
    private msg: NzMessageService) { }


  ngOnInit() {

  }

  mouseDown(e: MouseEvent) {
    e.stopPropagation();

    const dv = e.target as HTMLElement;
    const left = dv.style.backgroundPositionX;
    const top = dv.style.backgroundPositionY;
    //获取x坐标和y坐标
    this.x = e.clientX - parseInt((left === '' ? '0' : left), 10);
    this.y = e.clientY - parseInt((top === '' ? '0' : top), 10);

    //开关打开
    this.isDown = true;

    dv.style.cursor = 'move';
  }


  mouseMove(e: MouseEvent) {
    // console.log(e)
    if (this.isDown === false) return;

    //计算移动后的左偏移量和顶部的偏移量
    const nl = e.clientX - this.x;

    const nt = e.clientY - this.y;
    const dv = e.target as HTMLElement;

    dv.style.backgroundPositionX = nl + 'px';
    dv.style.backgroundPositionY = nt + 'px';
  }

  mouseUp(e: MouseEvent) {

    this.isDown = false;
    const dv = e.target as HTMLElement;
    dv.style.cursor = 'default';
  }

  mouseOut(e: MouseEvent) {

    this.isDown = false;
    const dv = e.target as HTMLElement;
    dv.style.cursor = 'default';
  }

  mouseWheel(e: any) {
    const avatar = e.target as HTMLElement;
    if (avatar.style.backgroundImage === '') return;
    const delD = e.wheelDelta ? e.wheelDelta : -e.detail;
    const height = avatar.clientHeight;
    const width = avatar.clientWidth;
    // this.isDrag = true;
    if (delD > 0) {
      if (avatar.style.backgroundSize === '') {
        const size = `${height + 20}px ${width + 20}px`;
        avatar.style.backgroundSize = size;
        let p = parseInt(avatar.style.backgroundPositionX, 10);
        if (isNaN(p)) p = 0;
        avatar.style.backgroundPosition = `${(p - 10)}px ${(p - 10)}px`;
      } else {
        const hw = parseInt(avatar.style.backgroundSize.split(' ')[0].split('px')[0], 10);
        if (hw < 800) {
          const size = `${hw + 20}px ${hw + 20}px`;
          avatar.style.backgroundSize = size;
          let p = parseInt(avatar.style.backgroundPositionX, 10);
          if (isNaN(p)) p = 0;
          avatar.style.backgroundPosition = `${(p - 10)}px ${(p - 10)}px`;
        }
      }
    } else {
      if (avatar.style.backgroundSize === '') {
        const size = `${height - 20}px ${width - 20}px`;
        avatar.style.backgroundSize = size;
        let p = parseInt(avatar.style.backgroundPositionX, 10);
        if (isNaN(p)) p = 0;
        avatar.style.backgroundPosition = `${(p + 10)}px ${(p + 10)}px`;
      } else {
        const hw = parseInt(avatar.style.backgroundSize.split(' ')[0].split('px')[0], 10);
        if (hw > 200) {
          const size = `${hw - 20}px ${hw - 20}px`;
          avatar.style.backgroundSize = size;
          let p = parseInt(avatar.style.backgroundPositionX, 10);
          if (isNaN(p)) p = 0;
          avatar.style.backgroundPosition = `${(p + 10)}px ${(p + 10)}px`;
        }
      }
    }
  }


  handleCancel() {
    this.isVisible = false;
  }

  handleOk() {
    this.isVisible = false;
  }

  upload() {
    const input = document.getElementById('avatarInput');
    input.click();
    input.onchange = this.changeImg;
  }

  changeImg(e: any) {
    const imgDv = document.getElementById('imgDiv');
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function () {
      const url = reader.result as string;
      // imgDv.style.backgroundSize = '320px 320px';
      imgDv.style.backgroundImage = `url(${url})`;

      const img = new Image();
      img.src = url;
      img.onload = function () {
        const canvas = document.getElementById('preview-f') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 30, 30, 130, 130, 0, 0, 320, 160);
      };
      // const img = new Image();
      // img.src = url;
      // img.onload = function () {
      //   const canvas = document.getElementById('preview-f');
      //   canvas.style.backgroundImage = `url(${url})`;
      //   canvas.style.backgroundSize = '160px 160px';
      //   canvas.style.backgroundPosition = 'center center';
      //   // img.style.clip = 'rect(120,260,260,120)';

      //   const canvas2 = document.getElementById('preview-s');
      //   canvas2.style.backgroundImage = `url(${url})`;
      //   canvas2.style.backgroundSize = '80px 80px';
      //   canvas2.style.backgroundPosition = 'center center';
      // };

    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      imgDv.style.backgroundImage = null;
    }
  }





  turnLeft() {
    const avatar = document.getElementById('imgDiv');
    if (avatar.style.backgroundImage === '') return;
    this.degree = this.degree - 90;
    avatar.style.transform = 'rotate(' + this.degree + 'deg)';
  }

  turnRight() {
    const avatar = document.getElementById('imgDiv');
    if (avatar.style.backgroundImage === '') return;
    this.degree = this.degree + 90;
    avatar.style.transform = 'rotate(' + this.degree + 'deg)';
  }

  large() {
    const avatar = document.getElementById('imgDiv');
    if (avatar.style.backgroundImage === '') return;
    const height = avatar.clientHeight;
    const width = avatar.clientWidth;

    if (avatar.style.backgroundSize === '') {
      const size = `${height + 20}px ${width + 20}px`;
      avatar.style.backgroundSize = size;
      let p = parseInt(avatar.style.backgroundPositionX, 10);
      if (isNaN(p)) p = 0;
      avatar.style.backgroundPosition = `${(p - 10)}px ${(p - 10)}px`;
    } else {
      const hw = parseInt(avatar.style.backgroundSize.split(' ')[0].split('px')[0], 10);
      if (hw < 800) {
        const size = `${hw + 20}px ${hw + 20}px`;
        avatar.style.backgroundSize = size;
        let p = parseInt(avatar.style.backgroundPositionX, 10);
        if (isNaN(p)) p = 0;
        avatar.style.backgroundPosition = `${(p - 10)}px ${(p - 10)}px`;
      }
    }
  }

  reduce() {
    const avatar = document.getElementById('imgDiv');

    if (avatar.style.backgroundImage === '') return;

    const height = avatar.clientHeight;
    const width = avatar.clientWidth;

    if (avatar.style.backgroundSize === '') {
      const size = `${height - 20}px ${width - 20}px`;
      avatar.style.backgroundSize = size;
      let p = parseInt(avatar.style.backgroundPositionX, 10);
      if (isNaN(p)) p = 0;
      avatar.style.backgroundPosition = `${(p + 10)}px ${(p + 10)}px`;
    } else {
      const hw = parseInt(avatar.style.backgroundSize.split(' ')[0].split('px')[0], 10);
      if (hw > 200) {
        const size = `${hw - 20}px ${hw - 20}px`;
        avatar.style.backgroundSize = size;
        let p = parseInt(avatar.style.backgroundPositionX, 10);
        if (isNaN(p)) p = 0;
        avatar.style.backgroundPosition = `${(p + 10)}px ${(p + 10)}px`;
      }
    }
  }


  draw() {
    // let xFactor = image.naturalWidth / image.offsetWidth;
    // let yFactor = image.naturalHeight / image.offsetHeight;
    // console.log(xFactor, yFactor);

    const canvas = document.getElementById('preview-f') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    const url = this.baseUrl;
    img.onload = function () {
      img.src = url;
    };
    // // Draw slice
    // let sx = (selection.offsetLeft - image.offsetLeft) * xFactor;
    // let sy = (selection.offsetTop - image.offsetTop) * yFactor;
    // let sWidth = selection.offsetWidth * xFactor;
    // let sHeight = selection.offsetHeight * yFactor;
    // let dx = 0;
    // let dy = 0;
    // let dWidth = canvas.offsetWidth * 4;
    // let dHeight = canvas.offsetHeight * 4;

    // ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

  }

}

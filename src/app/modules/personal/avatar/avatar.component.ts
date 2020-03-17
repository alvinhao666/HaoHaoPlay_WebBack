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

  isDrag = false;

  i = 1;

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
    const dv = document.getElementById('imgDiv');

    dv.style.backgroundPositionX = nl + 'px';
    dv.style.backgroundPositionY = nt + 'px';
    // const hw = parseInt(dv.style.backgroundSize.split(' ')[0].split('px')[0], 10);
  }

  mouseUp(e: MouseEvent) {

    this.isDown = false;
    const dv = e.target as HTMLElement;
    dv.style.cursor = 'default';
  }

  mouseWheel(e: any) {
    const avatar = document.getElementById('imgDiv');
    if (avatar.style.backgroundImage === '') return;
    const delD = e.wheelDelta ? e.wheelDelta : -e.detail;
    const height = avatar.clientHeight;
    const width = avatar.clientWidth;
    this.isDrag = true;
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
    if (this.isDrag) {
      avatar.style.backgroundPosition = 'center center';
      return;
    }

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

}

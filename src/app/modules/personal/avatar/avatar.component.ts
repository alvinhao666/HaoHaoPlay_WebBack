import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { UrlResolver } from '@angular/compiler';

@Component({
  selector: 'dialog-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.less']
})
export class AvatarComponent implements OnInit {

  isVisible = false;

  degree = 0;
  marginLeft = 0;
  marginTop = 0;

  avatarHeight = 0;
  avatarWidth = 0;

  x = 0;
  y = 0;
  l = 0;
  t = 0;
  isDown = false;

  constructor(
    private msg: NzMessageService) { }


  ngOnInit() {

    //   const dv = document.getElementById('imgDiv');
    //   console.log(dv)
    //   let x = 0;
    //   let y = 0;
    //   let l = 0;
    //   let t = 0;
    //   let isDown = false;
    //   dv.onclick = function () {
    //     alert('1')
    //   };
    //   //鼠标按下事件
    //   dv.onmousedown = function (e) {
    //     console.log('123')
    //     //获取x坐标和y坐标
    //     x = e.clientX;
    //     y = e.clientY;

    //     //获取左部和顶部的偏移量
    //     l = dv.offsetLeft;
    //     t = dv.offsetTop;
    //     //开关打开
    //     isDown = true;
    //     //设置样式  
    //     dv.style.cursor = 'move';
    //   };
    //   //鼠标移动
    //   dv.onmousemove = function (e) {
    //     if (isDown === false) {
    //       return;
    //     }
    //     //获取x和y
    //     const nx = e.clientX;
    //     const ny = e.clientY;
    //     //计算移动后的左偏移量和顶部的偏移量
    //     const nl = nx - (x - l);
    //     const nt = ny - (y - t);

    //     dv.style.left = nl + 'px';
    //     dv.style.top = nt + 'px';
    //   };
    //   //鼠标抬起事件
    //   dv.onmouseup = function () {
    //     //开关关闭
    //     isDown = false;
    //     dv.style.cursor = 'default';
    //   };
    // // };

  }

  mouseDown(e: MouseEvent) {
    //获取x坐标和y坐标
    this.x = e.clientX;
    this.y = e.clientY;

    //获取左部和顶部的偏移量
    this.l = e.offsetX;
    this.t = e.offsetY;
    //开关打开
    this.isDown = true;
  }

  mouseMove(e: any) {
    // console.log(e)
    if (this.isDown === false) {
      return;
    }
    //获取x和y
    const nx = e.clientX;
    const ny = e.clientY;
    //计算移动后的左偏移量和顶部的偏移量
    const nl = nx - (this.x - this.l);
  
    const nt = ny - (this.y - this.t);
    const dv = document.getElementById('imgDiv');

    dv.style.left = nl + 'px';
    dv.style.top = nt + 'px';
  }

  mouseUp(e: any) {
    this.isDown = false;
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

  // changeImg(e: any) {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();
  //   reader.onloadend = function () {
  //     const url = reader.result as string;
  //     document.getElementById('avatarImg').setAttribute('src', url);
  //   };
  //   if (file) {
  //     reader.readAsDataURL(file);
  //   } else {
  //     document.getElementById('avatarImg').setAttribute('src', '');
  //   }
  // }

  changeImg(e: any) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function () {
      const url = reader.result as string;

      document.getElementById('imgDiv').style.backgroundImage = `url(${url})`;
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      document.getElementById('imgDiv').style.backgroundImage = null;
    }
  }






  // turnLeft() {
  //   this.degree = this.degree - 90;
  //   document.getElementById('avatarImg').style.transform = 'rotate(' + this.degree + 'deg)';
  // }

  // turnRight() {
  //   this.degree = this.degree + 90;
  //   document.getElementById('avatarImg').style.transform = 'rotate(' + this.degree + 'deg)';
  // }


  turnLeft() {
    this.degree = this.degree - 90;
    document.getElementById('imgDiv').style.transform = 'rotate(' + this.degree + 'deg)';
  }

  turnRight() {
    this.degree = this.degree + 90;
    document.getElementById('imgDiv').style.transform = 'rotate(' + this.degree + 'deg)';
  }

  large() {
    const avatar = document.getElementById('imgDiv');
    this.avatarHeight = avatar.clientHeight;
    this.avatarWidth = avatar.clientWidth;
    if (this.avatarHeight < 500) {
      this.avatarHeight = this.avatarHeight + 40;
      avatar.style.height = this.avatarHeight + 'px';
      this.marginTop = this.marginTop - 20;
      avatar.style.marginTop = this.marginTop + 'px';
    }
    if (this.avatarWidth < 500) {
      this.avatarWidth = this.avatarWidth + 40;
      avatar.style.width = this.avatarWidth + 'px';
      this.marginLeft = this.marginLeft - 20;
      avatar.style.marginLeft = this.marginLeft + 'px';
      // avatar.style.marginRight = this.marginLeft + 'px';
    }
  }

  reduce() {
    const avatar = document.getElementById('imgDiv');
    const height = avatar.clientHeight;
    const width = avatar.clientWidth;
    if (height > 200) {
      avatar.style.height = (height - 40).toString() + 'px';
      this.marginTop = this.marginTop + 20;
      avatar.style.marginTop = this.marginTop + 'px';
    }
    if (width > 200) {
      avatar.style.width = (width - 40).toString() + 'px';
      this.marginLeft = this.marginLeft + 20;
      avatar.style.marginLeft = this.marginLeft + 'px';
    }


  }
}

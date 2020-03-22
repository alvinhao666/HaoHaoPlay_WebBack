
'use strict';
const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae', 'yellow', 'green', 'orange', 'blue', 'red', 'pink'];

export function getColorByFirstName(firstNameCode: string) {
    const numStr = firstNameCode.charCodeAt(0).toString().split('');
    const num = numStr[numStr.length - 1];
    return colorList[num];
}

const cropbox = async function (options) {
    const el = document.querySelector(options.imageBox),
        obj = {
            state: { dragable: false, mouseX: 0, mouseY: 0 },
            ratio: 1,
            options: options,
            imageBox: el,
            thumbBox: el.querySelector(options.thumbBox),
            spinner: el.querySelector(options.spinner),
            degree: 0,
            image: new Image(),
            getDataURL: function () {
                const width = this.thumbBox.clientWidth,
                    height = this.thumbBox.clientHeight,
                    canvas = document.createElement('canvas'),
                    dim = el.style.backgroundPosition.split(' '),
                    size = el.style.backgroundSize.split(' '),
                    dx = parseInt(dim[0], 10) - el.clientWidth / 2 + width / 2,
                    dy = parseInt(dim[1], 10) - el.clientHeight / 2 + height / 2,
                    dw = parseInt(size[0], 10),
                    dh = parseInt(size[1], 10),
                    sh = parseInt(this.image.height, 10),
                    sw = parseInt(this.image.width, 10);

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');

                ctx.translate(width / 2, height / 2);
                ctx.rotate(this.degree / 180 * Math.PI);
                ctx.translate(-width / 2, -height / 2);
                ctx.drawImage(this.image, 0, 0, sw, sh, dx, dy, dw, dh);

                const imageData = canvas.toDataURL('image/png');

                return imageData;
            },
            getBlob: function () {
                const imageData = this.getDataURL();
                const b64 = imageData.replace('data:image/png;base64,', '');
                const binary = atob(b64);
                const array = [];
                for (let i = 0; i < binary.length; i++) {
                    array.push(binary.charCodeAt(i));
                }
                return new Blob([new Uint8Array(array)], { type: 'image/png' });
            },
            zoomIn: function () {
                this.ratio *= 1.1;
                setBackground();
            },
            zoomOut: function () {
                this.ratio *= 0.9;
                setBackground();
            },
            turnLeft: function () {
                this.degree = this.degree - 90;
                setBackground();
            },
            turnRight: function () {
                this.degree = this.degree + 90;
                setBackground();
            },
            draw: function () {
                const data = this.getDataURL();
                const previewF = document.querySelector(options.previewBoxF);
                const previewS = document.querySelector(options.previewBoxS);
                previewF.setAttribute('src', data);
                previewS.setAttribute('src', data);
            }
        },
        attachEvent = function (node, event, cb) {
            if (node.attachEvent)
                node.attachEvent('on' + event, cb);
            else if (node.addEventListener)
                node.addEventListener(event, cb);
        },
        detachEvent = function (node, event, cb) {
            if (node.detachEvent) {
                node.detachEvent('on' + event, cb);
            } else if (node.removeEventListener) {
                node.removeEventListener(event);
            }
        },
        stopEvent = function (e) {
            if (window.event) e.cancelBubble = true;
            else e.stopImmediatePropagation();
        },
        setBackground = function () {
            const w = obj.image.width * obj.ratio;
            const h = obj.image.height * obj.ratio;

            const pw = (el.clientWidth - w) / 2;
            const ph = (el.clientHeight - h) / 2;
            el.setAttribute('style',
                'background-image: url(' + obj.image.src + '); ' +
                'background-size: ' + w + 'px ' + h + 'px; ' +
                'background-position: ' + pw + 'px ' + ph + 'px; ' +
                'transform: rotate(' + obj.degree + 'deg);' +
                'MozTransform: rotate(' + obj.degree + 'deg);' +
                'webkitTransform: rotate(' + obj.degree + 'deg);' +
                'msTransform: rotate(' + obj.degree + 'deg);' +
                'transform: rotate(' + obj.degree + 'deg);' +
                'background-repeat: no-repeat');
            obj.draw();
        },
        imgMouseDown = function (e) {
            stopEvent(e);

            obj.state.dragable = true;
            obj.state.mouseX = e.clientX;
            obj.state.mouseY = e.clientY;
        },
        imgMouseMove = function (e) {
            stopEvent(e);

            if (obj.state.dragable) {
                const x = e.clientX - obj.state.mouseX;
                const y = e.clientY - obj.state.mouseY;

                const bg = el.style.backgroundPosition.split(' ');

                const bgX = x + parseInt(bg[0], 10);
                const bgY = y + parseInt(bg[1], 10);

                el.style.backgroundPosition = bgX + 'px ' + bgY + 'px';

                obj.state.mouseX = e.clientX;
                obj.state.mouseY = e.clientY;
            }
        },
        imgMouseUp = function (e) {
            stopEvent(e);
            obj.state.dragable = false;
        },
        zoomImage = function (e) {
            const evt = window.event || e;
            const delta = evt.detail ? evt.detail * (-120) : evt.wheelDelta;
            delta > -120 ? obj.ratio *= 1.1 : obj.ratio *= 0.9;
            setBackground();
        };

    obj.image.src = options.imgSrc;
    obj.spinner.style.display = 'block';
    attachEvent(el, 'DOMNodeRemoved', function () { detachEvent(document.body, 'DOMNodeRemoved', imgMouseUp); });
    return new Promise((resolve) => {
        obj.image.onload = () => {
            obj.spinner.style.display = 'none';
            setBackground();

            attachEvent(el, 'mousedown', imgMouseDown);
            attachEvent(el, 'mousemove', imgMouseMove);
            attachEvent(document.body, 'mouseup', imgMouseUp);
            const mousewheel = (/Firefox/i.test(navigator.userAgent)) ? 'DOMMouseScroll' : 'mousewheel';
            attachEvent(el, mousewheel, zoomImage);
            resolve(obj);
        };
    });
};

export { cropbox };

class lunbo {
    constructor(obj) {
        //滚动条元素
        this.scro = obj.scroller;
        this.prev = obj.btnPr || false;
        this.next = obj.btnNx || false;
        this.content = obj.imgPar;
        this.direction = obj.lbDir || false;
        this.atFlag = obj.autoFlag || false;
        this.pgSet = obj.pageIn || false;
        //console.log(this.pgSet.cname);
        this.lunAll = obj.clietSize;
        this.stopCar = obj.stopDom || false;
        this.timer; //定时器
        this.imgindex = 0; //图片索引
        this.numindex = 0; //下标索引
        this.imgs = 0;
        this.init();
    }

    init() {
        this.creatImg(); //创建新图片  获取宽度或者高度
        //是否开启自动轮播
        if (this.prev && this.next) {
            this.prevClick();
            this.nextClick();
        }
        if (this.atFlag) {
            this.automove();
        }
        this.stop();
        
    }
    automove() {
        var _this = this;
        this.timer = setInterval(function() {
            _this.nextmove();
        }, 3000)
    }
    creatImg() {
        this.imgs = this.content.children;
        var newImg = this.imgs[0].cloneNode(true);
        if (this.direction) {
            this.animateDir = true;
        } else {
            this.animateDir = false;
        }
        this.content.appendChild(newImg);
    }
    DotStyle(setting) {
            var setting = setting.toLowerCase();
            if (setting === "open") {
                this.pgSet.pageAll[this.numindex].className = this.pgSet.cname;
                //console.log(this.numindex)
            } else if (setting === "close") {
                this.pgSet.pageAll[this.numindex].classList.remove(this.pgSet.cname);
            }
        }
        /* 向前 */
    prevClick() {
        var _this = this;
        this.prev.onclick = function() {
            clearInterval(_this.timer);
            _this.prevmove();
            if (_this.atFlag) {
                _this.automove();
            }
        }
    }
    prevmove() {
            this.imgindex--;
            if (this.imgindex < 0) {
                this.imgindex = this.imgs.length - 2;
                /* 判断轮播方向 */
                if (this.animateDir) {
                    this.scro.scrollLeft = (this.imgs.length - 1) * this.lunAll;
                } else {
                    this.scro.scrollTop = (this.imgs.length - 1) * this.lunAll;
                }
            }
            if (this.animateDir) {
                animate(this.scro, { 'scrollLeft': this.imgindex * this.lunAll });
            } else {
                animate(this.scro, { 'scrollTop': (this.imgindex * this.lunAll) });
            }
            /* ----------------------- */
            if (this.pgSet) {
                this.DotStyle("close");
                this.numindex--;
                if (this.numindex < 0) {
                    this.numindex = this.pgSet.pageAll.length - 1;
                }
                this.DotStyle("open");
            }
        }
        /* 向后 */
    nextClick() {
        var _this = this;
        this.next.onclick = function() {
            clearInterval(_this.timer);
            _this.nextmove();
            if (_this.atFlag) {
                _this.automove();
            }
        }
    }
    nextmove() {
        this.imgindex++;
        //console.log(this.imgs.length)
        if (this.imgindex >= this.imgs.length) {
            this.imgindex = 1;
            /* 判断轮播方向 */
            if (this.animateDir) {
                this.scro.scrollLeft = 0;
            } else {
                this.scro.scrollTop = 0;
            }
        }
        if (this.animateDir) {
            animate(this.scro, { 'scrollLeft': this.imgindex * this.lunAll });
        } else {
            animate(this.scro, { 'scrollTop': this.imgindex * this.lunAll });
        }
        //下标
        if (this.pgSet) {
            this.DotStyle("close");
            this.numindex++;
            if (this.numindex >= this.pgSet.pageAll.length) {
                this.numindex = 0;
            }
            this.DotStyle("open");
        }
    }
    stop() {
        if(!this.stopCar)return;
        var _this = this;
        this.stopCar.onmouseenter= function (e) { 
            clearInterval(_this.timer);
        }
        this.stopCar.onmouseleave= function (e) { 
            _this.automove();
        }
    }
}
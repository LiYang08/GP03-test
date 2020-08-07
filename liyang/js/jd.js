(function(){
    var lefts = $1(".fd_left");
var imgleftMin = $1(".fd_left img")
var mask = $1('.mask');
var maxBox = $1('.maxBox');
var maxImg = $1('.maxBox img');
var hhh = $1('.hhh');
console.log()
//左
var prev = $1(".btn_left");
//右
var next = $1(".btn_right");
var main = $1(".imgConMin");
var content = $1(".imgAll");
var imgs = content.children;
var imgWidth = imgs[0].offsetWidth;
var imgindex=0;
var imgDom= null;
lefts.onmouseenter = function(){
    maxImg.src=imgleftMin.src;
    mask.style.display = 'block'; //蒙板
    maxBox.style.display = 'block';//放大的图潘
}
//移入隐藏
lefts.onmouseleave = function(){
    mask.style.display = 'none';
    maxBox.style.display = 'none';
}
//移入拖动
lefts.onmousemove = function(ev){
    var e = ev || event;
    //获取mask的定位坐标，并让鼠标点居中
    //maskX maskY
    var maskX = e.clientX - offset(lefts,false).left - mask.clientWidth/2;
    var maskY = e.clientY - offset(lefts,false).top - mask.clientHeight/2+document.documentElement.scrollTop;
   //坐标点范围判断
    if(maskX <=0){
        maskX = 0;
    }
    if(maskX>=(lefts.clientWidth - mask.clientWidth)){
        maskX = lefts.clientWidth - mask.clientWidth;
    }
    if(maskY <=0){
        maskY = 0;
    }
    if(maskY>=(lefts.clientHeight - mask.clientHeight)){
        maskY= lefts.clientHeight - mask.clientHeight;
    }
    mask.style.left = maskX + "px";
    mask.style.top = maskY + "px";
    //缩放比例
    var scaleX = maskX/(lefts.clientWidth - mask.clientWidth);
    var scaleY = maskY/(lefts.clientHeight - mask.clientHeight);
    var maxImgX = scaleX*(maxImg.clientWidth - maxBox.clientWidth)
    var maxImgY = scaleY*(maxImg.clientHeight - maxBox.clientHeight)
    maxImg.style.left = -maxImgX +"px";
    maxImg.style.top = -maxImgY + 'px';
}
prev.onclick =function(){
    prevmove();
}
next.onclick =function(){
    nextmove();
}
function nextmove(){
    animate(main,{'scrollLeft':2*imgWidth});
}
function prevmove(){
    animate(main,{'scrollLeft':-2*imgWidth});
}
content.addEventListener("mouseenter",mouseenterHandler,true);
content.addEventListener("mouseleave",mouseenterHandler,true);
function mouseenterHandler(e){
    if(e.target.tagName==="IMG"){
        if(imgDom){
            imgDom.style.border="2px solid #ffffff";
        }
        var target = e.target;
        target.style.border="2px solid #e53e42";
        imgDom=target;
        imgleftMin.src = target.src;
    }
}
})();

(function(){
    var main = $1(".coR_main");
    var prev = $1(".sprite-up");
    var next = $1(".sprite-down");
    var content = $1(".coR_img");
    var lunAll = $1(".lunbo").clientHeight;
    var jdlb =  new lunbo({
        scroller:main,//滚动条拥有者
        btnPr:prev, //按钮1
        btnNx:next,//按钮2
        imgPar:content,//图片父容器
        lbDir:false,//横向，0纵向
        // autoFlag:true,//1开启，0关闭
        // pageIn:{
        //     pageAll:pageNum,
        //     sign:true,//是否有小圆点  1有0没有,
        //     cname:"active"
        // },   
    })
})();
var CCt2 = $1(".CCt2");
var delprice = $1(".delprice");
var nowPrice = $1(".p-price .price");
var ass = $2(".selColor a");
for(let i=0;i<ass.length;i++){
    ass[i].onclick = function(){
        pajax({
            url:'./jd.json',
            type:'get',
            data:"",
            dataType: 'json'
        }).then(res=>{
            var json = JSON.parse(res);
            CCt2.innerText = json[i].tit;
            nowPrice.innerText = json[i].nprice;
            delprice.innerText = json[i].pprice;
        })
    }
}
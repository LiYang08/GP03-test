//顶部 通过wrapTop委托事件

//*********** 变量定义区************


var prev;
var prevColor = 0;
var arrCol = [];
var wrapTop = document.querySelector(".wrapTop");
var posLocal = document.querySelector(".posLocal");
var proDis_l = document.querySelector(".proDis_l"); //产品展示
wrapTop.addEventListener("mouseenter", mouseenterHandler, true);
wrapTop.addEventListener("mouseleave", mouseenterHandler, true);
// proDis_l.addEventListener("mouseenter",mouseenterHandler1,true)
// proDis_l.addEventListener("mouseleave",mouseenterHandler1,true)
wrapTop.addEventListener("click", clickHandler);
var aCon = document.querySelectorAll(".topRight a");
var cate_menu = $1(".cate_menu");

// *********** 变量定义区结束************



/* 数据加载 */
 //*****菜单加载 *****/
    pajax({
        url:'./data/menu.json',
        type:'get',
        dataType:'json',
        data:''
    }).then(res=>{
        var json = JSON.parse(res);
        var mArr = json[0].list;
        var liDom='';
        mArr.forEach(item => {
             liDom+='<li class="cate_menu_item">';
             item.forEach(value=>{
                liDom+=`<a href="#">${value}</a>
                <span>/</span>`;
            })
            liDom=liDom.substring(0,liDom.length-14);
            liDom+='</li>';
        });
        cate_menu.innerHTML=liDom;
    })

/* ********数据加载结束********* */


// *******导航栏文字移入变色************

//移入变色
colorChange(aCon, "#f10215");





/* **********触发事件部分*************** */
//顶部鼠标划入
function mouseenterHandler(ev) {
    var e = ev || event;
    var target = e.target || e.srcElement;
    //target定位到父元素，来判断子元素
    //省份
    if (e.type == "mouseenter") {
        if (target.className == "topLeft" && target.lastElementChild.className == "mapCity" && target.firstElementChild.className == "posCity") {
            enterStyle(target.lastElementChild, target.firstElementChild);
        }
        if (target.parentNode.className == "topRight" && target.className !== "spacer" && target.className !== "noPosi" && target.className !== "firLi") {
            enterStyle(target.lastElementChild, target.firstElementChild);
        }
    }
    if (e.type == "mouseleave") {
        if (target.className == "topLeft" && target.lastElementChild.className == "mapCity" && target.firstElementChild.className == "posCity") {
            leaveStyle(target.lastElementChild, target.firstElementChild)
        }
        if (target.parentNode.className == "topRight" && target.className !== "spacer" && target.className !== "noPosi" && target.className !== "firLi") {
            // console.log(target.lastElementChild);
            leaveStyle(target.lastElementChild, target.firstElementChild)
        }
    }
}

    $(".proDis_l").on("mouseenter",function () {
        $('.proDisPos').css('display','block');
        //父元素获取局部LI，进行数据切换
        $(".proDis_l").on("mouseenter",".cate_menu_item" ,function () {
            var index = $('.cate_menu_item').index(this);
            $.ajax({
                type: "get",
                url: "./data/menu.json",
                data: "",
                dataType: "json",
                success: function (res) {
                    if(!res[1].menu[index]) return false;
                    //加载标题 topic
                    $('.menu_topic').html("");
                    $('.menu_list').remove();
                    var topic = res[1].menu[index].topic;
                    var menu = res[1].menu[index].menulist;
                    var topicDom ='';
                    $.each(topic, function (index, elem) { 
                        topicDom+=` <li class="mtopic">
                            <a href="#">
                                ${elem}
                                <i><img src="./img/r_jiao.jpg" alt=""></i>
                            </a>
                        </li>`;
                    });
                   $(".menu_topic").append(topicDom);
                   var topicDom ='';
                    var menuDom ='';
                    $.each(menu, function (index, elem) { 
                      for (var key in elem) {
                        menuDom+=` <div class="menu_list clearBoth">
                            <div class="lis_li_1">
                                <a href="#">${key}</a>
                                <i>></i>
                            </div>`;
                            menuDom+=`<div class="mu_con">`;    
                        $.each(elem[key], function (prev, item) { 
                            menuDom+=`<div class="li">
                                <a href="#">${item}</a>
                            </div>`
                        });
                        menuDom+=`</div>`;
                      }
                      menuDom+=`</div>`;
                      $(".menu_left").append(menuDom);
                      menuDom ='';
                    });
                }
            });
        });
    });

    // $(".proDis_l").on("mouseleave",function () {
    //     var index = $('.cate_menu_item').index(this);
    //     $('.proDisPos').css('display','none');
    // });

   

//顶部鼠标点击
function clickHandler(ev) {
    var e = ev || event;
    var target = e.target || e.srcElement;
    if (target.tagName == "A" && target.parentNode.tagName == "LI" && target.parentNode.parentNode.className == "mapCity") {
        if (prev) {
            prev.style.background = "#ffffff";
            prev.style.color = "#999999";
        }
        target.style.background = "#f10215";
        target.style.color = "#ffffff";
        posLocal.innerText = target.innerText;
        prev = target;
        var ids = null;
        ids = setTimeout(function() {
            target.parentNode.parentNode.style.display = "none";
            clearTimeout(ids);
        }, 100)
    }
}

/* User-Defined Functions */
//鼠标划入
function enterStyle(dom, dom1) {
    dom.style.display = "block";
    dom1.style.border = "1px solid #cccccc";
    dom1.style.borderBottom = "none";
    dom1.style.backgroundColor = "#ffffff";
}
//鼠标离开
function leaveStyle(dom, dom1) {
    dom.style.display = "none";
    dom1.style.border = "1px solid #e3e4e5";
    dom1.style.borderBottom = "none";
    dom1.style.backgroundColor = "";
}
//鼠标划入变色，离开变成原色
function colorChange(aCon, newColor) {
    for (var i = 0, len = aCon.length; i < len; i++) {
        aCon[i].index = i;
        arrCol.push(getComputedStyle(aCon[i], null)["color"]);
        aCon[i].onmouseenter = function(e) {
            aCon[prevColor].style.color = arrCol[prevColor];
            prevColor = this.index;
            aCon[prevColor].style.color = newColor;
        }
        aCon[i].onmouseleave = function(e) {
            aCon[prevColor].style.color = arrCol[prevColor];
        }
    }
}
//两张图片左右
(function() {
    var seckill = $1('.seckill-brand');
    var brandCon = $1('.brandCon');
    var branditem = $1('.brand-item').clientWidth;
    var pageNum = $2('.pageNum li');
    var aa = new lunbo({
        scroller: seckill,
        imgPar: brandCon,
        lbDir: true,
        autoFlag: true,
        clietSize: branditem,
        pageIn: {
            pageAll: pageNum,
            cname: "pageshow"
        }
    });
})();

//三张图片左右
// (function() {
//     var seckill = $1('.carmin-main');
//     var brandCon = $1('.carmin-content');
//     var branditem = $1('.carmin_item').clientWidth;
//     var aa = new lunbo({
//         scroller: seckill,
//         imgPar: brandCon,
//         lbDir: true,
//         autoFlag: true,
//         clietSize: branditem,
//     });
// })();

    $(".imgCon").opa({
        imgAll: ".imgCon img",
        prev: ".car_btn_left",
        next: ".car_btn_right",
        pages: ".car_page",
        type: 'mouseenter',
        //elemt:"li", //默认li
        imgclassName: 'imgshow',
        pageclassName: 'sel'
    });

    //  var $carmin_content = $(".carmin-content");
    //  $carmin_content.opa({
    //     imgAll: ".carmin-content div",
    //     prev: ".bl2",
    //     next: ".br2",
    //     imgclassName: 'carmin_item',
    // });

(function () { 
    var seckill = $1('.slider_scroll');
    var brandCon = $1('.sli_list_con');
    var slider_list = $1('.slider_list');
    var next = $1('.sk_next');
    var prev = $1('.sk_prev');
    var branditem = $1('.sli_group').clientWidth;
    var aa = new lunbo({
        scroller: seckill,
        imgPar: brandCon,
        btnPr:prev,
        btnNx:next,
        lbDir: true,
        autoFlag: true,
        clietSize: branditem,
        stopDom:slider_list
    });
 })();
 

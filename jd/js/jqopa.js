import {animate} from "./utils.js";
import "./jquery-1.8.3.js";
$.fn.extend({
    opa: function(obj) {
        var $imgs = $(obj.imgAll);
        var $btn_left = $(obj.prev) || false;
        var $btn_right = $(obj.next) || false;
        var $pageindex = $(obj.pages) || false;
        var fntype = obj.type || "click";
        var elet = obj.elemt || 'li';
        var imgclass = obj.imgclassName;
        var pageclass = obj.pageclassName || "";
        var index = 0;
        var timer = 0;
        var imgP = $imgs.parent().prop('className');
        init();
        function init() {
            open();
        }
        function open() {
            animate($imgs[index], { 'opacity': 1 }, function() {
                timer = setInterval(function() {
                    moveNext();
                }, 3000)
            })
        }
        $btn_left.click(function(e) {
            clearInterval(timer)
            clearInterval($imgs[index].timer);
            movePrev();
            timer = setInterval(function() {
                moveNext();
            }, 3000)
        });
        $btn_right.click(function(e) {
            clearInterval(timer)
            clearInterval($imgs[index].timer);
            moveNext();
            timer = setInterval(function() {
                moveNext();
            }, 3000)
        });

        function moveNext() {
            $imgs[index].className = '';
            if(obj.pages){
                $pageindex.children()[index].className = "";
            }
            $imgs[index].style.opacity = 0.02
                //下标递增及范围判断
            index++;
            if (index >= $imgs.length) {
                index = 0;
            }
            //设置变化后的样式
            $imgs[index].className = imgclass; //图片显示
            if(obj.pages){
                $pageindex.children()[index].className = pageclass; //对应数字下标显示
            }
            animate($imgs[index], { 'opacity': 1 }); //透明度变化
        }

        function movePrev() {
            $imgs[index].className = '';
            if(obj.pages){
                $pageindex.children()[index].className = '';
            }
            $imgs[index].style.opacity = "0.02";
            //下标判断
            index--;
            if (index < 0) {
                index = $imgs.length - 1;
            }
            //样式设置
            $imgs[index].className = imgclass;
            if(obj.pages){
                $pageindex.children()[index].className = pageclass;
            }
            animate($imgs[index], { 'opacity': 1 })
        }
        if(obj.pages){
            $pageindex.on(fntype, 'li', function(e) {
                clearInterval(timer);
                clearInterval($imgs[index].timer);
                $imgs[index].className = "";
                $pageindex.children()[index].className = '';
                $imgs[index].style.opacity = "0.02";
                index = $(this).index();
                $imgs[index].className = imgclass;
                $(this).addClass(pageclass);
                animate($imgs[index], { 'opacity': 1 });
                timer = setInterval(function() {
                    moveNext();
                }, 3000);
            })
        }
    
        $("." + imgP).on("mouseenter", function(e) {
            clearInterval(timer);
            clearInterval($imgs[index].timer);
        })
        $("." + imgP).on("mouseleave", function(e) {
            open();
        })

    }
});
export default $.fn.opa;
// $('.box').opa()
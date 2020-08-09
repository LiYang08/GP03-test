import {animate} from "./utils.js";
(function() {
    var imgCon = document.querySelector(".carmin-content");
    var imgs = document.querySelectorAll(".carmin-content div");
    var prev = document.querySelector(".bl2");
    var next = document.querySelector(".br2");
    // var nums = document.querySelectorAll(".car_page li");
    var timer;
    var showIndex = 0;
    animate(imgs[showIndex], { 'opacity': 1 }, function() {
      //  自动播放下一页
        timer = setInterval(function() {
            moveNext();
        }, 6000);
    });

    function moveNext() {
        // 重置上次显示的样式
        imgs[showIndex].className = '';
        // nums[showIndex].className = '';
        imgs[showIndex].style.opacity = 0.02;
        // 下标递增
        showIndex++;
        // 判断临界值
        if (showIndex >= imgs.length) {
            showIndex = 0;
        }
        // 当前显示的样式
        imgs[showIndex].className = 'imgShow';
        // nums[showIndex].className = 'sel';
        // 开始动画
        animate(imgs[showIndex], { 'opacity': 1 });
    }

    function movePrev() {
        // 重置上次显示的样式
        imgs[showIndex].className = '';
        // nums[showIndex].className = '';
        imgs[showIndex].style.opacity = 0.02;
        // 下标递减
        showIndex--;
        // 判断临界值
        if (showIndex < 0) {
            showIndex = imgs.length - 1;
        }
        // 当前显示的样式
        imgs[showIndex].className = 'imgShow';
        // nums[showIndex].className = 'sel';
        // 开始动画
        animate(imgs[showIndex], { 'opacity': 1 });
    }
    //点下一页
    next.onclick = function() {
            // 清除所有计时器
            clearInterval(timer);
            clearInterval(imgs[showIndex].timer);
            // 切换到下一页
            moveNext();
            // 开启自动播放到下一页
            timer = setInterval(function() {
                moveNext();
            }, 3000);
        }
        //点上一页
    prev.onclick = function() {
        // 清除所有计时器
        clearInterval(timer);
        clearInterval(imgs[showIndex].timer);
        // 切换到上一页
        movePrev();
        // 开启自动播放到下一页
        timer = setInterval(function() {
            moveNext();
        }, 3000);
    }

    // imgCon.onmouseenter = function(e) {
    //     clearInterval(timer);
    //     clearInterval( imgs[showIndex].timer);
    // }
    // imgCon.onmouseleave=function(e) {
    //     animate(imgs[showIndex], { 'opacity': 1 }, function() {
    //         // 自动播放下一页
    //         timer = setInterval(function() {
    //             moveNext();
    //         }, 3000);
    //     });
    // }
    // for (let i = 0, len = nums.length; i < len; i++) {
    //     nums[i].onclick = function() {
    //         // 清除所有计时器
    //         clearInterval(timer);
    //         clearInterval(imgs[showIndex].timer);
    //         // 重置上次显示的样式
    //         imgs[showIndex].className = '';
    //         nums[showIndex].className = '';
    //         imgs[showIndex].style.opacity = 0.02;
    //         showIndex = i;
    //         // 当前显示的样式
    //         imgs[showIndex].className = 'imgshow';
    //         nums[showIndex].className = 'sel';
    //         // 开始动画
    //         animate(imgs[showIndex], { 'opacity': 1 });
    //         // 开启自动播放到下一页
    //         timer = setInterval(function() {
    //             moveNext();
    //         }, 3000);
    //     }
    // }
})()
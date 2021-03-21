const waterfallItem = document.getElementsByClassName("waterfall-item");
let gap = 20;

//clientWidth 兼容性处理
function getClient(){
    return{
        width : window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        Height : window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    }
}
//scrollTop兼容性处理
function getScrollTop(){
    return window.pageYOffset || document.documentElement.scrollTop;
}

//瀑布流
function waterFall(){
    let pageWidth = getClient().width;
    let itemWidth = waterfallItem[0].offsetWidth;
    let columns = parseInt(pageWidth/(itemWidth + gap));
    let arr = [];
    for(let i = 0; i < waterfallItem.length; i++){
        if(i < columns){
            waterfallItem[i].style.top = 0;
            waterfallItem[i].style.left = (itemWidth + gap) * i + 'px';
            arr.push(waterfallItem[i].offsetHeight);
        }
        else{
            let minHeight = arr[0];
            let index = 0;
            for(let j = 0; j < arr.length; j++){
                if(minHeight > arr[j]){
                    minHeight = arr[j];
                    index = j;
                } 
            }
            waterfallItem[i].style.top = arr[index] + gap + 'px';
            waterfallItem[i].style.left = waterfallItem[index].offsetLeft + 'px';
            arr[index] = arr[index] + waterfallItem[i].offsetHeight + gap;
        }
    }
}

window.addEventListener("scroll", debounce(lazyLoad, 500), false);
waterFall();
let num = 0;
let limit = 10;

//懒加载
function lazyLoad(){
    if(limit < waterfallItem.length){
        limit += 5;
    }
    let viewHeight = getClient().Height;
    for (let i = num; i < limit; i++) {
        let distance = viewHeight - waterfallItem[i].getBoundingClientRect().top;
        if (distance >= 0) {  
            waterfallItem[i].className = "waterfall-item loaded"
            setTimeout(function(){
                waterFall();
            },10)
        }
        num = i + 1;
    }
}
function debounce(fn, delay = 500) {
    //防抖函数
    let timer = null;
    return function (...args) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        fn.call(this, args);
      }, delay);
    };
}
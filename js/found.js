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
        if (distance >= -100) {  
            waterfallItem[i].className = "waterfall-item loaded";   
            //让隐藏的图片显示出来，但这本身并不能实现懒加载的效果
            waterfallItem[i].getElementsByTagName("img")[1].src =  waterfallItem[i].getElementsByTagName("img")[1].getAttribute('data-src');
            //这才是懒加载的关键，只要src格式正确，服务器就会去请求对应资源，因此首先把后边的图片的src设置为占位图片的src
            //当它们要显示时，将src改为要加载的图片的src，即可实现懒加载

            // console.log(trend.style.height);
            setTimeout(function(){
                waterFall();
            },16.6)
        }
        num = i + 1;
    }
}
function debounce(fn, delay = 300) {
    //防抖函数
    let timer = null;
    return function (...args) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        fn.call(this, args);
      }, delay);
    };
}

//tab栏切换
const tabArr = document.getElementsByClassName("tab");
const tabBtnArr = document.getElementsByClassName("header")[0].getElementsByTagName("a");
const trend = document.getElementsByClassName("trend")[0];
setInterval(() => {
    trend.style.height = parseInt(waterfallItem[waterfallItem.length - 1].style.top)
        + 500 + "px";
}, 1000);

for(let i = 0; i < tabBtnArr.length; i++){
    tabBtnArr[i].onclick = function() {
        for(let j = 0; j < tabBtnArr.length; j++){
            tabBtnArr[j].className = "";
        }
        tabBtnArr[i].className = "chosen_btn";
    }
}
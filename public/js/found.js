const waterfallItem = document.getElementsByClassName("waterfall-item");
let gap = 20;

//clientWidth 兼容性处理
function getClient() {
  return {
    width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    Height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  }
}
//scrollTop兼容性处理
function getScrollTop() {
  return window.pageYOffset || document.documentElement.scrollTop;
}

//瀑布流
function waterFall() {
  let pageWidth = getClient().width;
  let itemWidth = waterfallItem[0].offsetWidth;
  let columns = parseInt(pageWidth / (itemWidth + gap));
  let arr = [];
  for (let i = 0; i < waterfallItem.length; i++) {
    if (i < columns) {
      waterfallItem[i].style.top = 0;
      waterfallItem[i].style.left = (itemWidth + gap) * i + 'px';
      arr.push(waterfallItem[i].offsetHeight);
    }
    else {
      let minHeight = arr[0];
      let index = 0;
      for (let j = 0; j < arr.length; j++) {
        if (minHeight > arr[j]) {
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
//当页面尺寸发生变化时，触发函数，实现响应式
window.onresize = function () {
  waterFall();
}
let num = 0;
let limit = 10;

//懒加载
function lazyLoad() {
  if (limit < waterfallItem.length) {
    limit += 5;
  }
  let viewHeight = getClient().Height;
  for (let i = num; i < limit; i++) {
    let distance = viewHeight - waterfallItem[i].getBoundingClientRect().top;
    if (distance >= -100) {
      waterfallItem[i].className = "waterfall-item loaded";
      //让隐藏的图片显示出来，但这本身并不能实现懒加载的效果
      waterfallItem[i].getElementsByTagName("img")[1].src = waterfallItem[i].getElementsByTagName("img")[1].getAttribute('data-src');
      //这才是懒加载的关键，只要src格式正确，服务器就会去请求对应资源，因此首先把后边的图片的src设置为占位图片的src
      //当它们要显示时，将src改为要加载的图片的src，即可实现懒加载

      // console.log(trend.style.height);
      setTimeout(function () {
        waterFall();
      }, 16.6)
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
      fn.apply(this, args);
    }, delay);
  };
}

//tab栏切换
const tabArr = document.getElementsByClassName("tab");
const tabBtnArr = document.getElementsByClassName("header")[0].getElementsByTagName("a");
const trend = document.getElementsByClassName("trend")[0];
const footer = document.getElementsByClassName("footer")[0];
setInterval(() => {
  trend.style.height = parseInt(waterfallItem[waterfallItem.length - 1].style.top) + "px";
}, 30);

for (let i = 0; i < tabBtnArr.length; i++) {
  tabBtnArr[i].onclick = function () {
    for (let j = 0; j < tabBtnArr.length; j++) {
      tabBtnArr[j].className = "";
    }
    tabArr[0].className = "tab trend hidden";
    tabArr[1].className = "tab topic hidden";
    tabArr[2].className = "tab tag hidden";
    tabArr[3].className = "tab topic hidden";
    tabArr[4].className = "tab tag hidden";
    tabArr[5].className = "tab topic hidden";
    tabBtnArr[i].className = "chosen_btn";

    switch (i) {
      case 0:
        tabArr[0].className = "tab trend";
        waterFall();
        break;
      case 1:
        tabArr[1].className = "tab topic";
        break;
      case 2:
        tabArr[2].className = "tab tag";
        break;
      case 3:
        tabArr[3].className = "tab topic";
        break;
      case 4:
        tabArr[4].className = "tab tag";
        break;
      case 5:
        tabArr[5].className = "tab topic";
    }
  }
}

// 返回顶部键
const toTop = document.getElementsByClassName("to-top")[0];
let scrollTop = parseInt(document.documentElement.scrollTop);
let timer_toTop = setInterval(() => {
  scrollTop = parseInt(document.documentElement.scrollTop);
  if (scrollTop > 1000) {
    toTop.style.visibility = "visible";
  }
  else {
    toTop.style.visibility = "hidden"
  }
}, 100);
toTop.onclick = function () {
  document.documentElement.scrollTop = 0;
}

//点击标签就填入表单
const tagInput = document.getElementsByClassName("topbar-input")[0].getElementsByTagName("input")[0];
const popUp = document.getElementsByClassName("pop-up")[0];
const tagArr = document.getElementsByClassName("_tag");

//只用CSS :focus 伪类有局限，点击到标签前弹出层就会关闭，所以用JS改进：
tagInput.onfocus = function () {
  popUp.style.visibility = "visible";
  popUp.style.top = "78px";
  document.addEventListener("click", function (event) {
    let cDom = popUp;
    let tDom = event.target;
    if (cDom === tDom || cDom.contains(tDom) || tDom === tagInput) {
      cDom.style.visibility = "visible";
    } else {
      cDom.style.visibility = "hidden";
      cDom.style.top = "67px";
    }
  });
}

for (let i = 0; i < tagArr.length; i++) {
  tagArr[i].onclick = function () {
    let temp = (tagArr[i].innerText).replace(/#/,'');
    tagInput.value = temp;
  }
}

//登录框
const lgPopBtn = document.getElementsByClassName("login-pop-btn")[0];
const lgPop = document.getElementsByClassName("login-pop")[0];

lgPopBtn.onclick = function () {
  lgPop.style.visibility = "visible";
  lgPop.style.opacity = "1";
  lgPop.style.top = "75px";
  document.addEventListener("click", function (event) {
    //点击区域外的空白，就关闭弹出框
    let cDom = lgPop;
    let tDom = event.target;
    if (cDom === tDom || cDom.contains(tDom) || tDom === lgPopBtn || tDom === document.querySelector(".login-pop-btn > i")) {
      cDom.style.visibility = "visible";
    } else {
      cDom.style.visibility = "hidden";
      cDom.style.opacity = "0";
      cDom.style.top = "65px";
    }
  });
};
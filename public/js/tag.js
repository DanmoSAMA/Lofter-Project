// 返回顶部键
const toTop = document.getElementsByClassName("to-top")[0];
let scrollTop = parseInt(document.documentElement.scrollTop);
let timer_toTop = setInterval(() => {
  scrollTop = parseInt(document.documentElement.scrollTop);
  if (scrollTop > 600) {
    toTop.style.visibility = "visible";
  }
  else {
    toTop.style.visibility = "hidden";
  }
}, 100);

toTop.onclick = function () {
  document.documentElement.scrollTop = 0;
}

// 点击喜欢心变红，再点击变灰
const HeartArr = document.getElementsByClassName("icon_heart");
let check_heart = 0;
for (let i = 0; i < HeartArr.length; i++) {
  HeartArr[i].onclick = function () {
    if (check_heart === 0) {
      this.style.color = "#E10E05";
      check_heart = 1;
    }
    else {
      this.style.color = "#888"
      check_heart = 0;
    }
  }
}

// 点击评论出现评论框，带过渡效果
const rmkBtnArr = document.getElementsByClassName("remark-btn");
const rmkArr = document.getElementsByClassName("remark");
const cmtCttArr = document.getElementsByClassName("comment-content");
const cmtBodyArr = document.getElementsByClassName("comment-body");
let check_rmk = 0;
for (let i = 0; i < rmkBtnArr.length; i++) {
  rmkBtnArr[i].onclick = function () {
    // 之前想错，把remark的position改为absolute，反而麻烦不少
    if (check_rmk === 0) {
      check_rmk = 1;
      rmkArr[i].className = "remark chosen";
    }
    else {
      check_rmk = 0;
      rmkArr[i].className = "remark not-chosen";
    }
  }
}

//点击图片放大，再点一次缩小
const imgArr = document.getElementsByClassName("comment-img");
let check_zoom = 0;
for (let i = 0; i < imgArr.length; i++) {
  imgArr[i].onclick = function () {
    if (check_zoom === 0) {
      this.style.width = "500px";
      check_zoom = 1;
    }
    else {
      this.style.width = "164px";
      check_zoom = 0;
    }
  }
}

//登录框
const lgPopBtn = document.getElementsByClassName("login-pop-btn")[0];
const lgPop = document.getElementsByClassName("login-pop")[0];

lgPopBtn.onclick = function () {
  lgPop.style.visibility = "visible";
  lgPop.style.opacity = "1";
  lgPop.style.top = "75px";
  document.addEventListener("click", function(event) {
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

//点击标签就填入表单
const tagInput = document.getElementsByClassName("topbar-input")[0].getElementsByTagName("input")[0];
const popUp = document.getElementsByClassName("pop-up")[0];
const tagArr = document.getElementsByClassName("tag");

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






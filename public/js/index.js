// 返回顶部键
const toTop = document.getElementsByClassName("to-top")[0];
let scrollTop = parseInt(document.documentElement.scrollTop);
let timer_toTop = setInterval(() => {
    scrollTop = parseInt(document.documentElement.scrollTop);
    if (scrollTop > 600) {
        toTop.style.visibility = "visible";
    }
    else {
        toTop.style.visibility = "hidden"
    }
}, 100);

toTop.onclick = function () {
    document.documentElement.scrollTop = 0;
}

// 侧边栏
const user = document.getElementsByClassName("user")[1];
const creatorCenter = document.getElementsByClassName("creator-center")[1];
let timer_sideBar = setInterval(() => {
    scrollTop = parseInt(document.documentElement.scrollTop);
    if (scrollTop > 1700) {
        user.style.display = "block";
        creatorCenter.style.display = "block";
    }
    else {
        user.style.display = "none";
        creatorCenter.style.display = "none";
    }
}, 100);

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
        if(check_zoom === 0){
            this.style.width = "500px";
            check_zoom = 1;
        }
        else{
            this.style.width = "164px";
            check_zoom = 0;
        }
    }
}

//发动态
const sendBtn = document.getElementsByClassName("send-btn")[0];
const send = document.getElementsByClassName("send")[0];
const cancelBtn = document.getElementsByClassName("cancel-btn")[0];
const myHead = document.getElementsByClassName("my-head")[0];
const mask = document.getElementsByClassName("mask")[0];
const pageMask = document.getElementsByClassName("page-mask")[0];

sendBtn.onclick = function() {
    send.style.height = "515px";
    myHead.style.width = "64px";
    myHead.style.height = "64px";
    mask.style.height = "113px";
    pageMask.className = "page-mask show";
}
cancelBtn.onclick = function() {
    send.style.height = "0";
    myHead.style.width = "110px";
    myHead.style.height = "110px";
    setTimeout(() => {
        mask.style.height = "110px";
        pageMask.className = "page-mask";
    }, 300);
}
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
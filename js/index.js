// 返回顶部键
const toTop = document.getElementsByClassName("to-top")[0];
let scrollTop = parseInt(document.documentElement.scrollTop);
let timer_toTop = setInterval(() => {
    scrollTop = parseInt(document.documentElement.scrollTop);
    if(scrollTop > 600){
        toTop.style.visibility = "visible";
    }
    else{
        toTop.style.visibility = "hidden"
    }
}, 100);

toTop.onclick = function(){
    document.documentElement.scrollTop = 0;
}

// 侧边栏
const user = document.getElementsByClassName("user")[1];
const creatorCenter = document.getElementsByClassName("creator-center")[1];
let timer_sideBar = setInterval(() => {
    scrollTop = parseInt(document.documentElement.scrollTop);
    if(scrollTop > 1700){
        user.style.display = "block";
        creatorCenter.style.display = "block";
    }
    else{
        user.style.display = "none";
        creatorCenter.style.display = "none";
    }
}, 100);
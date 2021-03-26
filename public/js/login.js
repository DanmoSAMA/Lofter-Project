//改变背景图片
const body = document.body;
const imgArr = ['public/img/login01.jpg', 'public/img/login03.jpg', 'public/img/login04.jpg','public/img/login05.jpg',
'public/img/login07.jpg','public/img/login08.jpg','public/img/login09.jpg','public/img/login12.png'];
body.style.backgroundImage = `url(${imgArr[Math.floor(Math.random() * imgArr.length)]})`;
console.log(body.style.backgroundImage);

//不选中checkbox无法提交表单
const submitBtn = document.getElementsByClassName("submit-btn")[0];
const checkBox = document.getElementsByClassName("checkbox")[0];
const notChecked = document.getElementsByClassName("not-checked")[0];
const id = document.getElementsByTagName("form")[0].getElementsByTagName("input")[0];
const password = document.getElementsByTagName("form")[0].getElementsByTagName("input")[1];

let timer;
submitBtn.onclick = function () {
  if (!checkBox.checked && id.value.length >= 3 && password.value.length >= 6) {
    clearTimeout(timer);
    notChecked.className = "not-checked touched";
    timer = setTimeout(function() {
      notChecked.className = "not-checked";
    },2000)
    return false;
  }
  return true;
};
const body = document.body;
const imgArr = ['../img/login01.jpg','../img/login02.jpg','../img/login03.jpg','../img/login04.jpg'];

// body.style.backgroundImage = 'url(' + JSON.parse(imgArr[Math.floor(Math.random()*imgArr.length)]) + ')';
// body.style.backgroundImage = 'url(' + imgArr[Math.floor(Math.random()*imgArr.length)] + ')';
// body.style.backgroundImage = ('url(' + imgArr[Math.floor(Math.random()*imgArr.length)] + ')').replace(reg1, '').replace(reg2, '');

// console.log(imgArr[Math.floor(Math.random()*imgArr.length)]);

body.style.backgroundImage = `url(${imgArr[Math.floor(Math.random()*imgArr.length)]})`;

// console.log(`"url('${imgArr[Math.floor(Math.random()*imgArr.length)]}')"`);

console.log(body.style.backgroundImage);
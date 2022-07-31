const nav = document.querySelector(".nav-links");
const burger = document.querySelector(".burger");
const links = nav.querySelectorAll("a");
const body = document.querySelector("body");

burger.addEventListener("click", () => {
  nav.classList.toggle("nav-open");
  burger.classList.toggle("toggle");
  body.classList.toggle("fixed");
});

links.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.toggle("nav-open");
    burger.classList.toggle("toggle");
    body.classList.toggle("fixed");
  });
});


const randomBetween = (a, b) => {
    const max = Math.max(a, b);
    const min = Math.min(a, b);
    return Math.floor(Math.random() * (max - min) + min);
 };
 const randomColor = (firstColor, secondColor) => {
    first = firstColor.toUpperCase().substring(1, secondColor.length);
    second = secondColor.toUpperCase().substring(1, firstColor.length);
    const scale = '0123456789ABCDEF';
    let color = '#';
    for(let i = 0; i < first.length && i < second.length; i++ ){
       const random = randomBetween(scale.indexOf(first[i]),
       scale.indexOf(second[i]));
       color += scale[random];
    };
    return color;
 };

var width = window.innerWidth,
height = window.innerHeight,
c = document.getElementById('c'),
ctx = c.getContext('2d');
c.width = width;
c.height = height;

var paint = [];

var totalPaints = width/50;
var size = 20;

function init(){
    for (var i = 0; i < totalPaints; i++){
        addPaint();
    }
    setInterval( update, 40 );
}

function drawPaint(x,y,size, colour) {
    ctx.beginPath();
    ctx.arc(x, y, size ,0 , Math.PI*2, true);
    ctx.closePath();
	ctx.fillStyle=colour;
	ctx.fill();
}

function update(){
    for (var i = 0; i < paint.length; i++){
        paint[i].y = paint[i].y + paint[i].v;
        if (paint[i].y > height + 60){
            paint.splice(i,1);
            addPaint();
        }
        drawPaint(paint[i].x, paint[i].y, paint[i].s, paint[i].c);
    }
}

function addPaint(){
    //Try 50 times
    var i = 50;
    while(i > 0){
        size = Math.random() * size + 10;
        x = Math.random() * width;

        found = false;

        //Dont Allow drips ontop of each other (Overtaking drops destroy the prettyness)
        for (var j = 0; j < paint.length; j++){
            if ((x + size > paint[j].x) && (x - size < paint[j].x + paint[j].s)){
                found = true;
                break;
            }

            if ((x - size < paint[j].x) && (x + size > paint[j].x - paint[j].s)){
                found = true;
                break;
            }
        }

        if (found === false){
            paint.push({s:size,
                       x:x,
                       y:-60,
                       v:(Math.random() * 2) + 2,
                       c: (randomColor('#CC0000', '#530000'))});
			i--;
            return;
        }
    }
}

init();
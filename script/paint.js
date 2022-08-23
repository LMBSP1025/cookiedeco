document.addEventListener("DOMContentLoaded", function() {
    if (window.sessionStorage) {
        // 해당 예제를 실행하기전 이전 세션의 데이터를 clear( ) 메서드를 사용해 전부 삭제한다.
        sessionStorage.clear();
    } else {
        alert("세션을 사용할 수 없는 브라우저입니다.");
    }
});

let mode = 0;
document.getElementById("eraser").onclick = function() {
    console.log("erase");
    mode = 1;
};
document.getElementById("pastrybag").onclick = function() {
    console.log("paint");
    mode = 0;
    ctx.strokeStyle = INITIAL_COLOR;
    ctx.fillStyle = INITIAL_COLOR;
    ctx.lineWidth = INITIAL_LINEWIDTH;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
};
document.getElementById("width").value = 30;
var clearbutton = document.getElementById("clear");
var yesbutton = document.getElementById("yes");
var nobutton = document.getElementById("no");
var title = document.getElementById("main");
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var INITIAL_COLOR = "#996e36";
var INITIAL_LINEWIDTH = 20.0;

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = INITIAL_LINEWIDTH;
ctx.lineCap = "round";
ctx.lineJoin = "round";
canvas.width = document.getElementById("cookie").offsetWidth;
canvas.height = document.getElementById("cookie").offsetWidth;
let painting = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onresize() {

    canvas.width = document.getElementById("cookie").offsetWidth;
    canvas.height = document.getElementById("cookie").offsetWidth;
}

function Mobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function onMouseMove(event) {
    var x, y;
    if (Mobile()) {
        console.log(event.changedTouches[0])
        x = event.changedTouches[0].clientX - canvas.width / 20;
        y = event.changedTouches[0].clientY - document.getElementById("start").getBoundingClientRect().y;
    } else {
        x = event.offsetX;
        y = event.offsetY;
    }
    console.log(x, y)
    ctx.strokeStyle = INITIAL_COLOR;
    ctx.fillStyle = INITIAL_COLOR;
    ctx.lineWidth = INITIAL_LINEWIDTH;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    if (mode === 0) {
        if (!painting) {
            ctx.beginPath();
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    } else if (mode === 1) {
        if (painting) {
            console.log(x - ctx.lineWidth, y - ctx.lineWidth, ctx.lineWidth, ctx.lineWidth);
            ctx.clearRect(x - ctx.lineWidth / 2, y - ctx.lineWidth / 2, ctx.lineWidth, ctx.lineWidth);
        }
    }
}

clearbutton.addEventListener("click", function() {
    document.getElementById("popup").style.display = "block";
});
nobutton.addEventListener("click", function() {
    document.getElementById("popup").style.display = "none";
});
yesbutton.addEventListener("click", function() {
    sessionStorage.setItem('cookiedata', document.getElementById('canvas').toDataURL());
    location.href = 'plate.html';
});

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("touchstart", startPainting);
    canvas.addEventListener("touchmove", onMouseMove);
    canvas.addEventListener("touchend", stopPainting);
    canvas.addEventListener("touchcancel", stopPainting);
}

jscolor.presets.default = {
    value: '#996E36',
    backgroundColor: '#333',
    palette: '#fff #000 #808080 #996e36 #f55525 #ffe438 #88dd20 #22e0cd #269aff #bb1cd4',
};
var cookie = document.getElementById("cookie");

var setCookie = function(name, value, exp) {
    var date = new Date();
    date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
    document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
};

var value = document.cookie.match('(^|;) ?' + "cookieid" + '=([^;]*)(;|$)');
value = value ? value[2] : null
cookie.src = "img/" + value + ".png";

const input = document.querySelector('#palette');
const widthinput = document.querySelector('#width');
input.addEventListener('input', updateValue);
widthinput.addEventListener('input', updateWidthValue);

function updateValue(e) {
    console.log(e.target.value);
    INITIAL_COLOR = e.target.value;
}

function updateWidthValue(e) {
    console.log(e.target.value);
    if (e.target.value == 0) {
        INITIAL_LINEWIDTH = 1;
        return;
    }
    INITIAL_LINEWIDTH = e.target.value;
}
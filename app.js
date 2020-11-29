const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');

// context의 default 설정 
canvas.width = 700; 
canvas.hegith = 700;
ctx.strokestyles = "#2c2c2c";
ctx.linewidth = 2;

let painting = false; 

// stopPainting
function stopPainting() {
    painting = false; 
}

// startPainting 
function startPainting() {
    painting = true; 
}

// function onMouseMove는 마우스가 움직일 때의 event를 console.log하는 fuction
function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY; 
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    } else {
        console.log(x,y)
        ctx.lineTo(x,y); 
        ctx.stroke();
    }
}

function onMouseDown(event) {
    painting = true;
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting); 
    canvas.addEventListener("mouseleave", stopPainting);
}

// offsetX, offsetY : 캔버스 내의 좌표
// clientX, clientY : 전체 브라우저 내의 좌표 
// 알고 싶은 것은 offsetX, offsetY이기 때문에 function onMouseMove에서 offsetX, offsetY 값만 가져올 것


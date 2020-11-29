const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave"); 

//-------------------context의 default 설정 ------------------
ctx.fillStyle = '#FFFFFF';
ctx.fillRect(0, 0, 700, 700);
ctx.strokeStyle = '#2C2C2C';
ctx.lineWidth = 2;

//------------------------1. Draw line------------------------
let painting = false; 

// stopPainting
function stopPainting() {
    painting = false; 
}

// startPainting 
function startPainting() {
    painting = true; 
}

/*
function onMouseMove는 마우스가 움직일 때의 event를 console.log하는 fuction
* offsetX, offsetY : 캔버스 내의 좌표
* clientX, clientY : 전체 브라우저 내의 좌표 
알고 싶은 것은 offsetX, offsetY이기 때문에 function onMouseMove에서 offsetX, offsetY 값만 가져올 것
*/
function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY; 
    if(!painting){
        console.log("🔘 mosemove이고 mouseup 또는 mouseleave / creating path in", x,y)
        ctx.beginPath(); // path를 생성하고 
        ctx.moveTo(x,y); // 계속 path의 좌표를 마우스 위치에 맞게 움직여주고 있는 것 
    } else {
        console.log("⚫ mousemove이고 mousedown / creating line in", x,y)
        ctx.lineTo(x,y); 
        ctx.stroke();
    }
}

function handleCanvasClick() {
    if(filling) {
        ctx.fillRect(0, 0, 650, 650); // (x, y, width, height) 
    }
}

function handleCM(event) {
    event.preventDefault();  // 마우스 우클릭 했을 때 contextmenu 안나옴 
    console.log("contextmenu 노출");
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting); 
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM); 
}


//------------------------Change Color------------------------

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color; 
    ctx.fillStyle = color; 
    console.log(color);
}

Array.from(colors).forEach(potatowhatever => 
    potatowhatever.addEventListener("click", handleColorClick)) 


//---------------------Change Stroke-size---------------------

function HandleRangeChange(event) {
    const size = Number(event.target.value) ; 
    console.log("type:", typeof size, "/ stroke size :", size);
    ctx.lineWidth = size ; 
}

if(range) {
    range.addEventListener("input", HandleRangeChange)
}

//-------------------Change Background-Color-------------------
let filling = false; //default : false

function handleModeClick() {
    if(filling=== true) {
        filling = false ; 
        mode.innerText = "Fill"
    } else {
        filling = true; 
        mode.innerText = "Paint"; // fill인 상태 
    }
}

if(mode) {
    mode.addEventListener("click", handleModeClick)
}


//-----------------------Save Image----------------------- *bug*
function HandleSaveClick(event) {
    let image = canvas.toDataURL("image/jpeg"); 
    let link = document.createElement('a');
    link.href = image; 
    link.downlaod = 'PaintJS'; 
    link.click();
}

if(saveBtn) {
    saveBtn.addEventListener("click", HandleSaveClick)
}

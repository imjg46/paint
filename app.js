/**
 * 모질라 canvas 도움말
 * https://developer.mozilla.org/ko/docs/Web/API/Canvas_API/Tutorial/Basic_usage
 * 
 */


const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); //ctx = context

canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth; //canvas.width = 600;
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight; //canvas.height = 600;

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2;

canvas.addEventListener("mousemove", onMouseMove); //마우스 움직일때
canvas.addEventListener("mousedown", startPainting); //마우스 클릭했을떄
canvas.addEventListener("mouseup", stopPainting); //마우스 클릭 멈췄을때 + 그리기 멈추기
//canvas.addEventListener("mouseleave", stopPainting); //나가면 끊기는거 불편해서 삭제 //마우스 캔버스 벗어났을때 + 그리기 멈추기
canvas.addEventListener("mouseenter", onMouseEnter); //마우스 캔버스로 들어왔을때

let isPainting = false; //painting을 isPainting으로 사용

function stopPainting(){
    isPainting = false;
}

function startPainting(){
    isPainting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!isPainting){
        ctx.beginPath();
        //ctx.moveTo(x, y); //하나만 있어도 잘됨 아마
    }else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function onMouseEnter(event){ //캔버스로 들어왔을 때 시작점 위치 변경
    x = event.offsetX;
    y = event.offsetY;
}
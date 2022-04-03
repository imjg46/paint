/**
 * 모질라 canvas 도움말
 * https://developer.mozilla.org/ko/docs/Web/API/Canvas_API/Tutorial/Basic_usage
 * 
 * Canvas는 위에서 아래로 코드 실행
 * 
 */


const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); //ctx = context
const colors = document.getElementsByClassName("jsColor");
const size = document.getElementById("jsSize"); //jsRange, range를 jsSize, size로 사용
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

const _initial_color = "#1c1c1c"; //기본을 검은색
const _canvas_width = document.getElementsByClassName("canvas")[0].offsetWidth; //값(600) 받아오기
const _canvas_height = document.getElementsByClassName("canvas")[0].offsetHeight; //값(600) 받아오기

canvas.width = _canvas_width; 
canvas.height = _canvas_height; 

//////////// 없으면 투명 배경이 됨! canvas에 지정 안해줘서 (html에서만 해줌)
ctx.fillStyle = "white";
ctx.fillRect(0, 0, _canvas_width, _canvas_height);
////////////
ctx.strokeStyle = _initial_color; 
ctx.fillStyle = _initial_color;
ctx.lineWidth = 1.5;
ctx.lineJoin = "round"; //선 부드럽게 이어지기 https://joylee-developer.tistory.com/138?category=944632
ctx.lineCap = "round"; 


let isPainting = false; //painting을 isPainting으로 사용
let isFilling = false;

function stopPainting(){
    isPainting = false;
}

function startPainting(){
    isPainting = true;
}

function onMouseMove(event){ //마우스 움직이는동안 항상 발생
    const x = event.offsetX;
    const y = event.offsetY;
    if(!isPainting){
        ctx.beginPath();
        ctx.moveTo(x, y); //하나만 있어도 잘됨 아마
    }else {
        ctx.lineTo(x, y);
        ctx.stroke(); //그리기
    }
}

function onMoveTouch(event){
    event.preventDefault(); //canvas.getBoundingClientRect = canvas의 위치 값 얻기
    const x = event.changedTouches[0].pageX - canvas.getBoundingClientRect().left;
    const y = event.changedTouches[0].pageY - canvas.getBoundingClientRect().top;
    if(!isPainting){ //위에랑 같은거
        ctx.beginPath();
        ctx.moveTo(x, y); 
    }else {
        ctx.lineTo(x, y);
        ctx.stroke(); 
    }
}

function onMouseEnter(event){ //캔버스로 들어왔을 때 시작점 위치 변경
    x = event.offsetX;
    y = event.offsetY;
    ctx.moveTo(x, y); //나갔다 들어왔을때 선 이어지기 방지 by #2.2 Recap - tomyravn
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor; //color의 rgb값
    ctx.strokeStyle = color; //선 색깔 지정
    ctx.fillStyle = color; //배경 색깔 지정
}

function handleSize(event){
    const sizeValue = event.target.value;
    ctx.lineWidth = sizeValue;
}

function handleModeClick(){
    if(isFilling === true){
        // 배경 채우기 모드일때 -> 그리기 모드로 변경
        isFilling = !isFilling; 
        mode.innerText = "Paint";
    }else{
        //그리기 모드일때 -> 배경 채우기 모드로 변경
        isFilling = !isFilling;
        mode.innerText = "Background";
    }
}

function handleCanvasClick(){
    if(isFilling){
        ctx.fillRect(0, 0, _canvas_width, _canvas_height);
    }
}

function handleContextMenu(event){
    event.preventDefault(); //우클릭 cm방지
}

function getDateAndTime() {   //날짜 구하기(저장할때 이름에 추가하려고)
    let now = new Date();
    let nowYear = now.getFullYear();
    let nowMonth = now.getMonth() + 1;
    let nowDate = now.getDate();
    let nowHours = now.getHours();
    let nowMinutes = now.getMinutes();
    let dummy = "0"

    return nowYear+"."+nowMonth+"."+nowDate+"_"+nowHours+"."+nowMinutes+"."+dummy;
}

function handleSaveClick(){
    let DateAndTime = getDateAndTime();
    const image = canvas.toDataURL("image/png");
    const imglink = document.createElement("a");
    imglink.href = image; //href가 image(url)이고,
    imglink.download = "Project.Paint_"+DateAndTime; //download가 이름이 되어야함!
    imglink.click();
}


if(canvas){
    //////////////////////////////// 마우스 //////////////////////////////
    canvas.addEventListener("mousemove", onMouseMove); //마우스 움직일때
    canvas.addEventListener("mousedown", startPainting); //마우스 클릭했을떄
    canvas.addEventListener("mouseup", stopPainting); //마우스 클릭 멈췄을때 + 그리기 멈추기
    //canvas.addEventListener("mouseleave", stopPainting); //나가면 끊기는거 불편해서 삭제 //마우스 캔버스 벗어났을때 + 그리기 멈추기
    canvas.addEventListener("mouseenter", onMouseEnter); //마우스 캔버스로 들어왔을때
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleContextMenu); //우클릭시 나오는 메뉴가 context메뉴임
    //////////////////////////////////////////////////////////////////////

    //////////////////////////////// 터치 ///////////////////////////////
    canvas.addEventListener('touchstart', startPainting); //터치 시작시 그리기
    canvas.addEventListener('touchmove', onMoveTouch); //터치중일때 그리기
    canvas.addEventListener('touchend', stopPainting); //터치 멈출때 그리기 멈추기
    /////////////////////////////////////////////////////////////////////
    
}else{ console.log("canvas undefined!"); }

//Array.from(colors)~~ 이거는 if넣어주면 안됨
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick)); //색들 리스너 추가 #2.3 Changing Color

if(size){
    size.addEventListener("input", handleSize);
}else{ console.log("size(range) undefined!"); }

if(mode){
    mode.addEventListener("click", handleModeClick);
}else { console.log("mode undefined!"); }

if(save){
    save.addEventListener("click", handleSaveClick);
}else { console.log("save undefined!"); }
function elementselector(name){
    return document.querySelector(name);
}

const downward_btn = elementselector('#downward_btn');
const toolbox = elementselector('.toolbox');
let count = 1;
const size = elementselector('#size');
const pencil = elementselector('#pencil');
const eraser = elementselector('#eraser');
const canvas = elementselector('#canvas');
const context = canvas.getContext('2d');
const canvasStyle = getComputedStyle(canvas);
let colorval = null;
let sizeval = null;

downward_btn.onclick = function(){
    if(count%2!=0){
        toolbox.style.display="flex";
    }
    else{
        toolbox.style.display="none";
    }
    count += 1;
}
elementselector('#color_input').oninput = function(){
    colorval = this.value;
}
elementselector('#size').oninput = function(){
    sizeval = this.value;
}
pencil.onclick = function(){
    isDrawing = false;
    startingX = 0;
    startingY = 0;
    canvas.addEventListener("mousedown",e=>{
        var bounds = canvas.getBoundingClientRect();
        startingX = e.pageX - bounds.left - scrollX;
        startingY = e.pageY - bounds.top - scrollY;
        isDrawing = true;
    });
    canvas.addEventListener("mousemove",e=>{
        if(isDrawing === true){
            var bounds = canvas.getBoundingClientRect();
            draw(e.pageX - bounds.left - scrollX, e.pageY - bounds.top - scrollY);
            startingX = e.pageX - bounds.left - scrollX;
            startingY = e.pageY - bounds.top - scrollY;
            console.log('bounds val : ',bounds.left,bounds.top);
            console.log('offsetval : ',e.offsetX,e.offsetY);
            console.log('page val: ',e.pageX,e.pageY);
            console.log('scroll val: ',scrollX,scrollY);
        }
    });
    canvas.addEventListener('mouseup',e=>{
        isDrawing = false;
    });
    function draw(x1,y1){
        context.beginPath();
        context.strokeStyle = colorval;
        context.lineWidth = sizeval/10;
        context.moveTo(startingX,startingY);//we are giving this starting coordinates
        context.lineTo(x1,y1);//we are giving this the the coordinate till where the line should go
        context.stroke();
        context.closePath();
    }
}
eraser.onclick = function(){
    var height = parseInt(canvasStyle.height);
    var width = parseInt(canvasStyle.width);
    context.clearRect(0,0,height,width);
}
elementselector('#save').onclick = function(){
    window.print();
}
elementselector('#clear').onclick = function(){
    var height = parseInt(canvasStyle.height);
    var width = parseInt(canvasStyle.width);
    context.clearRect(0,0,height,width);
}
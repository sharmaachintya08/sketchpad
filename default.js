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
    function pencil_draw(){
        console.log('pencil selected');
        var isDrawing = false;
        var x = 0;
        var y = 0;
        canvas.addEventListener('mousedown',e=>{
            console.log('mousedown activated');
            x = e.offsetX;
            y = e.offsetY;
            isDrawing = true;
        });
        canvas.addEventListener('mousemove',e=>{
            if(isDrawing == true){
                console.log('mousemove activated');
                drawline(context,x,y,e.offsetX,e.offsetY);
                x = e.offsetX;
                y = e.offsetY;
            }
        });
        canvas.addEventListener('mouseup',e=>{
            if(isDrawing == true){
                console.log('mouseup activated');
                drawline(context,x,y,e.offsetX,e.offsetY);
                x=0;
                y=0;
                isDrawing = false;
            }
        })
        function drawline(context,x,y,x1,y1){
            context.beginPath();
            context.strokeStyle = colorval;
            context.lineWidth = sizeval/10;
            context.moveTo(x, y);
            context.lineTo(x1, y1);
            context.stroke();
            context.closePath();
        }
    }
    pencil_draw();
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
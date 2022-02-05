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
const rectangle = elementselector('#rectangle');

downward_btn.onclick = function(){
    if(count%2!=0){
        toolbox.style.display="flex";
    }
    else{
        toolbox.style.display="none";
    }
    count += 1;
}

pencil.onclick = function(){
    console.log('pencil clicked');
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
            context.strokeStyle = "black";
            context.lineWidth = "2";
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
rectangle.onclick = function(){//there is some coordinate problem here
    //take offsetx coordinates
    var startingX = 0;
    var startingY = 0;
    var endingX = 0;
    var endingY = 0;

    canvas.addEventListener('mousedown',e=>{
        startingX = e.offsetX;
        startingY = e.offsetY;
        console.log(startingX,startingY);
    });
    canvas.addEventListener('mouseup',e=>{
        endingX = e.offsetX;
        endingY = e.offsetY;
        contdraw(startingX,startingY,endingX,endingY);
    });
    //once i move the mouse the loop doesnt end
    function contdraw(x,y,x1,y1){
        context.strokeRect(startingX,startingY,endingX,endingY);
    }
}
//there is no use of such shapes where we cant see where the lines are going so i have deducted 2 shapes from my program
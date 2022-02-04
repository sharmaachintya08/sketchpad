function elementselector(name){
    return document.querySelector(name);
}

let downward_btn = elementselector('#downward_btn');
let toolbox = elementselector('.toolbox');
let count = 1;
downward_btn.onclick = function(){
    if(count%2!=0){
        toolbox.style.display="flex";
    }
    else{
        toolbox.style.display="none";
    }
    count += 1;
}
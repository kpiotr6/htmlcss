function mouseClick(e){
    // console.log(e.clientY);
    e.stopPropagation();
    ball.style.top = (e.layerY-ball.offsetHeight/2)+"px";
    ball.style.left = (e.layerX-ball.offsetWidth/2)+"px";
    out.style.display = "none";
}
function showBeyond(e){
    out.style.display = "block";
    
    if(e.target == out){
        out.style.top = parseInt(out.style.top) + (e.layerY-out.offsetHeight/2)+"px";
        out.style.left = parseInt(out.style.left) + (e.layerX-out.offsetWidth/2)+"px";
    }
    else{
        out.style.top = (e.layerY-out.offsetHeight/2)+"px";
        out.style.left = (e.layerX-out.offsetWidth/2)+"px";
    }

}
const ball = document.querySelector("img");
const field = document.querySelector(".cover");
const body = document.querySelector("html");
const out = document.querySelector(".out");
field.addEventListener("click",mouseClick);
body.addEventListener("click",showBeyond);
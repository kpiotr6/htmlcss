function elementClick(e){
    if(!propagaton){
        e.stopPropagation();
    }
    console.log(e.currentTarget);
    switch(e.currentTarget.getAttribute("class")){
        case "top": counter+=5; break;
        case "middle": counter+=2; break;
        case "bottom": counter+=1; break;
    }
    ctrp.textContent = counter;
    checkCounter()
}
function ststPropagation(){
    if(propagaton){
        stst.textContent = "Start Propagation";
    }
    else{
        stst.textContent = "Stop Propagation";
    }
    propagaton = !propagaton;
}
function resetClick(){
    tops.removeEventListener('click',elementClick);
    bot.removeEventListener('click',elementClick);
    mid.removeEventListener('click',elementClick);
    tops.removeEventListener('click',elementClick,true);
    bot.removeEventListener('click',elementClick,true);
    mid.removeEventListener('click',elementClick,true);
    bot.addEventListener('click',elementClick);
    mid.addEventListener('click',elementClick);
    tops.addEventListener('click',elementClick);
    mid.style.backgroundColor = "red";
    tops.style.backgroundColor = "yellow";
    counter = 0;
    back = false;
    ctrp.textContent = counter;
}

function checkCounter(){
    if(counter>=30){
        mid.removeEventListener('click',elementClick);
        mid.removeEventListener('click',elementClick,true);
        mid.style.backgroundColor = "white";
    }
    if(counter>=50){
        tops.removeEventListener('click',elementClick);
        tops.removeEventListener('click',elementClick,true);
        tops.style.backgroundColor = "white";
    }
}

function changeClick(){
    bot.removeEventListener('click',elementClick);
    mid.removeEventListener('click',elementClick);
    bot.removeEventListener('click',elementClick,true);
    mid.removeEventListener('click',elementClick,true);
    if(!back){
        mid.addEventListener('click',elementClick,true);
        bot.addEventListener('click',elementClick,true);
        back = true;
    }
    else{
        mid.addEventListener('click',elementClick);
        bot.addEventListener('click',elementClick);
        back = false;
    }
    checkCounter();
}
var counter = 0;
var propagaton = true;
var back = false;
const ctrp = document.querySelector(".counter");
const tops = document.querySelector(".top");
const mid = document.querySelector(".middle");
const bot = document.querySelector(".bottom");
const reset = document.querySelector(".reset");
const stst = document.querySelector(".stst");
const change = document.querySelector(".change");
tops.addEventListener('click',elementClick);
mid.addEventListener('click',elementClick);
bot.addEventListener('click',elementClick);
reset.addEventListener('click',resetClick);
stst.addEventListener('click',ststPropagation);
change.addEventListener('click',changeClick);
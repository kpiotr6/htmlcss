function onStart(){
    if(!started){
        started = true;
        comm.textContent ="Licznik wynosi: ";
        iterator.textContent="0"
        nr = 0;
        add.addEventListener("click",onAdd);
    }
}
function onAdd(){
    nr++;
    iterator.textContent=nr;
}
function onStop(){
    if(started){
        started = false;
        nr = 0;
        comm.textContent ="Licznik zablokowany";
        iterator.textContent=""
        add.removeEventListener("click",onAdd);
    }
}
const comm = document.querySelector(".text");
const iterator = document.querySelector(".i");
var nr = 0;
var started = false;
const start = document.querySelector(".start");
const stop = document.querySelector(".stop");
const add = document.querySelector(".add");//!!!
start.addEventListener("click",onStart);
stop.addEventListener("click",onStop);


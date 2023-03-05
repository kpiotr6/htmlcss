class Zombie{
    constructor(height,size,speed,game){
        this.game = game;
        this.priceForHead = 12;
        this.presentation = document.createElement("div");
        this.time = 10/speed*1000;
        this.animation = 
        [
            {
                left: "120%",
            },
            {
                left: "-300px",
            }
        ]
        this.presentation.parentObject = this;
        document.body.appendChild(this.presentation);
        this.presentation.classList.add("zombie");
        this.presentation.style.setProperty("height",size+"px");
        this.presentation.style.setProperty("bottom",height+"px");
        this.presentation.style.setProperty("left","120%");
        this.presentation.addEventListener("click",killedZombie);
    }
    static delete(z){
        if(document.body.contains(z.presentation)){
            document.body.removeChild(z.presentation);
            game.chances--;
            game.endGame();
        }

    }
    move(){
        this.presentation.animate(this.animation,this.time);
    }
    
}


class Game{
    
    constructor(){
        this.costOfMissing = -6;
        this.points = 0;
        this.chances = 3;
        
        this.map = document.body;
        this.map.addEventListener("click",missed);
    }
    createZombie(){

        let zombie = new Zombie(randomInt(10,300),randomInt(250,400),randomInt(1,5),this);
        zombie.move();
        setTimeout(Zombie.delete,zombie.time,zombie);
    }
    async endGame(){
        if(this.chances==0){
            clearInterval(this.interval);
            while(this.map.firstChild){
                this.map.removeChild(this.map.firstChild);
            }
            await data.getData();
            data.addNewPlayer();
            data.createTable();
            this.map.appendChild(data.table);
            data.update();
            let button = document.createElement("button");
            
            button.classList.add("new-game");
            button.innerText ="Zagraj ponownie";
            button.addEventListener("click",runAgain);
            document.body.appendChild(button);
            
        }
    }
    addPoints(points){
        this.points += points;
        if(this.points<0){
            let strPoints = this.points.toString();
            strPoints = strPoints.slice(1);
            this.pointLabel.textContent = "-"+("00000"+strPoints).slice(-5);
        }
        else{
            this.pointLabel.textContent = ("00000"+this.points).slice(-5);
        }
        
    }
    run(){
        document.body.innerHTML= `<div class="pointer">
        <div class="inside"></div>
        <div class="outside"></div>
    </div>
    <p class="name">${data.name}</p>
    <p class="points">00000</p>`
        this.pointLabel =document.querySelector(".points"); 
        cursor = document.querySelector(".pointer");
        this.interval = setInterval(this.createZombie,randomInt(300,600),this);
    }
}
class Data{
    getName(){
        if(!this.hasOwnProperty("name")){
            this.name = prompt("Podaj swój nick.Maks 20 liter");
            while(this.name == null || this.name == ""|| this.name.length>20){
                this.name = prompt("Podaj swój nick.Maks 20 liter");
            }
        }
        
    }
    async getData(){
        this.data = await fetch("https://jsonblob.com/api/jsonBlob/1043923265961345024");
        this.json = await this.data.json();
        this.array = this.json;

    }
    addNewPlayer(){
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); 
        let yyyy = today.getFullYear();
        today = dd + '/' + mm + '/' + yyyy;
        let player = {
            position:-1,
            nick:this.name,
            points:game.points,
            date:today,
        }

        this.array.push(player);
        this.array.sort(function(a,b){
            return b.points-a.points;
        });
        this.array = this.array.slice(0,7);
        for(let i = 0; i<this.array.length;i++){
            this.array[i].position = i+1;
        }
    }
    async createTable(){
        let tableHeaders = ["Pozycja","Nick","Ilość Punktów","Data Wpisu"]
        this.table = document.createElement("table");
        this.table.classList.add("data-table");
        let headRow = this.table.insertRow();
        for(let head of tableHeaders){
            let t = document.createElement("th");
            t.innerText = head;
            headRow.appendChild(t);
        }
        for(let player of this.array){
            let row = this.table.insertRow();
            for(let [named,val] of Object.entries(player)){
                let td = row.insertCell();
                td.innerText = val;
            }
        }

    }

    async update(){
        const response = await fetch("https://jsonblob.com/api/jsonBlob/1043923265961345024", {
            method: 'PUT', 
            mode: 'cors', 
            cache: 'no-cache', 
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.array)
          });
          return response.json();
    }
}

function killedZombie(e){
    e.stopPropagation();
    let div = e.currentTarget;
    document.body.removeChild(div);
    game.addPoints(div.parentObject.priceForHead);
}
function missed(){
    game.addPoints(game.costOfMissing);
}

function randomInt(min,max){
    return Math.floor(Math.random()*(max-min+1))+min;
}
function moveCursor(e){
    let mouseY = e.clientY;
    let mouseX = e.clientX;
    cursor.style.left = e.clientX-cursor.offsetWidth/2+"px";
    cursor.style.top = e.clientY-cursor.offsetHeight/2+"px";

}
function runAgain(e){
    e.stopPropagation();
    start();
}
function start(){
    
    while(document.body.firstChild){
        document.body.removeChild(document.body.firstChild);
    }
    data = new Data();
    game = new Game();
    data.getName();
    game.run();
}
var data = new Data();
var game = new Game();
var cursor = null;
document.body.addEventListener("click",moveCursor);
document.body.addEventListener("mousemove",moveCursor);
start();
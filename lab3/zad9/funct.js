const data=[
    {
        img: "m1.jpg",
        names: "Jan Kowalski",
        job: "Product Manager"
    },
    {
        img: "m2.jpg",
        names: "Stanisław Tym",
        job: "Fullstack Developer"
    },
    {
        img: "m3.jpg",
        names: "Jakub Marczyk",
        job: "Java Developer"
    }
]


function right(){
    if(currentTrans == -(data.length-1)*100){
        currentTrans = 0;    
    }
    else{
        currentTrans -= 100;
    }
    
    slider.style.transform = `translateX(${currentTrans}%)`;
}
function left(){
    if(currentTrans==0){
        currentTrans = -(data.length-1)*100;
    }
    else{
        currentTrans += 100;
    }
    
    slider.style.transform = `translateX(${currentTrans}%)`;
}
function setRandom(){
    let nr = Math.floor(Math.random()*data.length);
    while(currentTrans==-nr*100){
        nr = Math.floor(Math.random()*data.length);
    }
    currentTrans = -nr*100;
    console.log(currentTrans);
    slider.style.transform = `translateX(${currentTrans}%)`;

}
var currentTrans = 0;
const arrowLeft = document.querySelector('[src="left.jpg"]');
const arrowRight = document.querySelector('[src="right.jpg"]');
const slider = document.querySelector(".slider");
const random = document.querySelector(".random");
arrowRight.addEventListener("click",right);
arrowLeft.addEventListener("click",left);
random.addEventListener("click",setRandom);
for (const i of data) {
    let stringTemplate =
    `<div class="slider-element">
    <figure>
        <img src="${i.img}" alt="">
        <figcaption>
            <p class="name">${i.names}</p>
            <p class="job">${i.job}</p>
        </figcaption>
    </figure>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam, nobis praesentium quam, quibusdam molestias perferendis suscipit error rem est, minima laudantium perspiciatis! Ratione vero consequuntur neque culpa, sint eum rerum quaerat dolorum molestias voluptates, architecto a. Magnam optio voluptates quae quidem ex distinctio aut fugiat et, itaque quisquam expedita, deleniti voluptate ratione quas! Dolorum, architecto a expedita illo nostrum voluptas ipsa reprehenderit, dolores id, quisquam rem! Dolor magnam obcaecati, perspiciatis rerum magni sed culpa nisi cum cupiditate nesciunt commodi maxime facere iure eum animi ipsam omnis quasi rem asperiores aperiam tempore! Dicta, quo facere repellat numquam voluptates nihil iure deleniti?</p>
    <p class="apo">՚՚</p>
    </div>`;
    let template = document.createElement("template");
    template.innerHTML = stringTemplate;
    slider.append(template.content.firstChild);
}


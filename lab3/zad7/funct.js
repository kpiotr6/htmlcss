


async function start(){
    const response = await fetch("http://localhost:3000/cities");
    const data = await response.json();
    document.querySelector('.a').innerHTML = "a)<br>"+await a(data);
    document.querySelector('.b').innerHTML = "b)<br>"+await b(data);
    document.querySelector('.c').innerHTML = "c)<br>"+await c(data);
    document.querySelector('.d').innerHTML = "d)<br>"+await d(data);
    document.querySelector('.e').innerHTML = "e)<br>"+await e(data);
    document.querySelector('.f').innerHTML = "f)<br>"+await f(data);
    document.querySelector('.g').innerHTML = "g)<br>"+await g(data);
}

async function a(values){
    let selected = [];
    for(let city of values){
        if(city.province == "małopolskie"){
            selected.push(city.name);
        }
    }
    return selected;
}

async function b(values){
    let selected = [];
    let compare = /^[^a]*a[^a]*a[^a]*$/gm;
    for(let city of values){
        if(compare.test(city.name)){
            selected.push(city.name);
        }
    }
    return selected;
}

async function c(values){
    let sortedValues = values.map((x)=>x); 
    sortedValues.sort((f,s)=>{
        if(f.dentensity<s.dentensity){
            return 1;
        }
        return -1;
    })

    return sortedValues[4].name;
}

async function d(values){
    let editedValues = []; 
    for(let city of values){
        if(city.people>100000){
            editedValues.push(city.name + " city");
        }

    }
    return editedValues;
}

async function e(values){
    let more8 = 0;
    for(let city of values){
        if(city.people>80000){
            more8++;
        }
    }
    if(more8 > values.length - more8){
        return "Więcej jest miast powyżej 80000. Dokładnie: "+more8;
    }
    return "Więcej jest miast poniżej 80000. Dokładnie: "+(values.length - more8);
}

async function f(values){
    let sum = 0;
    let ctr = 0;
    for(let city of values){
        if(city.township[0]=="p"){
            sum += city.area;
            ctr++;
        }
    }
    return Number.parseFloat(sum/ctr).toFixed(2);

}

async function g(values){
    let all = true;
    let ctr = 0;
    for(let city of values){
        if(city.province=="pomorskie"){
            ctr+=1;
        }
        else{
            all = false;
        }
    }
    if(all){
        return "Wszystkie są. Jest ich: "+ ctr;
    }
    return "Nie wszystkie są. Jest ich "+ctr;
}
start();


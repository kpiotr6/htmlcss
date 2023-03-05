

function onAdd(){
    const listpos = document.createElement("li");
    const text = document.createTextNode("element "+(list.length+1));
    listpos.append(text);
    // window.alert(typeof listpos);
    list.push(listpos);
    ul.append(listpos);
}
function onDelete(){
    if(list.length>0){
        list[0].remove()
        list.shift();
    }

}
var list = Array.from(document.querySelectorAll("li"));
var ul = document.querySelector("ul");
const addButton = document.querySelector(".add");
const delButton = document.querySelector(".delete");
addButton.addEventListener('click',onAdd);
delButton.addEventListener('click',onDelete);
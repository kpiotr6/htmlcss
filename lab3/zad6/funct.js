function checkText(e){
    let matchName = /\p{Lu}\p{Ll}+\s*\p{Lu}\p{Ll}+(-\p{Lu}\p{Ll}+|\s*$)/gu;
    let matchEmail = /(^( *-? *[0-9]){9}$|^\+?( *-? *[0-9]){12}$)/;
    if(e.target.getAttribute("name")=="name-surname"){
        validator.names.validated = matchName.test(validator.names.value);
    }
    else{
        validator.phone.validated = matchEmail.test(validator.phone.value);
    }
    validator.setView(e);
    
}
function addClick(e){
    e.preventDefault();
    if(validator.validate()){
        let newBlock = 
        `<div>
            <p class="name"><b>`+ validator.names.value+`</b></p>
            <p class="number">`+validator.phone.value+`</p>
        </div>
        <button class="delete">
            <img src="trash.png" alt="">
        </button>`;
        const div = document.createElement("div");
        div.setAttribute("class","entry");
        div.innerHTML = newBlock;
        collectionDiv.append(div);
        const newButton = div.querySelector(".delete");
        newButton.addEventListener('click',deleteEntry);
        validator.resetForm();
    }
}
function deleteEntry(e){
    let entry = e.currentTarget.parentElement;
    collectionDiv.removeChild(entry);
}
const validator = {
    form: document.forms["form1"],
    names: document.forms["form1"]["name-surname"],
    phone: document.forms["form1"]["phone"],
    submit: document.forms["form1"]["submit"],
    resetForm(){
        // console.log(this.submit);
        this.form.reset();
        this.names.validated = false;
        this.phone.validated = false;
    },
    setView(e){
        if(e.target.validated){
            e.target.style.removeProperty("border-color");
        }
        else{
            e.target.style.setProperty("border-color","red");
        }
    },
    validate(){
        return this.names.validated && this.phone.validated;
    }
    
}
const collectionDiv = document.querySelector(".collection");
validator.names.addEventListener('change',checkText);
validator.phone.addEventListener('change',checkText);
validator.submit.addEventListener('click',addClick);
validator.resetForm();

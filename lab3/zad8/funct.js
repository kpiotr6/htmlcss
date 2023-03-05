

function Validator() {
    this.password = document.querySelector(".input-password #new");
    this.repeat = document.querySelector(".input-password #repeat");
    this.reqiurements = Array.from(document.querySelectorAll(".r img"));
    this.topeye = document.querySelector(".input-password:nth-child(1) img");
    this.boteye = document.querySelector(".input-password:nth-child(2) img");
    this.set = false;

    for(let i of this.reqiurements){
        i.filled = false;
    }
    this.topeye.show = false;
    this.boteye.show = false;
    this.onInput = function(e){
        validator.check();
        validator.validate(e);
    }
    this.show = function(e){
        let eye = e.currentTarget;
        let input = eye.parentNode.children[1];
        if(eye.show){
            input.setAttribute("type","text");
            eye.setAttribute("src","eye.png");
        }
        else{
            input.setAttribute("type","password");
            eye.setAttribute("src","eyes.png");
        }
        eye.show = !eye.show;
    }
    this.check = function(){
        let passValue = this.password.value;
        if(passValue.length>=8){
            this.reqiurements[0].filled = true;
        }
        else{
            this.reqiurements[0].filled = false;
        }
        let special =  /[ \!\"\#\$\%\&\'\(\)\*\+\,\-\.\/\:\;\<\=\>\?\@\[\\\]\^\_\`\{\|\}]/;
        if(special.test(passValue)){
            this.reqiurements[1].filled = true;
        }
        else{
            this.reqiurements[1].filled = false;
        }
        let upper = /\p{Lu}/u;
        if(upper.test(passValue)){
            this.reqiurements[2].filled = true;
        }
        else{
            this.reqiurements[2].filled = false;
        }
        let number = /[0-9]/u;
        if(number.test(passValue)){
            this.reqiurements[3].filled = true;
        }
        else{
            this.reqiurements[3].filled = false;
        }

    }
    this.validate = function(e){
        // console.log(this.reqiurements);

        for (let i of this.reqiurements) {
            if(i.filled){
                i.setAttribute("src","check.png");
            }
            else{
                i.setAttribute("src","x.png");
            }
        }
        
        if(this.password.value == this.repeat.value || this.repeat.value.length==0){
            this.repeat.style.removeProperty("border-color");
            if(this.set){
                document.styleSheets[0].deleteRule(0);
                this.set = false;
            }
        }
        else{
            this.repeat.style.setProperty("border-color","red");
            if(!this.set){
                document.styleSheets[0].insertRule("div.input-password:nth-child(2) input:focus{ outline: solid red ;}",0);
                this.set = true;
            }
        }
            
    }
    this.repeat.addEventListener("input",this.onInput);
    this.password.addEventListener("input",this.onInput);
    this.topeye.addEventListener("click",this.show);
    this.boteye.addEventListener("click",this.show);
}
const validator = new Validator();


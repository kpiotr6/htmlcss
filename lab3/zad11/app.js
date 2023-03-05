async function getData(){
    let response = await fetch("https://restcountries.com/v3.1/all");
    var json = await response.json();
    return json;
}
async function showData(){
    array = await getData();
    array.sort(function(a,b){
        if(a.subregion<b.subregion){
            return -1;
        }
        if(a.subregion>b.subregion){
            return 1;
        }
        return 0;
    }) 
    // console.log(k);
}
var array;
showData(array);



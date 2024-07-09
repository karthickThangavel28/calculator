var dis = document.getElementById("textcon");
let history = document.getElementById("history");


//display the value
function display(val) {
    dis.value += val;
}

//clear all element
function dele() {
    dis.value = "";
}

//clear the single element
function cls() {
    dis.value = dis.value.slice(0, -1);
}


//history and calculate the value
function ans() {
    try{   
    var n=dis.value
    var tag=document.createElement("li");
    tag.textContent=n+"="+eval(n)+"\t";
    history.append(tag)
    dis.value=eval(dis.value)
}
catch(err){
dis.value="invalid";
setTimeout(function(){
    dis.value="";
},3000);
}

}

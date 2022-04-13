
let myLeads = [];
let data = document.getElementById("input");
const save = document.getElementById("save");
let list = document.getElementById("list")
const clear = document.getElementById("clear")
const saveTab= document.getElementById("saveTab")
onload="load()"

data.addEventListener("keyup" , (e) =>{

    if (e.keyCode === 13){
        let x = data.value;
        myLeads.push(x);
        data.value = " ";

        // Storing data at local storage.
        // Converting it into string,
        localStorage.setItem("myLeads", JSON.stringify( myLeads))
        update()
    }
})

save.addEventListener("click",function(){
    let x = data.value;
    myLeads.push(x);
    data.value = " ";

    // Storing data at local storage.
    // Converting it into string,
    localStorage.setItem("myLeads", JSON.stringify( myLeads))
    update()
})

let leadFromStorage = JSON.parse(localStorage.getItem("myLeads"))

//loading the stored data when we refresh the page.
if (leadFromStorage){
    myLeads = leadFromStorage;
    update();
}


function update(){
    let listItems = "";

    for (let i = 0; i <myLeads.length; i ++){
      listItems += checkUrl(i); //`<li> <input type="checkbox" id = "check"> ${myLeads[i]}  </input> </li> `
    }
    list.innerHTML = listItems;
}

// It's clear the data when button is clicked.
clear.addEventListener("click", function(){
    localStorage.clear()
    myLeads = [];
    update()
})

saveTab.addEventListener("click", function(){
    
        chrome.tabs.query({active : true, currentWindow: true }, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        update()
        })
})

list.addEventListener("click" , function(){
    `<s> ${myLeads} </s>`
})

function checkBox(){
    let checkbox1 = document.getElementById('check');
    if(document.getElementById('check').checked) {
        localStorage.setItem('check', true);
    }
}


//Checking the valid url or not

function isValidUrl(_string){
    const matchPattern = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/;
    return matchPattern.test(_string);
  }


function checkUrl(i){
        if (isValidUrl(myLeads[i])){
            return `<li> 
            <a target = '_blank' class = "links" href='${myLeads[i]}'>${myLeads[i]}</a>
            </li>`

        }
        else{
            return `<li class = "links2"> ${myLeads[i]}</li> `  
        }
}

// Getting current Date.
let months = ['January','February','March','April','May','June','July',
'August','September','October','November','December'];       
let today = new Date();
today.setTime(today.getTime() );       
document.getElementById("spanDate").innerHTML =  today.getDate() +" " + months[today.getMonth()] +" " + today.getFullYear();


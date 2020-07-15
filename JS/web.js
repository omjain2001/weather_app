/*
fetch("http://puzzle.mead.io/puzzle").then( (response) => {
    
    response.json().then((data) => {
        console.log(data);
    })
})

fetch("http://localhost:5000/weather?address=pandharpur")
.then((response)=> {

    response.json().then(result => {
        console.log(result);
    })
    
})
*/

const address = document.querySelector(".input");
let result = document.querySelector(".result");

document.querySelector(".btn").addEventListener("click",(event) => {

    event.preventDefault(); // V.V.V. Imp 
    result.textContent = "Loading";
    fetch("http://localhost:5000/weather?address=" + address.value).then(response => {

    response.json().then(data => {
        
        if (data.error) {
            result.textContent = data.error;
        }
        else{
            result.innerHTML = "<b>"+ data.place + "</b>" + "<br><br>" + data.result;
        }
        
    })
})

})



console.log("This is our Postman Clone");

// Intialize the count by 0
let addparamcount = 0;

// Utility functions to get DOM element from string
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}
// FIRSTLY INITIALIZE THE DISPLAY OF PARAMETERSBOX AS 0
let parametersBox = document.getElementById("parametersBox");
parametersBox.style.display = "none";

// When we click on Parameters then block the display of JSON
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = "none";
    document.getElementById('parametersBox').style.display = "block";
})
// When we click on the JSON then block the display of Parameter
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    document.getElementById('parametersBox').style.display = "none";
    document.getElementById('requestJsonBox').style.display = "block";
})

// if user click on the + button then add more parameters to it.
let addParam = document.getElementById('addParam');
addParam.addEventListener('click', () => {
    let params = document.getElementById("params");
    let string = `<div class="form-row my-2">
    <label for="url" class="col-sm-2 col-form-label">Parameter ${addparamcount + 2}</label>
    <div class="col-md-4">
        <input type="text" class="form-control" id="parameterKey${addparamcount + 2}" 
        placeholder="Enter Parameter ${addparamcount + 2}Key">
    </div>
    <div class="col-md-4">
        <input type="text" class="form-control" id="parameterValue${addparamcount + 2}" 
        placeholder="Enter Parameter ${addparamcount + 2}Value">
    </div>
    <button  class="btn btn-primary deleteparam">-</button>
</div>`;
    // Convert the Element string to Dom node 
    let paramElement = getElementFromString(string);
    // console.log(paramElement);
    params.appendChild(paramElement)
// To delete the 
    let deleteparam = document.getElementsByClassName('deleteparam');
    for (item of deleteparam) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove();
        })
    }
    addparamcount++;

})

// ON CLICKING THE SUBMIT BUTTON 
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    document.getElementById('responseprism').innerHTML = "Please wait....Fetching response";

    let url = document.getElementById("url").value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;



    // if users has clicked params option instead of JSON option collect all parameters in a object
    if (contentType == 'params') {
        data = {};
        for (i = 0; i < addparamcount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;
            }
            // data = JSON.stringify(data);
        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById("requestJsonText").value
    }
console.log(data)
    // console.log(url, requestType, contentType,data);

    // IF MY REQUEST TYPE IS GET THEN FETCH THE REQUIRED DATA

    if (requestType == 'GET') {
        fetch(url, {
            method: 'GET',
        })
            .then(response => response.text())
            .then((text) => {
                // document.getElementById('responseJsonText').value = text;
                document.getElementById('responseprism').innerHTML = text;
                Prism.highlightAll();
            });
    }


    else{
        fetch(url,{
            method:'POST',
            body:data,
            headers:{
                "Content-type":"application/json ; charset=UTF-8"
            }
        })
        .then(response => response.text())
        .then((text) => {
            // document.getElementById('responseJsonText').value = text;
            document.getElementById('responseprism').innerHTML = text;
            Prism.highlightAll();
        });
    }

});
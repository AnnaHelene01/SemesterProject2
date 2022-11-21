//Hente ut elementer
const emailInput = document.querySelector("input#loginEmail");
const passwordInput = document.querySelector("input#loginPassword");
const submitBtn = document.querySelector("input#loginSubmit");
//console.log(emailInput, passwordInput, submitBtn);


//VALIDERE FORM
//Hente p taggene for å skrive ut beskjed ved validering
const emailMsg = document.querySelector("#emailMsg");
const passwordMsg = document.querySelector("#passwordMsg");


//Validate form function
submitBtn.addEventListener('click', validateForm);
function validateForm() {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    const submittedEmail = email;
     //console.log('Email: ' + submittedEmail);
     let emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     if (!emailPattern.test(submittedEmail)) {
     emailMsg.innerHTML += "Please enter a valid email";
     } 

    
     passwordMsg.innerHTML = "";
    const submittedPassword = password;
    if (submittedPassword.length < 8) {
        passwordMsg.innerHTML += 'The password must be at least 8 characters long!';
    }

      if (emailMsg.innerHTML === "" && passwordMsg.innerHTML === "") {
        //console.log("Form is submitted!");
        //form.submit(); ///for å submitte skjema 
     }
     else {
        console.log("You still have validation errors");
    }
}



//Logge inn bruker

//Endpoints:
// Endpoints
const API = " https://api.noroff.dev/api/v1";
const loginEndpoint = "/auction/auth/login"; // POST

const loginUrl = `${API}${loginEndpoint}`;



submitBtn.addEventListener("click", validateAndProcess) 

function validateAndProcess(event) {    
    event.preventDefault();
    //console.log("You've pressed submit bro");
    /**
     * 
     * @param {string} url URL to API endpoint
     * @param {object} data Object with the data for new user
     */

     const email = emailInput.value.trim();
     const password = passwordInput.value.trim();

    const loginData = {
        email: email,
        password: password,
    }
    //console.log(loginData);

    loginUser(loginUrl, loginData);
};

async function loginUser(url, data) {
    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };
        console.log(url, data, options)

        const response = await fetch (url, options);
        console.log(response);
        const answer = await response.json();
        console.log(answer);
        if (response.status === 200) {
            localStorage.setItem('username', answer.name);
            localStorage.setItem('accessToken', answer.accessToken);
            window.location = "/index.html";
        } else if (answer.message === "This profile does not exist! Go and register") {
            errorMsg.innerHTML = answer.message;
        }
    } catch(error) {
        console.warn(error);
    }
}

//loginUser(loginUrl, loginData);

const errorMsg = document.querySelector("#errorMsg");


//Logge ut?
const logOut = document.getElementById("log-out");
console.log(logOut);

logOut.addEventListener("click", () => {
    localStorage.clear('accessToken');
    window.location='./index.html';
})
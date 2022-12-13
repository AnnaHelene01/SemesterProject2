const loginNav = document.getElementById("login-nav");
const logoutNav = document.getElementById("logout-nav")
const profileNav = document.getElementById("profile-nav");
const usersNav = document.getElementById("users-nav");

// Checking if user is logged in
function isLoggedin() {
   const accessToken = localStorage.getItem("accessToken");
   if (!accessToken) {
       logoutNav.style.display="none";
       profileNav.style.display="none";
       usersNav.style.display="none";

   }
   else {
       loginNav.style.display="none";
   }
   }
   
   isLoggedin();

// Endpoints
const API = " https://api.noroff.dev/api/v1";
const loginEndpoint = "/auction/auth/login"; // POST

const loginUrl = `${API}${loginEndpoint}`;


//Hente ut elementer
const emailInput = document.querySelector("input#loginEmail");
const passwordInput = document.querySelector("input#loginPassword");
const submitBtn = document.querySelector("input#loginSubmit");
//console.log(emailInput, passwordInput, submitBtn);


//Logge inn bruker
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


const errorMsg = document.getElementById("errorMsg");

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
        //console.log(response);
        const answer = await response.json();
        //console.log(answer);
        localStorage.setItem('username', answer.name);
        localStorage.setItem('accessToken', answer.accessToken);

        if (response.status === 401) {
           errorMsg.innerHTML = answer.errors[0].message;   
        } else if (response.status === 200) {
           window.location = "../index.html";
        }
    } 
     catch(error) {
        console.warn(error);
    }
}



//VALIDERE FORM
//Hente p taggene for å skrive ut beskjed ved validering
const emailMsg = document.querySelector("#emailMsg");
const passwordMsg = document.querySelector("#passwordMsg");

submitBtn.addEventListener('click', validateForm);
function validateForm() {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    const submittedEmail = email;
     //console.log('Email: ' + submittedEmail);
     let emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     if (!emailPattern.test(submittedEmail)) {
     emailMsg.innerHTML += "Please enter a valid email with only characters, numbers, dot and underscore";
     } 
     if (submittedEmail.length < 11) {
        email.Msg.innerHTML = "Your email must be a valid email!"
     }
     if (
        !(
            submittedEmail.includes("@noroff.no")
        )
     ) {
        emailMsg.innerHTML += 'Email must include @noroff.no, make sure you spelled it right!'
     }

    
     passwordMsg.innerHTML = "";
    const submittedPassword = password;
    if (submittedPassword.length < 8) {
        passwordMsg.innerHTML += 'Your password must be at least 8 characters long!';
    }

      if (emailMsg.innerHTML === "" && passwordMsg.innerHTML === "") {
        //console.log("Form is submitted!");
        //form.submit(); ///for å submitte skjema 
     }
     else {
        console.log("You still have validation errors");
    }
}

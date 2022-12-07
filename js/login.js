const loginNav = document.getElementById("login-nav");
const logoutNav = document.getElementById("logout-nav")
const profileNav = document.getElementById("profile-nav");
const usersNav = document.getElementById("users-nav");
const pCredit = document.getElementById("p-credits");

// Checking if user is logged in
function isLoggedin() {
   const accessToken = localStorage.getItem("accessToken");
   if (!accessToken) {
       logoutNav.style.display="none";
       profileNav.style.display="none";
       usersNav.style.display="none";
       pCredit.style.display="none";

   }
   else {
       loginNav.style.display="none";
   }
   }
   
   isLoggedin();

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
     emailMsg.innerHTML += "Please enter a valid email with only characters, numbers, dot and underscore";
     } 
     if (submittedEmail.length < 11) {
        email.Msg.innerHTML = "Your email must be a valid email!"
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



//Logge inn bruker

//Endpoints:
// Endpoints
const API = " https://api.noroff.dev/api/v1";
const loginEndpoint = "/auction/auth/login"; // POST

const loginUrl = `${API}${loginEndpoint}`;

const username = localStorage.getItem("username");
const profileEndpoint = `/auction/profiles/${username}`;
const profileUrl = `${API}${profileEndpoint}`;

async function getProfile(url) {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };
    //console.log(url, options);

    const response = await fetch(url, options);
    //console.log(response);
    const profile = await response.json();
    const myCredits = profile.credits;
    const loggedIn = localStorage.getItem("accessToken");
    if (loggedIn) {
      document.getElementById("credits").innerHTML = `
       ${myCredits} 
       `;
    }
    //console.log(profile);
  } catch (error) {
    console.warn(error);
  }
}
// Henter all profilinfo
getProfile(profileUrl);


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
            window.location = "../index.html";

        } else if (answer.message === "This profile does not exist! Go and register") {
            errorMsg.innerHTML = answer.message;
        }
    } catch(error) {
        console.warn(error);
    }
}

//loginUser(loginUrl, loginData);
//const errorMsg = document.querySelector("#errorMsg");





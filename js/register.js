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
const usernameInput = document.querySelector("input#registerUsername");
const emailInput = document.querySelector("input#registerEmail");
const passwordInput = document.querySelector("input#registerPassword");
const avatarInput = document.querySelector("textarea#registerAvatar");
const submitBtn = document.querySelector("input#registerSubmit");
//console.log(usernameInput, emailInput, passwordInput, avatarInput, submitBtn);


//Registrere bruker

//Endpoints:
const APIurl = " https://api.noroff.dev/api/v1";
const registerEndpoint = "/auction/auth/register"; // POST

const registerUrl = `${APIurl}${registerEndpoint}`;

const username = localStorage.getItem("username");
const profileEndpoint = `/auction/profiles/${username}`;
const profileUrl = `${APIurl}${profileEndpoint}`;

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

//Get form-data on the register btn, validate and process
submitBtn.addEventListener("click", validateAndProcess) 

function validateAndProcess(event) {    
    event.preventDefault();
    console.log("You've pressed submit bro");

    /**
     * 
     * @param {string} url URL to API endpoint
     * @param {object} data Object with the data for new user
     */

     const username = usernameInput.value.trim();
     const email = emailInput.value.trim();
     const password = passwordInput.value.trim();
     const avatar = avatarInput.value.trim();

    const newUserData = {
        name: username,
        email: email,
        password: password,
        avatar: avatar,
    }
    registerNewUser(registerUrl, newUserData);
}
//console.log(newUserData);


async function registerNewUser(url, data) {
    const errorMsg = document.getElementById("errorMsg");
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
        console.log("Answer:", answer.errors);
        if (response.status === 201) {
            window.location = "/public/login.html";
        } else if (answer.errors[0].message === "Profile already exists") {
            errorMsg.innerHTML = `This profile already exist! Try to login instead`;
        }
    } catch(error) {
        console.warn(error);
    }
}


//Hente p taggene for å skrive ut beskjed ved validering
const usernameMsg = document.querySelector("#usernameMsg");
const emailMsg = document.querySelector("#emailMsg");
const passwordMsg = document.querySelector("#passwordMsg");
const avatarMsg = document.querySelector("#avatarMsg");


//Validate form 
submitBtn.addEventListener('click', validateForm);
function validateForm() {
    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const avatar = avatarInput.value.trim();

    usernameMsg.innerHTML = "";
    const submittedName = username;
    //console.log('Name: ' + submittedName);
    if (submittedName.length < 2) {
        usernameMsg.innerHTML += 'The name must be at least 2 characters long!';
    }
    let usernamePattern = /^[A-Za-z0-9_]+$/;
    if (!usernamePattern.test(submittedName)) { // And make sure it don't contain any digits
        usernameMsg.innerHTML += "The name can only contain characters, digits and underscore! ";
      }

    emailMsg.innerHTML = "";
    const submittedEmail = email;
     //console.log('Email: ' + submittedEmail);
     let emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     if (!emailPattern.test(submittedEmail)) {
     emailMsg.innerHTML += "Please enter a valid email with only characters, numbers, dot and underscore ";
     }
     //validere sjekk etter @noroff.no & @stud.noroff.no
     if (
        !(
            submittedEmail.includes("@stud.noroff.no") ||
            submittedEmail.includes("@noroff.no") 
        )
     ) {
        emailMsg.innerHTML += "Email must include @stud.noroff.no or @noroff.no";
     }
     
    passwordMsg.innerHTML = "";
    const submittedPassword = password;
    if (submittedPassword.length < 8) {
        passwordMsg.innerHTML += 'The password must be at least 8 characters long!';
    }

    const submittedAvatar = avatar;
    avatarMsg.innerHTML = "";
    let avatarPattern = /\.(jpeg|jpg|gif|png|svg)$/;
    if (submittedAvatar === "") {
        avatarInput.innerHTML =
          "https://upload.wikimedia.org/wikipedia/commons/4/48/No_image_%28male%29.svg";
      }  else if 
      ( !submittedAvatar.value == "" &&
      !avatarPattern.test(submittedAvatar)
    ) {
      avatarMsg.innerHTML = "Please enter a valid avatar url.";
    }

    if (usernameMsg.innerHTML === "" && emailMsg.innerHTML === "" && passwordMsg.innerHTML === "" && avatarMsg === "") {
        //console.log("Form is submitted!");
        //form.submit(); ///for å submitte skjema 
     }
     else {
        console.log("You still have validation errors");
    }
  }

     


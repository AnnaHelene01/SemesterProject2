const loginNav = document.getElementById("login-nav");
const logoutNav = document.getElementById("logout-nav")
const profileNav = document.getElementById("profile-nav");
const usersNav = document.getElementById("users-nav");
const showCredit = document.getElementById("credits");
const pCredit = document.getElementById("p-credits");
// Checking if user is logged in
function isLoggedin() {
   const accessToken = localStorage.getItem("accessToken");
   if (!accessToken) {
       logoutNav.style.display="none";
       profileNav.style.display="none";
       usersNav.style.display="none";
       showCredit.style.display="none";
       pCredit.style.display="none";
   }
   else {
       loginNav.style.display="none";
   }
   }
   
   isLoggedin();

//Log out
const logOut = document.getElementById("logout-nav");
//console.log(logOut);

   logOut.addEventListener("click", () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    window.location='../index.html';

   })


const loginNav = document.getElementById("login-nav");
const logoutNav = document.getElementById("logout-nav")
// Checking if user is logged in
function isLoggedin() {
   const accessToken = localStorage.getItem("accessToken");
   if (!accessToken) {
       logoutNav.style.display="none";
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


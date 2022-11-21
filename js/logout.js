//Log out
const logOut = document.getElementById("log-out");
//console.log(logOut);

   logOut.addEventListener("click", () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    window.location='./index.html';
   })


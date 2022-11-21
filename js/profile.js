//Legge til brukerens navn
const welcome = localStorage.getItem('username');
//console.log("User logged in:", welcome);
const userName = document.getElementById('user-name');

userName.innerHTML = welcome;
// ---------------- USERS PAGE --------------------
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

// Endpoints
const APIurl = " https://api.noroff.dev/api/v1";
const auctionEndpoint = "/auction/profiles"; // POST
const usersUrl = `${APIurl}${auctionEndpoint}`;
const username = localStorage.getItem("username");
const profileEndpoint = `/auction/profiles/${username}`;
const profileUrl = `${APIurl}${profileEndpoint}`;

//Get profile info to list out Credits
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
getProfile(profileUrl);

//----------------------------------------------------------------------------------------------------------
//Get all users and list out
let collection = [];

async function getAllUsers (url) {
    try {
        const accessToken = localStorage.getItem('accessToken'); 
        const options = {
            method: 'GET', 
            headers : {
                Authorization: `Bearer ${accessToken}`,
            }
        }
        //console.log(url, options);

        const response = await fetch(url, options); 
        //console.log(response);
        const users = await response.json();
        //console.log("Users:", users);
        collection = users;
        //console.log("Collection:", collection);
        listData(users, outElement)
    } catch(error) {
        console.warn(error);
    }
}   

getAllUsers(usersUrl);

const outElement = document.getElementById("post-container");

//Liste ut alle poster på html siden
function listData(list, out){
    //console.log ("List:", list);
    out.innerHTML = "";
    let newDivs = "";

    for (let user of list) {
        const profileImg =
        user.avatar === "" || user.avatar === null
        ? [
            "../Img/60111.jpg"
        ]
        :user.avatar;

        newDivs += `
        <div class="col-lg-4 col-md-6 mb-5 mb-lg-5">
        <div class="feature-1 border person text-center">
            <img src="${profileImg}" alt="Portrait" class="img-fluid">
            <div class="feature-1-content">
                <h2>${user.name}</h2>
                <span class="position mb-3 d-block">Credits: ${user.credits}</span>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit
                    morbi henderit elit
                </p>
            </div>
        </div>
    </div>`;
    }
    out.innerHTML = newDivs;

      //Filter users / search input
      const inputField = document.getElementById("filter-users");
      //console.log(inputField);
      inputField.addEventListener("keyup", filterUsers);
  
      function filterUsers () {
          const filterUsers = inputField.value.toLowerCase();
          //console.log(filterUsers);
  
          const filtered = collection.filter((user)=> {
              const author = user.name.toLowerCase();
              if (author.indexOf(filterUsers) > -1) return true;
              return false;
          })
  
          listData(filtered, outElement);
      }
  
}

//Btn to scroll to top
const toTopBtn = document.getElementById('toTop');
const scrollToTop = () => window.scrollTo({top: 0, behavior: 'smooth'});
toTopBtn.addEventListener('click', scrollToTop);
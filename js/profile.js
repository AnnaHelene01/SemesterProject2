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

//Legge til brukerens navn
const username = localStorage.getItem('username');
//console.log("User logged in:", welcome);



// Endpoints
const APIurl = " https://api.noroff.dev/api/v1";
const profileEndpoint = `/auction/profiles/${username}?_listings=true`; // POST

const profileUrl = `${APIurl}${profileEndpoint}`;
const updateAvatarUrl = `${APIurl}/auction/profiles/${username}/media`;

const profileBidsUrl = `${APIurl}/auction/profiles/${username}/bids?_listings=true`;


let collection = [];

//-------------------------------------------------------------------------------------------------------
async function getMyProfileInfo (url) {
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
        const profile = await response.json()
        const myCredits = profile.credits;
        const loggedIn = localStorage.getItem("accessToken");
        if (loggedIn) {
          document.getElementById("credits").innerHTML = `
           ${myCredits} 
           `;
        }
        collection = profile
        //console.log("Profil: ", profile)
        //console.log("Profil > navn: ", profile.name)
        //console.log("Profil > epost: ", profile.email)
        //console.log("Collection:", collection);
        listData(collection , outElement)
    } catch(error) {
        console.warn(error);
    }
}   

getMyProfileInfo(profileUrl);


const outElement = document.getElementById("post-container");


//Liste ut mine poster på html siden
function listData(list, out){
    //console.log("List: ", list)
    //console.log("Out: ", out)
    out.innerHTML = "";
    const avatarImg = document.getElementById("avatarImg");
    avatarImg.src = `${list.avatar}`

    const listCredits = document.getElementById("list-credits");
    listCredits.innerHTML = `${list.credits}`
    const listEmail = document.getElementById("list-email");
    listEmail.innerHTML = `Email: ${list.email}`

    let profileDivs = "";
        profileDivs += `
        <div class="mb-5 text-white"> 
        <h3 class="mt-0 mb-0">${list.name}</h3> 
        <p class="small mb-4"> 
            <i class="fas fa-map-marker-alt mr-2"></i>
            Bergen</p>
    </div> 
  
        `;
        out.innerHTML = profileDivs;
    }
       // if(list.length == 0) {
            //console.log("You have no posts yet!");
         //   const noPostMsg = document.getElementById("noPostMsg");
           // noPostMsg.innerHTML = "You have no posts yet!";
        //}


//-------------------------------------------------------------------------------------------------------
//HENTE MINE POSTER
async function getMyListings (url) {
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
        const listings = await response.json()
        //console.log("Profil: ", listings)
        const myOwnPosts = listings.listings

        listListings(myOwnPosts, secondElement)
    } catch(error) {
        console.warn(error);
    }
}   

getMyListings(profileUrl);



const secondElement = document.getElementById("listing-container")

function listListings(list, second) {
    second.innerHTML = "";
    let newDivs = "";

    for (let post of list) {
        let date = new Date(post.endsAt);
        let ourDate = date.toLocaleString("default", {
            day: "numeric", 
            month: "long", 
            hour: "2-digit", 
            minute: "2-digit"
        });

        newDivs += `
        <div class="col-lg-6 col-md-6 col-sm-12 mt-5">
             <a href="shop-specific.html?id=${post.id}" class="text-decoration-none">
                    <div class="card ">
                        <img src="${post.media[0]}" class="card-img-top card-img" alt="...">
                        <div class="card-body">
                            <h4 class="card-title">${post.title}</h4>
                            <p class="card-text">${post.description}</p>
                        </div>
                        <div class="card-body">
                            <p class="text-success">${ourDate}</p>
                        </div>
                    </div>
              </a>
        </div>`
    } 
    second.innerHTML = newDivs;
}



//-------------------------------------------------------------------------------------------------------
// List out all the posts the user has bid on
const bidElement = document.getElementById("listing-bids");


async function getMyBids(url) {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        alert("Please sign in to see profile.");
        window.location.href = "../index.html";
      }
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
      const listings = await response.json();
      //console.log(listings);
      listBids(listings, bidElement);
    } catch (error) {
      console.warn(error);
    }
  }
  
  getMyBids(profileBidsUrl);
  
  const listBids = (list, outElement) => {
    outElement.innerHTML = "";
    let newDivs = "";
  
    for (let listing of list) {
      const productImg =
        listing.listing.media.length !== 0
          ? `${listing.listing.media[0]}`
          : [
              "https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg",
            ];
      //console.log(listing);
  
      // sets time
      const date = new Date(listing.listing.endsAt).getTime();
      const now = new Date().getTime();
      const distance = date - now;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      //const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
      let bidTime = "";
  
      if (distance > 0) {
        bidTime = `${days}d ${hours}h ${minutes}m`;
      } else {
        bidTime = "EXPIRED";
      }
  
      newDivs += `
              <div class="col-lg-6 col-md-6 col-sm-12 mt-5">
              <a href="shop-specific.html?id=${listing.listing.id}" class="text-decoration-none">
                     <div class="card ">
                         <img src="${productImg}" class="card-img-top card-img" alt="...">
                         <div class="card-body">
                             <h4 class="card-title">${listing.listing.title}</h4>
                         </div>
                         <div class="card-body d-flex">
                             <p class="px-1">Your bid:</p>
                             <p class="text-success px-1">${listing.amount}</p>
                         </div>
                         <div class="card-body d-flex">
                         <p class="px-1">Ends:</p>
                         <p class="text-success px-1">${bidTime}</p>
                     </div>
                     </div>
               </a>
         </div>
              `;
    }
  
    outElement.innerHTML = newDivs;
}
  

//-------------------------------------------------------------------------------------------------------
// Oppdatere avatar - UPDATE AVATAR
const updateAvatarMsg = document.getElementById("updateAvatarMsg");
const updateAvatarInput = document.getElementById("updateAvatarInput");
const updateAvatarBtn = document.getElementById("updateAvatarBtn");
//console.log("Update avatar elements:", updateAvatarMsg, updateAvatarInput, updateAvatarBtn);

async function updateAvatar(url, data) {
    try {
      const accessToken = localStorage.getItem("accessToken");
      //console.log(accessToken);
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      };
     //console.log("avatar url, data, options:", url, data, options);
      // opp i api
      const response = await fetch(url, options);
      //console.log("avatar response:", response);
      const answer = await response.json();
      //console.log("avatar: answer", answer);
      if (answer.statusCode) {
        updateAvatarMsg.innerHTML =
          "Invalid image URL, make sure is fully formatted!";
      }
      if (answer.name) {
        window.location.reload();
      }
      //console.log(answer);
    } catch (error) {
      console.warn(error);
    }
  } 
  
updateAvatarBtn.addEventListener("click", newAvatar);
function newAvatar(event) {
  event.preventDefault();
  const avatarUrl = updateAvatarInput.value.trim();

  let avatarData = {
    avatar: avatarUrl,
  };

  updateAvatar(updateAvatarUrl, avatarData);
}



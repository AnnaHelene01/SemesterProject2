//Legge til brukerens navn
const username = localStorage.getItem('username');
//console.log("User logged in:", welcome);



// Endpoints
const APIurl = " https://api.noroff.dev/api/v1";
const profileEndpoint = `/auction/profiles/${username}?_listings=true`; // POST

const profileUrl = `${APIurl}${profileEndpoint}`;
const avatarUrl = `${APIurl}/auction/profiles/${username}/media`;

let collection = [];

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
    let profileDivs = "";
        profileDivs += `
                <h2 class="p-3" id="user-name">${list.name}</h2>
                <div class="d-flex mt-5">
                    <p class="p-3 display-3 text-success">CREDIT:</p>
                    <p class="p-3 display-3" id="profile-credits">${list.credits}</p>
                </div>
                <div class="d-flex">
                    <p class="p-3 display-3 text-success">EMAIL:</p>
                    <p class="p-3 display-3" id="profile-email">${list.email}</p>
                </div>
                <div class="d-flex">
                    <p class="p-3 display-3 text-success">WEBSITE:</p>
                    <p class="p-3 display-3">www.example.no</p>
                </div>
                <div class="d-flex">
                    <p class="p-3 display-3 text-success">PHONE:</p>
                    <p class="p-3 display-3">+123 45 678</p>
                </div>
  
        `;
        out.innerHTML = profileDivs;
    }
       // if(list.length == 0) {
            //console.log("You have no posts yet!");
         //   const noPostMsg = document.getElementById("noPostMsg");
           // noPostMsg.innerHTML = "You have no posts yet!";
        //}



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
        <div class="col-lg-4 col-md-6 col-sm-12 mt-5">
             <a href="shop-specific.html?id=${post.id}" class="text-decoration-none">
                          <div class="card ">
                            <img src="${post.media}" class="card-img-top card-img" alt="...">
                            <div class="card-body">
                              <h4 class="card-title">${post.title}</h4>
                              <p class="card-text display-6">${post.description}</p>
                            </div>
                            <div class="card-body">
                                <p class="display-6 text-success">${ourDate}</p>
                            </div>
                          </div>
             </a>
           </div>`
    } 
    second.innerHTML = newDivs;
}

// Oppdatere avatar
const updateAvatarMsg = document.getElementById("updateAvatarMsg");
const updateAvatarInput = document.getElementById("updateAvatarInput");
const updateAvatarBtn = document.getElementById("updateAvatarBtn");
console.log("Update avatar elements:", updateAvatarMsg, updateAvatarInput, updateAvatarBtn);

async function updateAvatar(url, data) {
    try {
      const accessToken = localStorage.getItem("accessToken");
      console.log(accessToken);
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      };
     console.log("avatar url, data, options:", url, data, options);
      // opp i api
      const response = await fetch(url, options);
      console.log("avatar response:", response);
      const answer = await response.json();
      console.log("avatar: answer", answer);
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

  updateAvatar(avatarUrl, avatarData);
}
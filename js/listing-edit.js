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
const APIurl = " https://api.noroff.dev/api/v1/auction/listings/";
const extraFlag = "?_seller=true&_bids=true"

let params = new URLSearchParams(document.location.search);
let id = params.get("id"); 

const getSingleAuctionURL = `${APIurl}${id}`;
const username = localStorage.getItem("username");
const profileUrl = `https://api.noroff.dev/api/v1/auction/profiles/${username}`;

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
   // console.log("Response:", response);
    const profile = await response.json();
    //console.log("Profile:", profile);
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



//Henter div-en fra html hvor innholdet skal
const outElement = document.getElementById("container");

//GET BIDS AND LIST OUT
async function getSingleListing (url) {
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
        //console.log("Edit reponse:", response);
        const bids = await response.json();
        console.log("Edit bids:", bids);
        listBids(bids, outElement)   
    } catch(error) {
        console.warn(error);
    }
}   

getSingleListing(getSingleAuctionURL);

//Hente edit elementer
const welcome = localStorage.getItem('username');
const editTitle = document.getElementById("editTitle");
const editContent = document.getElementById("editContent");
const editMedia = document.getElementById("editMedia");
const editBtn = document.getElementById("submitEdit");
const divEditMedia = document.getElementById("divEditMedia");
//console.log("elementer:", welcome, editTitle, editContent, editMedia, editBtn);

//LISTE UT
function listBids(bids, out) {
    editTitle.innerHTML = `${bids.title}`;
    editContent.innerHTML = `${bids.description}`;
    //Get media inputs (based on how many where created!)
    for (let i = 0; i < bids.media.length; i++) {
      divEditMedia.innerHTML += `
    <textarea class="form-control text-info update-media-url">${bids.media[i]}</textarea><br>
    `;
    }

    let date = new Date(bids.endsAt);
    let ourDate = date.toLocaleString("default", {
        day: "numeric", 
        month: "long", 
        hour: "2-digit", 
        minute: "2-digit"
    });

    const endBidTime = document.getElementById("endBidTime");
    endBidTime.innerHTML = `${ourDate}`


    //GET UPDATE DIV IN A PREVIEW DIV - with carousel if media array is more then 1!!!!!
    let placeholder =
    "../placeholder.png";
    let mediaList;
    let pointers;
    let sliderBtns;
  
  // MEDIA GALLERY IF MORE IMAGES THAN 0! Placeholder if 0 url - carousel linked in readme.md
  if (bids.media.length <= 0) {
    sliderBtns = "";
    pointers = "";
    mediaList = `<img class="img-fluid" src="${placeholder}" alt="Placeholder image" style="object-fit: cover;">`;
  } else if (bids.media.length === 1) {
    sliderBtns = "";
    pointers = "";
    mediaList = `
                <img class="img img-fluid" src="${bids.media[0]}" alt="Placeholder image">
        `;
  } else if (bids.media.length > 1) {
    sliderBtns = `
                <button class="carousel-control-prev" type="button" data-bs-target="#mediaCont" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#mediaCont" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
    `;
    mediaList = `
            <div class="carousel-item active">
                <img class="img-fluid" src="${bids.media[0]}" alt="Product image 0" style="object-fit: cover;">
            </div>
        `;
    pointers = `
            <button type="button" data-bs-target="#mediaCont" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 0"></button>
    `;
  
    for (let i = 1; i < bids.media.length; i++) {
      //console.log(i, auctions.media.length);
      mediaList += `
            <div class="carousel-item">
                <img class="img-fluid" src="${bids.media[i]}" alt="Product image ${i}" style="object-fit: cover;">
            </div>
        `;
      pointers += `
                <button type="button" data-bs-target="#mediaCont" data-bs-slide-to="${i}" aria-label="Slide ${i}"></button>
    `;
    }
  } 
  
  // Preview elements:
let previewContainer = document.getElementById("preview-container");
const previewTitle = document.getElementById("preview-title");
const previewImg = document.getElementById("preview-img");
const previewDescription = document.getElementById("preview-description");

// Preview of updating auction:
editTitle.addEventListener("keyup", preview);
divEditMedia.addEventListener("keyup", preview);
editContent.addEventListener("keyup", preview)

async function preview() {

  previewContainer.innerHTML = "";
  previewContainer.innerHTML = `
                    <div class="col-sm-12" id="singleMedia">
                        <div id="mediaCont" class="carousel slide" data-ride="carousel" >
                         <div class="carousel-indicators">
                            ${pointers}
                         </div>
                         <div class="carousel-inner h-100 w-100">
                            ${mediaList}
                         </div> 
                          ${sliderBtns}
                        </div>
                    </div>
                    <div class="card-body d-flex">
                   </div>

                   <div class="col-sm-12">
                   <div class="card mt-5">
                       <div class="card-body">
                           <h4 class="card-title">${editTitle.value}</h4>
                           <p id="preview-description">${editContent.value}</p>
                       </div>
                       <div class="d-flex">
                           <img src="/Img/60111.jpg" class="rounded-circle p-2"
                           height="40" alt="Avatar" loading="lazy" />
                           <h4 class="p-2"> Seller</h4>
                       </div>
                     </div>
                   </div>
              </div>
          `;
}
}


async function updatePost (id) {
    const title = editTitle.value.trim();
    const description = editContent.value.trim();

    let updateMedia = [];

    const updateImgInputs =
    document.getElementsByClassName("update-media-url");

    for(let inputMedia of updateImgInputs) {
      updateMedia.push(inputMedia.value.trim())
     }
console.log("updateMedia:", updateMedia);

  if (updateMedia.length === 0) {
    updateMedia.push("https://github.com/AnnaHelene01/SemesterProject2/blob/main/placeholder.png?raw=true");
  }

    const data = {
        title: title,
        description: description,
        media: updateMedia,
       };

       
    const url = `${APIurl}${id}`;
     try {
        const accessToken = localStorage.getItem('accessToken'); 
        const options = {
            method: 'PUT', 
            headers : {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(data),
        };
        //console.log("Update url, options:", url, options);

        const response = await fetch(url, options); 
        //console.log("Update response:", response);
        const answer = await response.json();
        //console.log("Update answer:", answer);
        const updateErrorMsg = document.getElementById("updateErrorMsg");
        if (response.status === 200) {
            window.location.reload();
          }   else {
            updateErrorMsg.innerHTML = answer.errors[0].message;  
          }  
        } catch(error) {
         console.warn(error);
    }
}

editBtn.addEventListener("click", () => {
    updatePost(id);
})


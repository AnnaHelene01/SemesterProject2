// ------- Script for main page ----------
const createListing = document.getElementById("createListing");
const viewProfile = document.getElementById("view-profile");
const viewSignup = document.getElementById("view-signup");
//const showCredit = document.getElementById("credits");
const pCredit = document.getElementById("p-credits");
// Checking if user is logged in
function isLoggedin() {
const accessToken = localStorage.getItem("accessToken");
if (!accessToken) {
    createListing.style.display="none";
    viewProfile.style.display="none";
    //showCredit.style.display="none";
    pCredit.style.display="none";
} else {
    viewSignup.style.display="none";
}
}

isLoggedin();


// Endpoints
const APIurl = " https://api.noroff.dev/api/v1";
const auctionEndpoint = "/auction/listings"; // POST
const extraFlag = "?_seller=true&_bids=true&sort=created&sortOrder=desc"
const auctionUrl = `${APIurl}${auctionEndpoint}${extraFlag}`;
const username = localStorage.getItem('username');

const sortEndsAsc = "?_seller=true&_bids=true&sort=endsAt&sortOrder=asc&_active=true";
const sortEndsDesc = "?_seller=true&_bids=true&sort=endsAt&sortOrder=desc&_active=true";
const sortAllBidsAsc = `${APIurl}${auctionEndpoint}${sortEndsAsc}`;
const sortAllBidsDesc = `${APIurl}${auctionEndpoint}${sortEndsDesc}`;


const deleteEndPoint = '/auction/listings/'; 
const deleteURL = `${APIurl}${deleteEndPoint}`;

const userName = localStorage.getItem("username");

const profileEndpoint = `/auction/profiles/${userName}`;
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
// Henter all profilinfo
getProfile(profileUrl);


//----------------------------------------------------------------------------------
//Get all auctions and list out
let collection = [];

async function getAllAuctions (url) {
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
        const auction = await response.json();
        console.log("Posts:", auction);
        collection = auction;
        //console.log("Collection:", collection);
        listData(auction, outElement)
    } catch(error) {
        console.warn(error);
    }
}   

getAllAuctions(auctionUrl);

const outElement = document.getElementById("post-container");

//Liste ut alle poster på html siden
function listData(list, out){
    //console.log ("List:", list);
    out.innerHTML = "";
    let newDivs = "";

    for (let auction of list) {

   //Ternyary for listing media
   const productImg =
   auction.media.length === 0 || auction.media == "undefined"
   ? 
    "../placeholder.png"
    : `${auction.media[0]}`;
   //console.log ("Fikset Action Media: ", productImg);

   //Ternyary for avatar img
    const profileImg =
    auction.seller.avatar === "" || auction.seller.avatar === null
    ? [
        "../Img/60111.jpg"
    ]
    :auction.seller.avatar;

//FIX DATE LAYOUT
    let date = new Date(auction.endsAt);
    let now = new Date().getTime();
    let distance = date - now;

    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    let bidTime = "";
    bidTime = days + "d " + hours + "h " + minutes + "m ";

   
    if (distance < 0) {
      bidTime = "EXPIRED";
    }

//DATE WITH MONTH AND TIME
let dateWrite = new Date(auction.endsAt);
let deadline = dateWrite.toLocaleString("default", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" });

        newDivs += `
        <div class="col-lg-4 col-md-6 col-sm-12">
            <a href="./public/shop-specific.html?id=${auction.id}" class="text-decoration-none"> 
               <div class="card mt-5">
                 <img src="${productImg}" class="card-img-top card-img" alt="..">
        
                 <div class="card-body">
                 <h4 class="card-title">${auction.title}</h4>
                 <div class="d-flex">
                    <img src="${profileImg}" class="rounded-circle p-2"
                    height="50" alt="Avatar" loading="lazy" />
                    <h4 class="p-2"> ${auction.seller.name}</h4>
                 </div>
                   <div class="d-flex mt-1 pt-2 justify-content-between">
                       <div>
                          <p>Bids:</p>
                          <p>${auction._count.bids}</p>
                        </div>
                        <div>
                          <p>Auction ends: </p>
                          <p class="timer">${bidTime}</p>
                          <p class="timer">${deadline}</p>
                         </div>
                    </div>
                    </a> 
                 </div>
               </div>
          </div>`;
    }
    out.innerHTML = newDivs;

        //TIMER
        const timer = document.getElementsByClassName("timer");
        for(let i = 0; i < timer.length; i++) {

        let bidEnding = timer[i].innerHTML;
        
        if (bidEnding !== "EXPIRED") {
        timer[i].classList.add("not-expired");
        } else {
             timer[i].classList.add("expired");
        }    
    }
}


      //Filter posts / search input
      const inputField = document.getElementById("filter-auction");
      //console.log(inputField);
      inputField.addEventListener("keyup", filterAuctions);
  
      function filterAuctions () {
          const filterAuctions = inputField.value.toLowerCase();
          //console.log(filterAuctions);
  
          const filtered = collection.filter((auction)=> {
              const author = auction.seller.name.toLowerCase();
              const title = auction.title.toLowerCase();
              const published = auction.created.toString();
              //console.log(author, title, published);
              if (author.indexOf(filterAuctions) > -1) return true;
              if (title.indexOf(filterAuctions) > -1) return true;
              if (published.indexOf(filterAuctions) > -1) return true;
              return false;
          })
  
          listData(filtered, outElement);
      }
  //Sort by function for sort btn
    const sortByNewst = document.getElementById("sortByNewest");
    const sortByOldest = document.getElementById("sortByOldest");
    const sortByNotExpired = document.getElementById("sortByNotExpired");
    const sortByExpired = document.getElementById("sortByExpired");
    const sortByValidImg = document.getElementById("sortByValidImg");
    
    sortByNewst.addEventListener("click", sortNewest);
    function sortNewest() {
        getAllAuctions(sortAllBidsAsc);
    };
    sortByOldest.addEventListener("click", sortOldest);
    function sortOldest() {
        getAllAuctions(sortAllBidsDesc);
    };

    sortByNotExpired.addEventListener("click", filterNotExpired);
    function filterNotExpired() {
      const filteredAuctions = collection.filter(auction => {
        const distance = new Date(auction.endsAt) - new Date().getTime();
        return distance >= 0;
      });
      listData(filteredAuctions, outElement);
    }

    sortByExpired.addEventListener("click", filterExpired);
    function filterExpired() {
      const filteredAuctions = collection.filter(auction => {
        const distance = new Date(auction.endsAt) - new Date().getTime();
        return distance < 0;
      });
      listData(filteredAuctions, outElement);
    }

    sortByValidImg.addEventListener("click", filterValidImages);
    function filterValidImages() {
      const filteredAuctions = collection.filter(auction => {
        // Check if the auction has a valid media URL
        const hasValidMedia = auction.media && auction.media.length > 0 && auction.media[0] !== "undefined";

        if (!hasValidMedia) {
          // Skip this auction if it has a placeholder or bad URL
          return false;
        }

        // Check if the media URL is an image
        const isImage = /\.(jpeg|jpg|gif|png)$/i.test(auction.media[0]);

        return isImage;
      });

      listData(filteredAuctions, outElement);
    }

//-----------------------------------------------------  
//Get create post elements:
const postTitle = document.getElementById("postTitle");
const postContent = document.getElementById("postContent");
const postMedia = document.getElementById("postMedia");
const endsBid = document.getElementById("endBid");
const submitPost = document.getElementById("submitPost");
//console.log(postTitle, postContent, postMedia, endsBid, submitPost);


//Create a new post - method: POST
const createAuction = `${APIurl}${auctionEndpoint}`;


async function createNewAuction (url, data) {
    try {
        const accessToken = localStorage.getItem('accessToken'); 
        const options = {
            method: 'POST', 
            headers : {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(data),
        };
       // console.log("Url:", url,"Data:", data,"Options:", options);

        const response = await fetch(url, options); 
        //console.log(response);
        const answer = await response.json();
        //console.log("Answer", answer);
        if (answer.id) {
            window.location = "./index.html";
          }
    } catch(error) {
        console.warn(error);
    }
}

//Media gallery - creating more inputs with a btn
const addBtn = document.querySelector(".add");
const input = document.querySelector(".inp-group");
const submitMedia = document.querySelector("#submitMedia");
let numberOfInputs = 0;

function removeInput() {
    this.parentElement.remove();
}

function addInput() {
    numberOfInputs += 1;  

    const name = document.createElement("textarea");
    name.className="form-control" + " media-input";
    name.id=`media-id${numberOfInputs}`;
    name.placeholder="Add new media url";

    const btn=document.createElement("a");
    btn.className = "delete";
    btn.innerHTML = "&times";

    btn.addEventListener("click", removeInput);

    const flex = document.createElement("div");
    flex.className = "flex";

    input.appendChild(flex);
    flex.appendChild(name);
    flex.appendChild(btn);

}

addBtn.addEventListener("click", addInput);


//Get validation elements
const titleMsg = document.getElementById("titleMsg");
const bodyMsg = document.getElementById("bodyMsg");
const mediaMsg = document.getElementById("mediaMsg");
const endbidMsg = document.getElementById("endbidMsg");


//console.log(titleMsg, bodyMsg, mediaMsg);

//Validate form 
submitPost.addEventListener('click', validateFormAndProcess);
function validateFormAndProcess(event) {
    event.preventDefault();

    const mediaInputs = document.querySelectorAll(".media-input");
   // console.log("MediaInputs:", mediaInputs);
    const title = postTitle.value.trim();
    const description = postContent.value.trim();

   let media = [];
   for(inputMedia of mediaInputs) {
    if (inputMedia.value) media.push(inputMedia.value);
    }
  // console.log("Mediainputs, value:", mediaInputs, media);
  if (media.length === 0) {
    media.push("https://github.com/AnnaHelene01/SemesterProject2/blob/main/placeholder.png?raw=true");
  }

    const endsAt = `${endsBid.value.trim()}:00.000Z`;

    if (media.value === []) 
    media = 
    ["https://upload.wikimedia.org/wikipedia/commons/6/67/Learning_Curve_--_Coming_Soon_Placeholder.png"];

    const auctionData = {
        title: title,
        description: description,
        media: media,
        endsAt: endsAt,   
       };
    //console.log(auctionData);

    const submittedTitle = title;
    titleMsg.innerHTML = "";
     if (submittedTitle.length < 1) {
     titleMsg.innerHTML = 'Your title has to be at least 1 or more characters.';
     }
     
    bodyMsg.innerHTML = "";
    const submittedBody = description;
    if (submittedBody.length < 1) {
        bodyMsg.innerHTML = 'Your description has to be at least 1 or more characters.';
    }

    mediaMsg.innerHTML = "";
    const submittedMedia = media;
    if (submittedMedia === "") {
        mediaMsg.innerHTML = 'You must add a real URL';
    }

    endbidMsg.innerHTML = "";
    const submittedEndbid = endsAt;
    if (submittedEndbid === "") {
        endbidMsg.innerHTML = 'You have to add a date and time to end your auction!'
    }

      if (titleMsg.innerHTML === "" && bodyMsg.innerHTML === "" && mediaMsg.innerHTML === "") {
        //console.log("Form is submitted!");
        //form.submit(); ///for å submitte skjema 
     }
     else {
        console.log("You still have validation errors");
    }
    createNewAuction(createAuction, auctionData);
}

// Preview elements:
let previewContainer = document.getElementById("preview-container");
const previewTitle = document.getElementById("preview-title");
const previewImg = document.getElementById("preview-img");
const previewDescription = document.getElementById("preview-description");

// Preview of creating auction:
postTitle.addEventListener("keyup", preview);
postMedia.addEventListener("keyup", preview);
postContent.addEventListener("keyup", preview)

async function preview() {
  previewContainer.innerHTML = "";
  previewContainer.innerHTML = `
                <div class="col-sm-12">
                  <div class="card mt-5 border border-dark">
                    <img src="${
                        postMedia.value !== ""
                          ? postMedia.value
                          : "../placeholder.png"
                      }" class="card-img-top card-img" alt="..">
           
                      <div class="card-body">
                          <h4 class="card-title">${postTitle.value}</h4>
                          <p id="preview-description">${postContent.value}</p>
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


//Btn to scroll to top
const toTopBtn = document.getElementById('toTop');
const scrollToTop = () => window.scrollTo({top: 0, behavior: 'smooth'});
toTopBtn.addEventListener('click', scrollToTop);
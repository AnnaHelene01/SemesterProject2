// ---------- Specific auction page -----------
const loginNav = document.getElementById("login-nav");
const logoutNav = document.getElementById("logout-nav")
const profileNav = document.getElementById("profile-nav");
const usersNav = document.getElementById("users-nav");
const pCredit = document.getElementById("p-credits");
const signOrReg = document.getElementById("sign-register-links");

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
       signOrReg.style.display="none";
   }
   }
   
   isLoggedin();

// Endpoints
const APIurl = " https://api.noroff.dev/api/v1";
const auctionEndpoint = "/auction/listings/"; // POST
const auctionUrl = `${APIurl}${auctionEndpoint}`;
const extraFlag = "?_seller=true&_bids=true"
const deleteEndPoint = '/auction/listings/'; 
const deleteURL = `${APIurl}${deleteEndPoint}`;

let params = new URLSearchParams(document.location.search);
let id = params.get("id"); 

const getSingleAuctionURL = `${auctionUrl}${id}${extraFlag}`;
const makeBidUrl = `${auctionUrl}${id}/bids`

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


//-------------------------------------------------------------------
let collection = [];

//Get single auction to page by id
async function getSingleAuction (url) {
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
        const auctions = await response.json();
        //console.log("Auctions:", auctions);
        collection = auctions;
        //console.log("Collection:", collection);
        listData(auctions, outElement)
    } catch(error) {
        console.warn(error);
    }
}   

getSingleAuction(getSingleAuctionURL);

const outElement = document.getElementById("post-container");

//Liste ut alle poster på html siden
function listData(auctions, out){
    //console.log ("List:", auctions);
    let date = new Date(auctions.endsAt);
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

   //Ternyary / placeholder for avatar
   const profileImg =
   auctions.seller.avatar === "" || auctions.seller.avatar === null
   ? [
      "../Img/60111.jpg"
    ]
  :auctions.seller.avatar;

  // Gets and displayes the highest bid
    const allBids = auctions.bids;
    let highestBid = 0;
  
    function getHighestBid(allBids) {
      if (allBids.length !== 0) {
        highestBid = allBids
          .map((o) => o.amount)
          .reduce(function (a, b) {
            return Math.max(a, b);
          });
      }
    }
    getHighestBid(allBids);

  //Putting some stuff in elements
    const numberOfBids = document.getElementById("number-of-bids")
    numberOfBids.innerHTML = `Highest bid: ${highestBid}`;
    const auctionAvatar = document.getElementById("auction-avatar");
    auctionAvatar.src = `${profileImg}`
    const auctionSeller = document.getElementById("auction-seller");
    auctionSeller.innerHTML = `@${auctions.seller.name}`;

    //---------------------------------------------------------------------------------------------------------------
    let placeholder =
    "../placeholder.png";
    let mediaList;
    let pointers;
    let sliderBtns;

  // MEDIA GALLERY IF MORE IMAGES THAN 0! Placeholder if 0 url. - carousel linked in readme.md
  if (auctions.media.length <= 0) {
    sliderBtns = "";
    pointers = "";
    mediaList = `<img class="h-100 w-100" src="${placeholder}" alt="Placeholder image" style="object-fit: cover;">`;
  } else if (auctions.media.length === 1) {
    sliderBtns = "";
    pointers = "";
    mediaList = `
                <img class="h-100 w-100" src="${auctions.media[0]}" alt="Placeholder image" style="object-fit: cover;">
        `;
  } else if (auctions.media.length > 1) {
    sliderBtns = `
                <button class="carousel-control-prev" type="button" data-bs-target="#mediaCont" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon bg-success" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#mediaCont" data-bs-slide="next">
                    <span class="carousel-control-next-icon bg-success" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
    `;
    mediaList = `
            <div class="carousel-item active">
                <img class="h-100 w-100" src="${auctions.media[0]}" alt="Product image 0" style="object-fit: cover;">
            </div>
        `;
    pointers = `
            <button type="button" data-bs-target="#mediaCont" data-bs-slide-to="0" class="active bg-success" aria-current="true" aria-label="Slide 0"></button>
    `;

    for (let i = 1; i < auctions.media.length; i++) {
      //console.log(i, auctions.media.length);
      mediaList += `
            <div class="carousel-item h-100">
                <img class="h-100 w-100" src="${auctions.media[i]}" alt="Product image ${i}" style="object-fit: cover;">
            </div>
        `;
      pointers += `
                <button type="button" data-bs-target="#mediaCont" class="bg-success" data-bs-slide-to="${i}" aria-label="Slide ${i}"></button>
    `;
    }
  }

  //console.log(mediaList, auctions.media.length);
        let newDivs = "";
        newDivs += `
                      <div class="mb-5 col-lg-12 col-md-8" id="singleMedia">
                          <div id="mediaCont" class="carousel slide" data-ride="carousel">
                           <div class="carousel-indicators">
                              ${pointers}
                           </div>
                           <div class="carousel-inner h-100">
                              ${mediaList}
                           </div> 
                            ${sliderBtns}
                          </div>
                      </div>

                      <h2 class="my-4">${auctions.title}</h2>
                      <p>${auctions.description}</p>

                      <div class="card-body d-flex">
                        <p>Auction ends: </p>
                        <p class=" timer">${bidTime}</p>
                     </div>
                     <h2 class="mt-4">Bidders: (${auctions._count.bids})</h2>
            `;
      const sendBidBtn = document.getElementById("create-bid-btn");
      sendBidBtn.addEventListener("click", validateAndProcess);
    
    out.innerHTML = newDivs;


    //TIMER
    const timer = document.querySelector(".timer");
    let bidEnding = timer.innerHTML;
    if (bidEnding !== "EXPIRED") {
        timer.classList.add("not-expired");
    } else {
        timer.classList.add("expired");
    }

  // DISPLAY ELEMENTS BASED ON LOGGED IN OR NOT
  //YOUR OWN BID OR NOT
  //EXPIRED OR NOT
  const makeBid = document.getElementById("bid-make-a-bid");
  const myOwnBid = document.getElementById("bid-my-own");
  const bidNotLoggedIn = document.getElementById("bid-not-loggedin");
  const bidExpired = document.getElementById("bid-expired");
  //console.log(makeBid, myOwnBid, bidNotLoggedIn, bidExpired);

  function displayBid() {
    const accessToken = localStorage.getItem("accessToken");
    const userName = localStorage.getItem("username");
    if (accessToken && userName !== auctions.seller.name) {
        myOwnBid.style.display="none";
        bidNotLoggedIn.style.display="none";
        bidExpired.style.display="none";        
    } 
    else if (accessToken && userName === auctions.seller.name) {
        makeBid.style.display="none";
        bidNotLoggedIn.style.display="none";
        bidExpired.style.display="none"; 
    }
    else if (!accessToken) {
        makeBid.style.display="none";
        myOwnBid.style.display="none";
        bidExpired.style.display="none";
    }
    else if (timer.innerHTML="EXPIRED") {
        makeBid.style.display="none";
        myOwnBid.style.display="none";
        bidNotLoggedIn.style.display="none";
    }
       
    }

    displayBid()

          //Delete listing
          const sellDelete = document.getElementById("sell-delete-btn");
            sellDelete.addEventListener("click", () => {
               //console.log("btn attribute:", btnDelete.getAttribute('data-delete'));
               if ( confirm('Are you totally sure?')){
                   deletePost(auctions.id);
               }
         }) 
           //Update listing
           const sellUpdate = document.getElementById("sell-update-btn");
                sellUpdate.addEventListener("click", () => {
                 //console.log(btnUpdate.getAttribute('data-update'));
                  window.location =`./listing-edit.html?id=${auctions.id}`;
            })
        
}

// DELETE POST
async function deletePost (id) {
    //console.log(id);
    const url = `${deleteURL}${id}`;
     try {
        const accessToken = localStorage.getItem('accessToken'); 
        const options = {
            method: 'DELETE', 
            headers : {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        };
        //console.log("Delete url options:", url, options);

        const response = await fetch(url, options); 
        //console.log("Delete response:", response);
        //const answer = await response.json();
        //console.log("Delete answer:", answer);
        if (response.status === 204) {
            window.location = "../index.html";
          }    } catch(error) {
         console.warn(error);
    }
}

//----------------------------------------------------------------------------------------------------------
//GET BIDS AND LIST OUT
async function getSingleBids (url) {
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
        const bids = await response.json();
       // console.log("Auctions:", auctions);
        const answer = bids.bids
        //console.log("listBids:", answer);
        listBids(answer, secondElement)   
    } catch(error) {
        console.warn(error);
    }
}   

getSingleBids(getSingleAuctionURL);

const secondElement = document.getElementById("bid-container")

function listBids(list, second) {
    second.innerHTML = "";
    let newDivs = "";
   //Sort the list highest to lowest bids
    list.sort(function(a, b){
        return b.amount - a.amount
    })
    //console.log("Sortert:", list); 
 
    for (let bid of list) {
        newDivs += `
        <ul class="list-unstyled bidder mt-3">
                          <li class="d-flex justify-content-between align-items-center">
                              <div class="d-flex align-items-center">
                                  <span>@</span>
                                  <div class="d-flex align-items-center">
                                      <img src="">
                                      <span>${bid.bidderName}</span>
                                  </div>
                              </div>
                              <span class="price">${bid.amount}</span>
                          </li>
                      </ul>`
    } 
    second.innerHTML = newDivs;
}

//----------------------------------------------------------------------------------------------------------
//MAKE A BID 
async function createBid(url, data) {
    try {
      const accessToken = localStorage.getItem("accessToken");
      //console.log(accessToken);
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      };
      //console.log(url, data, options);
      const response = await fetch(url, options);
      //console.log(response);
      const answer = await response.json();
      const bidErrorMsg = document.getElementById("bid-error-msg");
      if (response.status === 200) {
        window.location.reload();
      } else {
        bidErrorMsg.innerHTML = answer.errors[0].message;
      }
      console.log(answer);
    } catch (error) {
      console.warn(error);
    }
  }

  // Prosesses and validates bid input
function validateAndProcess(event) {
    event.preventDefault();
    const bidInput = document.getElementById("create-bid-input").value.trim();
    const bidInputMsg = document.getElementById("create-bid-msg");
    //console.log("Bid elements:", bidInput, bidInputMsg);
    const bidToSend = parseInt(bidInput);
    //console.log("bidToSend:", bidToSend);
  
    let bidData = {
      amount: bidToSend,
    };
  
    if (!isNaN(bidToSend)) {
      //console.log("value is a number");
    } else {
      bidInputMsg.innerHTML = "Bid has to be a number.";
    }

      // Checking if user is logged in
      function isLoggedin() {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            
           alert("You have to sign in to place a bid!");
           window.location.href = "./login.html";
        }
      }
      
        isLoggedin();
  
    createBid(makeBidUrl, bidData);
  }

  
//Btn to scroll to top
const toTopBtn = document.getElementById('toTop');
const scrollToTop = () => window.scrollTo({top: 0, behavior: 'smooth'});
toTopBtn.addEventListener('click', scrollToTop);  

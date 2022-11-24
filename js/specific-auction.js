// Endpoints
const APIurl = " https://api.noroff.dev/api/v1";
const auctionEndpoint = "/auction/listings/"; // POST

const auctionUrl = `${APIurl}${auctionEndpoint}`;

const extraFlag = "?_seller=true&_bids=true"

let params = new URLSearchParams(document.location.search);
let id = params.get("id"); 

const getSingleAuctionURL = `${auctionUrl}${id}${extraFlag}`;
//let posts = [];
console.log(id);

//let AUCTION = [];
let collection = [];

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
       // console.log("Auctions:", auctions);
        collection = auctions;
        console.log("Collection:", collection);
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

    //console.log("Logger autcion", auctions);

    let date = new Date(auctions.endsAt);
    let auctionEnd = setInterval(function () {

    let now = new Date().getTime();

    let distance = date - now;

    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const timer = document.querySelector(".timer");
    timer.innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
    timer.classList.add("not-expired");
    
    if (distance < 0) {
      clearInterval(auctionEnd);
      timer.innerHTML = "EXPIRED";
    }
  }, 1000);

        let newDivs = "";
        newDivs += `
      <div class="site-section">
          <div class="container">
              <div class="row">
                  <div class="col-lg-3 order-lg-2">
                      <div class="box-side mb-4">
                          <p class="display-6">Price: 100</p>
                          <p class="display-6">Number of bids: ${auctions._count.bids}</p>
                          <form action="#">
                              <div class="mb-4">
                                  <input type="text" class="form-control mb-2" placeholder="0 Credits">
                                  <a href="register.html"><input type="submit" value="SUBMIT A BID" class="btn btn-secondary btn-lg px-5"></a>
                              </div>
                              <p class="display-6 mb-0">
                                  <a href="/public/login.html">Sign in</a>
                                  /
                                  <a href="/public/register.html">Register</a>
                              </p>
                          </form>
                      </div>
                      <div class="box-side text-center mb-4">
                          <img src="${auctions.seller.avatar}" alt="user" class="img-fluid w-50 rounded-circle mb-4">
                          <h3>${auctions.seller.name}</h3>
  
                      </div>
                  </div>
                  <div class="col-lg-8 pr-lg-5">
                      <div class="mb-5" id="singleMedia">
                          <img src="${auctions.media}" alt="product img" class="img-fluid"> 
                      </div>
                      <h2 class="my-4">${auctions.title}</h2>
                      <p class="display-6">${auctions.description}</p>
                      <div class="card-body d-flex">
                      <p class="display-4">Auction ends: </p>
                      <p class="display-4 text-succrss timer expired"></p>
                   </div>
                   <h2 class="mt-4">Bidders: (${auctions._count.bids})</h2>
                  </div>
              </div>
          </div>
      </div>`;

          //const singleMedia = document.getElementById("singleMedia");
          //singleMedia += `<img src="${auctions.media}">`
          //singleMedia.innerHTML = singleMedia
    
    out.innerHTML = newDivs;
}



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
        console.log("listBids:", answer);
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

    for (let bid of list) {

        newDivs += `
        <ul class="list-unstyled bidder mt-3">
                          <li class="d-flex justify-content-between align-items-center">
                              <div class="d-flex align-items-center">
                                  <span class="display-6">-</span>
                                  <div class="d-flex align-items-center">
                                      <img src="">
                                      <span class="display-6">${bid.bidderName}</span>
                                  </div>
                              </div>
                              <span class="price display-6">${bid.amount}</span>
                          </li>
                      </ul>`
    } 
    second.innerHTML = newDivs;
}
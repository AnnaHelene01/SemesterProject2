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
        let ourDate = date.toLocaleString("default", {
            day: "numeric", 
            month: "long", 
            hour: "2-digit", 
            minute: "2-digit"
        });

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
                                  <a href="">Sign in</a>
                                  /
                                  <a href="">Register</a>
                              </p>
                          </form>
                      </div>
                      <div class="box-side text-center">
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
                      <p class="display-6">Auction ends: </p>
                      <p class="display-6">${ourDate}</p>
                   </div>
                   <h2 class="my-4">Bidders (${auctions._count.bids})</h2>
                      <ul class="list-unstyled bidder">
                          <li class="d-flex justify-content-between align-items-center">
                              <div class="d-flex align-items-center">
                                  <span class="display-6">1.</span>
                                  <div class="d-flex align-items-center">
                                      <img src="">
                                      <span class="display-6">Username</span>
                                  </div>
                              </div>
                              <span class="price display-6">100 Credits</span>
                          </li>
                          <li class="d-flex justify-content-between align-items-center">
                              <div class="d-flex align-items-center">
                                  <span class="display-6">1.</span>
                                  <div class="d-flex align-items-center">
                                      <img src="">
                                      <span class="display-6">Username</span>
                                  </div>
                              </div>
                              <span class="price display-6">100 Credits</span>
                          </li>
                          <li class="d-flex justify-content-between align-items-center">
                              <div class="d-flex align-items-center">
                                  <span class="mr-2 display-6">1.</span>
                                  <div class="d-flex align-items-center">
                                      <img src="">
                                      <span class="display-6">Username</span>
                                  </div>
                              </div>
                              <span class="price display-6">100 Credits</span>
                          </li>
                      </ul>
                  </div>
              </div>
          </div>
      </div>`;

          //const singleMedia = document.getElementById("singleMedia");
          //singleMedia += `<img src="${auctions.media}">`
          //singleMedia.innerHTML = singleMedia
    
    out.innerHTML = newDivs;
}

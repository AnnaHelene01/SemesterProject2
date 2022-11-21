// Endpoints
const APIurl = " https://api.noroff.dev/api/v1";
const auctionEndpoint = "/auction/listings"; // POST

const auctionUrl = `${APIurl}${auctionEndpoint}`;


//let AUCTION = [];
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
        //console.log("Posts:", posts);
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
    console.log ("List:", list);
    out.innerHTML = "";
    let newDivs = "";

    for (let auction of list) {

        
        let date = new Date(auction.endsAt);
        let ourDate = date.toLocaleString("default", {
            day: "numeric", 
            month: "long", 
            hour: "2-digit", 
            minute: "2-digit"
        });

        newDivs += `
        <div class="col-lg-4 col-md-6">
             <a href="shop-specific.html?id=${auction.id}" class="text-decoration-none">
               <div class="card">
                 <img src="${auction.media}" class="card-img-top" alt="..">
                 <div class="card-body">
                     <h4 class="card-title">${auction.title}</h4>
                     <div class="d-flex">
                        <h4>Bids: </h4>
                        <h4> ${auction._count.bids}</h4>
                     </div>
                     <p class="card-text display-6">${auction.description}</p>
                 </div>
                 <div class="card-body">
                    <p class="display-6">Username?</p>
                 </div>
                 <div class="card-body d-flex">
                    <p class="display-6">Auction ends: </p>
                    <p class="display-6">${ourDate}</p>
                 </div>
                </div>
            </a>
          </div>`;
    }
    out.innerHTML = newDivs;
}

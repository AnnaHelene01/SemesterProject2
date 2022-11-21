// Endpoints
const APIurl = " https://api.noroff.dev/api/v1";
const auctionEndpoint = "/auction/listings"; // POST
const extraFlag = "?_seller=true&_bids=true"

const auctionUrl = `${APIurl}${auctionEndpoint}${extraFlag}`;


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
   // console.log ("List:", list);
    out.innerHTML = "";
    let newDivs = "";

    for (let auction of list) {

        let date = new Date(auction.endsAt);
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

        newDivs += `
        <div class="col-lg-4 col-md-6 col-sm-12">
             <a href="shop-specific.html?id=${auction.id}" class="text-decoration-none">
               <div class="card mt-5">
                 <img src="${auction.media}" class="card-img-top card-img" alt="..">
        
                 <div class="card-body">
                 <h4 class="card-title">${auction.title}</h4>
                 <div class="d-flex">
                    <img src="${auction.seller.avatar}" class="rounded-circle p-2"
                    height="30" alt="Avatar" loading="lazy" />
                    <h4 class="p-2"> ${auction.seller.name}</h4>
                 </div>
                   <div class="d-flex mt-5 pt-2 justify-content-between">
                       <div>
                          <p class="display-4">Bids:</p>
                          <p class="display-4">${auction._count.bids}</p>
                        </div>
                        <div>
                          <p class="display-4">Auction ends: </p>
                          <p class="display-4 text-success timer expired">AUCTION ENDED</p>
                         </div>
                    </div>
                 </div>
               </div>
            </a>
          </div>`;
    }
    out.innerHTML = newDivs;

      //Filtrere posts / search input
      const inputField = document.getElementById("filter-auction");
      //console.log(inputField);
      inputField.addEventListener("keyup", filterAuctions);
  
      function filterAuctions () {
          const filterAuctions = inputField.value.toLowerCase();
          //console.log(filterAuctions);
  
          const filtered = collection.filter((auction)=> {
              //console.log(post.author.name, filterPosts);
              //console.log(post.author.name.toUpperCase().indexOf(filterPosts.toUpperCase()) > -1);
              //console.log(collection.length);
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
  
}

  
//Hente create post verdier:
const postTitle = document.getElementById("postTitle");
const postContent = document.getElementById("postContent");
const postMedia = document.getElementById("postMedia");
const creditValue = document.getElementById("creditValue");
const endsBid = document.getElementById("endBid");
const submitPost = document.getElementById("submitPost");
console.log(postTitle, postContent, postMedia, creditValue, endsBid, submitPost);


//Create a new post - method: POST
const createAuction = `${APIurl}${auctionEndpoint}`;


async function createNewAuction (url, data) {
    const title = postTitle.value.trim();
    const description = postContent.value.trim();
    let media = postMedia.value.trim();
    const credit = creditValue.value.trim();
    const endsAt = endsBid.value.trim();
    if (media === "") media = "https://www.pngkey.com/maxpic/u2w7r5y3a9o0w7t4/";

    const auctionData = {
        title: title,
        description: description,
        media: media,
        credit: credit,
        endsAt: endsAt,
       };
    console.log(auctionData);

    try {
        const accessToken = localStorage.getItem('accessToken'); 
        const options = {
            method: 'POST', 
            headers : {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(auctionData),
        };
        console.log("Url:", url,"Data:", auctionData,"Options:", options);

        const response = await fetch(url, options); 
        console.log(response);
        const auction = await response.json();
        //console.log(auction);
    if (response.status === 200) window.location='./index.html';
    } catch(error) {
        console.warn(error);
    }
}

submitPost.addEventListener("click", () => {
       createNewAuction(createAuction);
});


//Hente p taggene for å skrive ut beskjed ved validering
const titleMsg = document.getElementById("titleMsg");
const bodyMsg = document.getElementById("bodyMsg");
const mediaMsg = document.getElementById("mediaMsg");
const creditMsg = document.getElementById("creditMsg");

//console.log(titleMsg, bodyMsg, mediaMsg);

//Validate form 
submitPost.addEventListener('click', validateForm);
function validateForm() {
    const title = postTitle.value.trim();
    const body = postContent.value.trim();
    const media = postMedia.value.trim();

    const submittedTitle = title;
    titleMsg.innerHTML = "";
     if (submittedTitle.length < 1) {
     titleMsg.innerHTML = 'Your title has to be at least 1 or more characters.';
     }
     
     bodyMsg.innerHTML = "";
    const submittedBody = body;
    if (submittedBody.length < 1) {
        bodyMsg.innerHTML = 'Your title has to be at least 1 or more characters.';
    }

    mediaMsg.innerHTML = "";
    const submittedMedia = media;
    if (submittedMedia === "") {
        mediaMsg.innerHTML = 'You must add a real URL';
    }

      if (titleMsg.innerHTML === "" && bodyMsg.innerHTML === "" && mediaMsg.innerHTML === "") {
        //console.log("Form is submitted!");
        //form.submit(); ///for å submitte skjema 
     }
     else {
        console.log("You still have validation errors");
    }
}
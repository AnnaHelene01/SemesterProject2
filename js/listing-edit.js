const loginNav = document.getElementById("login-nav");
const logoutNav = document.getElementById("logout-nav") 
// Checking if user is logged in
   function isLoggedin() {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
        logoutNav.style.display="none";
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
        //console.log("Edit bids:", bids);
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
const editEndBid = document.getElementById("edit-endBid");
const editBtn = document.getElementById("submitEdit");
//console.log("elementer:", welcome, user, editTitle, editContent, editMedia, editEndBid, editBtn);

//LISTE UT
function listBids(bids, out) {
    //console.log("List:", bids);
    editTitle.innerHTML = `${bids.title}`;
    editContent.innerHTML = `${bids.description}`;
    editMedia.innerHTML = `${bids.media}`;
    editEndBid.innerHTML = `${bids.endsAt}`
}



async function updatePost (id) {
    const title = editTitle.value.trim();
    const body = editContent.value.trim();
    let media = editMedia.value.trim();
    if (media === "") media = "https://www.pngkey.com/maxpic/u2w7r5y3a9o0w7t4/";

    const data = {
        title: title,
        body: body,
        media: media,
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
        console.log("Update url, options:", url, options);

        const response = await fetch(url, options); 
        console.log("Update response:", response);
        const answer = await response.json();
        console.log("Update answer:", answer);
        if (response.status === 201) {
            window.location = "../index.html";
          }     } catch(error) {
         console.warn(error);
    }
}

editBtn.addEventListener("click", () => {
    //console.log(id);
    updatePost(id);
    //window.location = `./main.html`;
})



// Preview elements:
let previewContainer = document.getElementById("preview-container");
const previewTitle = document.getElementById("preview-title");
const previewImg = document.getElementById("preview-img");
const previewDescription = document.getElementById("preview-description");

// Preview of creating auction:
editTitle.addEventListener("keyup", preview);
editMedia.addEventListener("keyup", preview);
editContent.addEventListener("keyup", preview)

async function preview() {
  previewContainer.innerHTML = "";
  previewContainer.innerHTML = `
                <div class="col-sm-12">
                  <div class="card mt-5">
                    <img src="${
                        editMedia.value !== ""
                          ? editMedia.value
                          : "../placeholder.png"
                      }" class="card-img-top card-img" alt="..">
           
                      <div class="card-body">
                          <h4 class="card-title">${editTitle.value}</h4>
                          <p id="preview-description" class="display-6">${editContent.value}</p>
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
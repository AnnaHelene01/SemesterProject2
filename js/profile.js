//Legge til brukerens navn
const username = localStorage.getItem('username');
//console.log("User logged in:", welcome);



// Endpoints
const APIurl = " https://api.noroff.dev/api/v1";
const profileEndpoint = `/auction/profiles/${username}?_listings=true`; // POST

const profileUrl = `${APIurl}${profileEndpoint}`;

let collection = [];

async function getMyProfile (url) {
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
        console.log(response);
        const profile = await response.json()
        collection = profile
        console.log("Profil: ", profile)
        console.log("Profil > navn: ", profile.name)
        console.log("Profil > epost: ", profile.email)
        console.log("Collection:", collection);
        listData(collection , outElement)
    } catch(error) {
        console.warn(error);
    }
}   

getMyProfile(profileUrl);


const outElement = document.getElementById("post-container");


//Liste ut mine poster på html siden
function listData(list, out){
    console.log("List: ", list)
    //console.log("Out: ", out)
    out.innerHTML = "";
    let newDivs = "";
        newDivs += `
        <div class="container border p-5">
        <div class="row">
            <div class="col-lg-6 text-center">
                <img src="${list.avatar}" class="img-fluid rounded-circle w-50">
                <div class="col-md-12 form-group display-6 text-start">
                    <p id="avatarMsg"></p>
                    <label for="avatar">Avatar URL</label>
                    <textarea class="form-control form-control-lg" id="updateAvatar" placeholder="Place a avatar URL"></textarea>
                    <div class="text-center">
                        <a href="#"><input type="submit" value="CHANGE AVATAR" class="btn btn-secondary btn-lg px-4 mt-3"></a>
                    </div>
                </div>   
            </div>
            <div class="col-lg-6">
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
            </div>
        </div>
    </div>
        `;

        out.innerHTML = newDivs;
    }
       // if(list.length == 0) {
            //console.log("You have no posts yet!");
         //   const noPostMsg = document.getElementById("noPostMsg");
           // noPostMsg.innerHTML = "You have no posts yet!";
        //}

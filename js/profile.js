//Legge til brukerens navn
const welcome = localStorage.getItem('username');
//console.log("User logged in:", welcome);
const userName = document.getElementById('user-name');

userName.innerHTML = welcome;


// Endpoints
const APIurl = " https://api.noroff.dev/api/v1";
const profileEndpoint = `/auction/profiles/${welcome}?_listings=true`; // POST

const profileUrl = `${APIurl}${profileEndpoint}`;


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
        console.log("Profil: ", profile)
        console.log("Profil > navn: ", profile.name)
        console.log("Profil > epost: ", profile.email)
        document.getElementById("profile-credits").innerHTML = profile.credits
        document.getElementById("profile-email").innerHTML = profile.email
        //console.log("Posts:", profile.posts);
        listData(list, outElement)
    } catch(error) {
        console.warn(error);
    }
}   

getMyProfile(profileUrl);


const outElement = document.getElementById("post-container");

//Liste ut mine poster på html siden
function listData(list, out){
    //console.log("List: ", list)
    //console.log("Out: ", out)
    out.innerHTML = "";
    let newDivs = "";

    for (let user of list) {
console.log("Listing:", user.name);
        newDivs += `
        <div>
        <h1>${user.name}</h1
        </div>
        `;
    }
        out.innerHTML = newDivs;
       // if(list.length == 0) {
            //console.log("You have no posts yet!");
         //   const noPostMsg = document.getElementById("noPostMsg");
           // noPostMsg.innerHTML = "You have no posts yet!";
        //}
}
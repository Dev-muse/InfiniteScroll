

// DOM elements & Objects

const imageContainer = document.querySelector("#image-container");
const loader = document.querySelector("#loader");

//setting up variables for image loading
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

let photosArray = [];






//SET UP API url with accessKey & Parameters to access Unsplash API 

let accessKey = '8Bgc0bVvot1E5FOjl-R9Onga6SXJzIIlTIJZO4r-hYw';
let count =30;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${accessKey}&count=${count}`;


//check if all images were loaded

function imgLoaded(){
    
    imagesLoaded++;
   
    if(imagesLoaded == totalImages){
        ready = true;
        loader.hidden=true;    
    }
};



//Helper function to set attibutes of created DOM ELEMENTS;
function setAttributes(element, attributes){

    for(const key in attributes){
        element.setAttribute(key,attributes[key]);
    }

};



// ==================================================================================================

// Create elements for LINKS & PHOTOS, ADD to DOM;

function displayPhotos(){

    //reset image load counter
    imagesLoaded = 0;
    totalImages = photosArray.length;

    //run forEach() method for each object in photoArray;
    photosArray.forEach((photo)=>{

                //creating an <a> element to link to unsplash
        const linkElement = document.createElement('a');


        //Set attributes for <a> using helper function;
        setAttributes(linkElement,{
            href: photo.links.html,
            target: "_blank",
        });

        

        // create <img> element to display image from API 
        const imgElement = document.createElement('img');
 

        //Set attributes for <img> using helper function;
        setAttributes(imgElement,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
       
        //check if img imgLoaded
        
        imgElement.addEventListener("load",imgLoaded);

        
        //Append <img> to <a> element then append <a> inside <div id="imageContainer"> ;
        linkElement.appendChild(imgElement);
        imageContainer.appendChild(linkElement);

    });
};

// ==============================================================================================


// GET photos from Unsplash API and Display on Page

async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        
        // call function to display photos 

        displayPhotos();



    } catch(error){
     //catch error here
    }
};




//Check to see scroll is near bottom of page, Load more photos if true;

window.addEventListener("scroll",(e)=>{

 if(window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000 && ready){
     getPhotos();
     ready = false;
 }

 
})




// CAll function 

getPhotos();
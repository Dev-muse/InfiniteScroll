'use strict'

// DOM elements & Objects

const imageContainer = document.querySelector("#image-container");
const loader = document.querySelector("#loader");


//Initializing variables for image loading & Photo Array:
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

let isInitialLoad = true;

let photosArray = [];





//SET UP API url with accessKey & Parameters to access Unsplash API 

let initialCount = 5;
let accessKey = '8Bgc0bVvot1E5FOjl-R9Onga6SXJzIIlTIJZO4r-hYw';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${accessKey}&count=${initialCount}`;


//Update API URL with new count

function updateAPIURL(picCount){
    apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}`;
}



//check if all images ARE loaded:

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

// 2) Display PHOTOS Create elements for LINKS & PHOTOS, ADD to DOM;

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


// 1) GET photos from Unsplash API and Display on Page

async function getPhotos(){
    try{

        //retrieve JSON data from API
        const response = await fetch(apiUrl);
        photosArray = await response.json();

        
        // call function to display photos 
        displayPhotos();

        if(isInitialLoad){
            updateAPIURL(30);
            isInitialLoad = false;
        };


    } catch(error){
     //catch error here
    }
};




//Check to see scroll is near bottom of page, Load more photos if true;

window.addEventListener("scroll",()=>{

 if(window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000 && ready){
     getPhotos();

     //reset ready back to false
     ready = false;
 }

 
})




// CAll function 

getPhotos();
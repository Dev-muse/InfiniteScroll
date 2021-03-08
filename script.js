
// DOM elements 

const imageContainer = document.querySelector("#image-container");
const loader = document.querySelector("#loader");


let photosArray = [];

//Helper function to set attibute of created DOM ELEMENTS;

function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key,attributes[key]);
    }

}


// Create elements for LINKS & PHOTOS, ADD to DOM;

function displayPhotos(){
    //run forEach() method for each object in photoArray;
    photosArray.forEach((photo)=>{

        //creating an <a> element to link to unsplash
        const anchorElement = document.createElement('a');


        setAttributes(anchorElement,{
            href: photo.links.html,
            target: "_blank",
        })

        // create <img> element to display image from API 
        const imgElement = document.createElement('img');
   
        setAttributes(imgElement,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })
 
        //put <img> inside <a> element then append both inside <imageContainer> ;
        anchorElement.appendChild(imgElement);
        imageContainer.appendChild(anchorElement);

    });
}




//SET UP data from Unsplash API 

let accessKey = '8Bgc0bVvot1E5FOjl-R9Onga6SXJzIIlTIJZO4r-hYw';
let count =10;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${accessKey}&count=${count}`;




// GET photos from API 

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

// CAll function 

getPhotos();
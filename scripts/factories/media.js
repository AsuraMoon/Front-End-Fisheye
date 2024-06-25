//Create variables use them late on
let mediasFilteredById;
let photographerGlobal;

//Function to get Pics by comparing their photographersID with the ID of all photographers
function findPics(medias, photographer){
    let media = medias.filter(media =>{
        if( photographer.id===media.photographerId){
            return true;
        }
    })
    mediasFilteredById = media;

    return media;
}

//Function to clear names
function transformerNom(nom) {  
    var mots = nom.split(' ');

    for (var i = 0; i < mots.length; i++) {
      if (i == mots.length - 1) {
        mots[i] = '';
      }
    }  
    nom = mots.join(' ').trim();

    return nom;
}

//Function to get photographers by comparing all photographers ID with the ID in the URL
function findPhotographers(photographers){
    const locationSearch = new URLSearchParams(location.search);
    const id = locationSearch.get('id');
    let photographer = photographers.find(photographer => +id===photographer.id);

    photographerGlobal = photographer;

    return photographer;
}  

//Function to totalise all like
function totaliseLikes(pics) {
    return pics.reduce((total, pic) => total + pic.likes, 0);
}




//Function to filter all medias on the personnal's photographers page
function triSwitch(media, key , photographer){
    switch(key){
        case 'likes':
            //Call function to filter by likes
            media.sort((a,b)=> b.likes-a.likes);
            
            //Call function to redisplay the Medias
            displayMedia(media, photographer.name);

            //Call function to recreate the array of Medias
            time();

            break;
        case 'title':
            //Call function to filter by names
            media.sort((a,b)=>{
                if (a.title<b.title){
                    return -1;
                }
                    return 1;
            });

            //Call function to redisplay the Medias
            displayMedia(media, photographer.name);

            //Call function to recreate the array of Medias
            time();
            
            break;
        case 'date':
            //Call function to filter by dates
            media.sort((a,b)=> new Date(b.date)-new Date(a.date));

            //Call function to redisplay the Medias
            displayMedia(media, photographer.name);

            //Call function to recreate the array of Medias
            time();

            break;
        default:
            //Call function to filter by dates
            media.sort((a,b)=> new Date(b.date)-new Date(a.date));

            //Call function to redisplay the Medias
            displayMedia(media, photographer.name);

            //Call function to recreate the array of Medias
            time();

            return;
    }
}

//Call function to create the box of medias
function getMediaCardLikesDOM(){
    const article = document.createElement ('article');
    const likeCount = document.createElement('h3');
    const likeCountNumber = document.createElement('span');
    const likeCountIcons = document.createElement('i');

    article.classList.add('like_article');
    likeCountNumber.textContent = totalLikes + " ";
    likeCountIcons.classList.add("fas");
    likeCountIcons.classList.add("fa-heart");
    
    likeCount.appendChild(likeCountNumber);
    likeCount.appendChild(likeCountIcons);
}

// Hide the default filter
function toHide(){
    document.getElementById('hide').style.display = 'none';
}

//Call function to create the medias
function mediaFactory({ title, image, video, likes }, name) {

    const nameModified = transformerNom(name);
    const mediaPath = `assets/photographers/${nameModified}/${image}`;
    const videoPath = `assets/photographers/${nameModified}/${video}`;

    function getMediaCardDOM() {     
        const article = document.createElement( 'article' );
        
        const mediaLink = document.createElement( 'div' );
        mediaLink.setAttribute("tabindex", "0");
        mediaLink.classList.add('media_link');

        //Call to check if the medias is a video or a pic
        if ( video ){
            const videoRender = document.createElement('video');
            const videoPlay = document.createElement('i');
            const videoPreview = document.createElement('source');

            videoPlay.classList.add("fas");
            videoPlay.classList.add("fa-play-circle");
            videoRender.classList.add("videoMedia");
            
            videoPreview.setAttribute("src", videoPath);
            videoPreview.setAttribute('type', "video/mp4");
            videoRender.setAttribute("alt", video);
            videoRender.setAttribute("aria-label", video);
            videoRender.appendChild(videoPreview);
            mediaLink.appendChild(videoRender);
            mediaLink.appendChild(videoPlay);
        }
        else{
            const mediaRender = document.createElement( 'img' );

            mediaRender.classList.add("imgMedia");
            mediaRender.setAttribute("src", mediaPath);
            mediaRender.setAttribute("alt", image);
            mediaLink.appendChild(mediaRender);
        }
        
        const mediaDescription = document.createElement('footer');
        const mediaTitle = document.createElement('h3');
        const mediaLikes = document.createElement('h3');
        const mediaLikesIcons = document.createElement('i');
        const mediaLikesNumber = document.createElement('span');

        mediaDescription.classList.add('media_description');        
        mediaTitle.textContent = title;        
        mediaLikes.classList.add('add_like');
        mediaLikesIcons.classList.add("fas");
        mediaLikesIcons.classList.add("fa-heart");
        mediaLikesNumber.textContent = likes + " ";
        mediaLikes.setAttribute("tabindex", "0");

        
        mediaLikes.appendChild(mediaLikesNumber);
        mediaLikes.appendChild(mediaLikesIcons);        
        mediaDescription.appendChild(mediaTitle);
        mediaDescription.appendChild(mediaLikes);        
        article.appendChild(mediaLink);
        article.appendChild(mediaDescription);
        
        mediaLikes.addEventListener("keydown", e => {
            if (e.key === 'Enter'){
                if (mediaLikes.classList.contains("liked")){

                    mediaLikesNumber.textContent= +mediaLikesNumber.textContent-1 +  " ";
                    mediaLikes.classList.remove("liked");
    
                    likeCountNumber.textContent = +likeCountNumber.textContent-1 + ' ' ;
                }
                else{
                    
                    mediaLikesNumber.textContent= +mediaLikesNumber.textContent+1 +  " ";
                    mediaLikes.classList.add("liked");
    
                    likeCountNumber.textContent = +likeCountNumber.textContent+1 + ' ' ;
                }
            }
        })

        mediaLikes.addEventListener("click", function(){
            if (mediaLikes.classList.contains("liked")){

                mediaLikesNumber.textContent= +mediaLikesNumber.textContent-1 +  " ";
                mediaLikes.classList.remove("liked");

                likeCountNumber.textContent = +likeCountNumber.textContent-1 + ' ' ;
            }
            else{
                
                mediaLikesNumber.textContent= +mediaLikesNumber.textContent+1 +  " ";
                mediaLikes.classList.add("liked");

                likeCountNumber.textContent = +likeCountNumber.textContent+1 + ' ' ;
            }
        })

        return article;
    }
    return { getMediaCardDOM };
}


let select = document.getElementById("caseSelect");

//Call to check the wanted filter
select.addEventListener("change", function(){
    let key = select.value;

    triSwitch(mediasFilteredById, key, photographerGlobal);    
})
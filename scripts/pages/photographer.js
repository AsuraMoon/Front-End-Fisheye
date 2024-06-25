// Position of totalise like
window.addEventListener('scroll', function() {
    let scrollPosition = window.scrollY;
    let windowHeight = window.innerHeight;
    let div = document.querySelector('.like_div');
    let divHeight = div.offsetHeight;
    let maxScroll = divHeight - windowHeight;

    if (scrollPosition > maxScroll) {
      div.style.position = 'fixed';
      div.style.bottom = 0;
    } 
    else {
      div.style.position = 'absolute';
      div.style.top = scrollPosition + 'px';
    }
  });

  // DOM of totalise like
  let totalLikes;
  let likeCountNumber;
  async function displayTotalLike(pics, photographer) {

    const likeDiv = document.createElement('section');
    const likeCount = document.createElement('h3');    
    const likeCountIcons = document.createElement('i');
    const priceDiv = document.createElement('div');    
    const priceLabel = document.createElement('h3');
    const priceText = document.createTextNode(`${photographer.price}€ / jour`);

    likeCountNumber = document.createElement('span');

    totalLikes = totaliseLikes(pics);

    likeCountNumber.textContent = `` ;
    likeDiv.classList.add('like_div');
    likeCountNumber.textContent = `${totalLikes} ` ;
    likeCountNumber.classList.add("count_like");
    likeCountIcons.classList.add("fas");
    likeCountIcons.classList.add("fa-heart");
    
    likeCount.appendChild(likeCountNumber);
    likeCount.appendChild(likeCountIcons);
    priceLabel.appendChild(priceText);
    priceDiv.appendChild(priceLabel);
    likeDiv.appendChild(likeCount);
    likeDiv.appendChild(priceDiv);
    document.body.appendChild(likeDiv);   
  }
// DOM of each media in array Medias
async function displayMedia(media, name) {
    const mediaSection = document.querySelector(".media_section");

    mediaSection.innerHTML = '';

    media.forEach((media) => {
        const mediaModel = mediaFactory(media, name);
        const usermediaDOM = mediaModel.getMediaCardDOM();
        
        mediaSection.appendChild(usermediaDOM);
    });
}

let photographerMedia;

// Wait and call all fonction about Medias on the photographers page
async function init()  {
  const result = await fetch("data/photographers.json");
  const {photographers, media:medias} = await result.json();
  const photographer = findPhotographers(photographers);

  photographerMedia = findPics(medias, photographer);

  displayStatPhotographer(photographer);
  displayPortraitPhotographer(photographer);
  displayTotalLike(photographerMedia, photographer);
  displayMedia(photographerMedia, photographer.name);
  time();
};
init();

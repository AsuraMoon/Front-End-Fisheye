// Wait loading complete of the DOM


function time() {setTimeout(() => {
  const arrMedias = document.querySelectorAll('.media_link');
    
  arrMedias.forEach((media, i) => {    
    media.addEventListener('keydown', e => {
      if(e.key == 'Enter'){
        let childMedia = e.currentTarget.childNodes[0];
        let src = childMedia.src || childMedia.childNodes[0].src;
        openLightbox(src, i, childMedia, arrMedias);
      }
    });
    media.addEventListener('click', e => {      
      let childMedia = e.currentTarget.childNodes[0];
      let src = childMedia.src || childMedia.childNodes[0].src;
      openLightbox(src, i, childMedia, arrMedias);
    });
  }); 
},1000);}


// Create variables lightbox in the DOM
const lightbox = document.createElement('div');  
const closeButton = document.createElement('i');
const img = document.createElement('img');
const video = document.createElement('video');
const videoSrc = document.createElement('source');
const prevButton = document.createElement('i');
const nextButton = document.createElement('i');

// Create fonction to lightbox in the DOM at the click on one media
function openLightbox(src, i, childMedia, arrMedias) {
  img.setAttribute("src", src);
  video.setAttribute('controls', true);
  videoSrc.setAttribute("src", src);
  videoSrc.setAttribute('type', "video/mp4");

  if (childMedia.tagName === img.tagName){
    lightbox.appendChild(img);
  }
  else{
    lightbox.appendChild(video);
    video.appendChild(videoSrc);
  }  

  lightbox.appendChild(closeButton);

  lightbox.classList.add('lightbox');
  closeButton.classList.add('fas', 'fa-times', 'lightbox_close');

  // Clearing lightbox at the closing
  closeButton.addEventListener('click', e => {
    close(lightbox);
  });

  window.addEventListener("keydown", e => {
    if (e.key === 'Escape'){
      close(lightbox);
    }
  });

  function close(lightbox){
    lightbox.removeChild(lightbox.firstChild);

    lightbox.style.display = 'none';
  }

  document.body.appendChild(lightbox);

  lightbox.style.display = 'flex';

  displayArrows(i, lightbox, src, childMedia, arrMedias);
}

// Create fonction to switch between media without leaving the Lightbox
function displayArrows(i, lightbox, src, childMedia, arrMedias){
  let count = 0;
  let idx;

  prevButton.classList.add('fas', 'fa-chevron-left', 'lightbox_prev');
  nextButton.classList.add('fas', 'fa-chevron-right', 'lightbox_next');

  // Verify boudaries at their creation
  if(i === 0){
    prevButton.style.display = 'none';
  }
  if(i >= arrMedias.length-1){
    nextButton.style.display = 'none';
  }

  // Create fonction to verify boudaries
  function boundaries(arrMedias, idx, e){
    if(idx === 0){
      prevButton.style.display = 'none';
    }
    else{
      prevButton.style.display = 'inline-block';
    }
    
    if(idx >= arrMedias.length-1){
      nextButton.style.display = 'none';
    }
    else{
      nextButton.style.display = 'inline-block';
    }
  }
  
function prev(lightbox){
  count = count - 1;
  idx = i + count;
  childMedia = arrMedias[idx].childNodes[0];

  boundaries(arrMedias, idx);

  if (childMedia.tagName === video.tagName){
    // Clearing in case they're not the same type
    lightbox.removeChild(lightbox.firstChild);

    lightbox.insertBefore(video, lightbox.firstChild);
    video.appendChild(videoSrc);

    src = childMedia.childNodes[0].src;

    video.setAttribute('controls', true);
    videoSrc.setAttribute("src", src);
    videoSrc.setAttribute('type', "video/mp4");
  }
  else{
    // Clearing in case they're not the same type
    lightbox.removeChild(lightbox.firstChild);

    lightbox.insertBefore(img, lightbox.firstChild);
    
    src = childMedia.src;

    img.setAttribute("src", src);
  }
};

function next(lightbox){
  count = count + 1;
  idx = i + count;
  childMedia = arrMedias[idx].childNodes[0];

  boundaries(arrMedias, idx);

  if (childMedia.tagName === video.tagName){
    // Clearing in case they're not the same type
    lightbox.removeChild(lightbox.firstChild);

    lightbox.insertBefore(video, lightbox.firstChild);
    video.appendChild(videoSrc);

    src = childMedia.childNodes[0].src;

    video.setAttribute('controls', true);
    videoSrc.setAttribute("src", src);
    videoSrc.setAttribute('type', "video/mp4");
  }
  else{
    // Clearing in case they're not the same type
    lightbox.removeChild(lightbox.firstChild);

    lightbox.insertBefore(img, lightbox.firstChild);

    src = childMedia.src;

    img.setAttribute("src", src);
  }
}

  // On click to previous
  prevButton.addEventListener('click', e => {
    prev(lightbox);
  });
  lightbox.appendChild(prevButton);
  
  // On click to next
  nextButton.addEventListener('click', e => {
    next(lightbox);
  });
  lightbox.appendChild(nextButton);

  // On keyboard previous
  window.addEventListener("keydown", (e)=> {
    if(e.key == 'ArrowLeft'){
      prev(lightbox);
    }
    if(e.key == 'ArrowRight'){
      next(lightbox);
    }

  });
};
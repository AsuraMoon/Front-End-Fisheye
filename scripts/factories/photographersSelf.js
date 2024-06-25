const statColumnName = document.createElement('h2');
const statColumnLocation = document.createElement('h3');
const statColumntagline = document.createElement('h4');
const portraitColumnPics = document.createElement('img');

function displayStatPhotographer(data){  
    const { name, tagline, city, country } = data;
    const statColumn = document.querySelector('#stat_column');
    
    statColumnName.textContent = name;
    statColumnLocation.textContent = `${city}, ${country}`;
    statColumntagline.textContent = tagline;

    statColumn.appendChild(statColumnName);
    statColumn.appendChild(statColumnLocation);
    statColumn.appendChild(statColumntagline);
}

function displayPortraitPhotographer(data){  
    const { portrait, name } = data;
    const picture = `assets/photographers/PhotographersID/${portrait}`;

    const portraitColumn = document.querySelector('#portrait_column');
    
    portraitColumnPics.setAttribute("src", picture);
    portraitColumnPics.setAttribute("alt", name);
    portraitColumn.appendChild(portraitColumnPics);
}

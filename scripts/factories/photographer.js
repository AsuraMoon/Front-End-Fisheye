//Call function to create the box of photographers
function photographerFactory(data) {
    const { name, portrait, tagline, price, city, country, id} = data;
    const picture = `assets/photographers/PhotographersID/${portrait}`;
    const url = `photographer.html`;

    //Call function to create the photographers
    function getUserCardDOM() {        
        const article = document.createElement( 'article' );
        const photographerLink = document.createElement( 'div' );
        
        photographerLink.classList.add('photographer_link');
        photographerLink.addEventListener('click', ()=>{
            location.href=`${url}?id=${id}`;
        });
        
        const photographerPortrait = document.createElement( 'img' );
        const photographerName = document.createElement( 'h2' );
        const photographerLocation = document.createElement('h3');
        const photographerTagline = document.createElement('h4');
        const photographerPrice = document.createElement('h5');
        
        photographerPortrait.setAttribute("tabindex", "0");
        photographerPortrait.setAttribute("src", picture);
        photographerPortrait.setAttribute("alt", name);
        photographerName.setAttribute("alt", name);

        photographerName.textContent = name;
        photographerLocation.textContent = city + ", "+ country;
        photographerTagline.textContent = tagline;
        photographerPrice.textContent = price + "€/jour";
        
        photographerLink.appendChild(photographerPortrait);
        photographerLink.appendChild(photographerName);
        article.appendChild(photographerLink);
        article.appendChild(photographerLocation);
        article.appendChild(photographerTagline);
        article.appendChild(photographerPrice);

        return (article);
    }
    return { getUserCardDOM }
}
//Get array of photographers
async function getPhotographers() {
    return ({
        photographers: [...photographers]})
}

//Get data inside the array of photographers
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();

        userCardDOM.addEventListener('keydown', e => {
            if(e.key == 'Enter'){;
              let target = userCardDOM.firstChild;
              target.click();
            }
          });

        photographersSection.appendChild(userCardDOM);
    });
};

//Get and Fetch data from the json
async function init() {        
    const result = await fetch("data/photographers.json");
    const {photographers} = await result.json();

    displayData(photographers);
};
init();


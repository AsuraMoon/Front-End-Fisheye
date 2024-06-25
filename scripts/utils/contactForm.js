// Form
const form = document.querySelector("#formData");
// All form Lines
const formData = document.querySelectorAll(".formData");

function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
  }

function displayRemerciementModal() {
    const modal = document.getElementById("remerciement");
	modal.style.display = "block";
}

function closeRemerciementModal() {
    const modal = document.getElementById("remerciement");
    modal.style.display = "none";
}

form.addEventListener("submit", function(e){
  
    e.preventDefault();
    //Regex verify input
    const verifWordFirst = /[a-z]{3,}/gi;
    const verifWordLast = /[a-z]{3,}/gi;    
    const verifMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    let totalValidation = true;    
    let first = document.getElementById("first");
    let firstValue = first.value;    
    let last = document.getElementById("last");
    let lastValue = last.value;    
    let email = document.getElementById("email");
    let emailValue = email.value;
    let message = document.getElementById("message");
    let messageValue = message.value;
    let firstValueVerif = verifWordFirst.test(firstValue);
    let lastValueVerif = verifWordLast.test(lastValue);   
    let emailValueVerif = verifMail.test(emailValue);
    
    if (!firstValueVerif){
      first.parentNode.setAttribute("data-error-visible",true);
      first.parentNode.setAttribute("data-error","Veuillez remplir le champ avec un prénom valide s'il vous plaît");

      totalValidation=false;
    }
    else {
      first.parentNode.setAttribute("data-error-visible",false);
    }

    if (!lastValueVerif){
      last.parentNode.setAttribute("data-error-visible",true);
      last.parentNode.setAttribute("data-error","Veuillez remplir le champ avec un nom valide");

      totalValidation=false;
    }
    else {
      last.parentNode.setAttribute("data-error-visible",false);
    }

    if (!emailValueVerif){
      email.parentNode.setAttribute("data-error-visible",true);
      email.parentNode.setAttribute("data-error","Veuillez remplir le champ avec un email valide");

      totalValidation=false;
    }
    else {
      email.parentNode.setAttribute("data-error-visible",false);
    }
    
    if (messageValue.trim() == ""){
      message.parentNode.setAttribute("data-error-visible",true);
      message.parentNode.setAttribute("data-error","Veuillez remplir le champ avec une date de naissance valide");

      totalValidation=false;
    }
    else {
        message.parentNode.setAttribute("data-error-visible",false);
    }

    if (totalValidation){
        console.log("Nom Complet =",firstValue, lastValue);
        console.log("Mail =",emailValue);
        console.log("Message =",messageValue);
        closeModal();
        form.reset();
        displayRemerciementModal();
    };
});

window.addEventListener("keydown", e => {
  if (e.key === 'Escape'){
    closeModal();
    closeRemerciementModal();
  }
})

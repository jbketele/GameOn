function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeCross = document.querySelector(".close");
const formData = document.querySelectorAll(".formData");
const form = document.querySelector("form");
const modalBdy = document.querySelector(".modal-body");
const firstname = document.getElementById("first");
const lastname = document.getElementById("last");
const email = document.getElementById("email");
const birth = document.getElementById("birthdate");
const quantityField = document.getElementById("quantity");
const locationRadios = document.querySelectorAll('input[name="location"]');
const termsCheckbox = document.getElementById("checkbox1");
const notificationsCheckbox = document.getElementById("checkbox2");


// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  window.scrollTo({ top: 0 })
}

//Fermer le modal
closeCross.addEventListener("click", closeModal);

function closeModal() {
  modalbg.style.removeProperty("display");
}

// Fonction pour valider le formulaire
form.addEventListener("submit", (event) => {
  event.preventDefault();

  let isValid = true;
  clearErrors();

  // Vérification du champ "Nom"
  if (lastname.value.length < 2) {
    displayError(lastname, "Veuillez entrer au moins 2 caractères.");
    isValid = false;
  }

  // Vérification du champ "Prénom"
  if (firstname.value.length < 2) {
    displayError(firstname, "Veuillez entrer au moins 2 caractères.");
    isValid = false;
  }

  // Vérification du champ "Email" avec une expression régulière simple
  if (!validateEmail(email.value)) {
    displayError(email, "Veuillez entrer une adresse email valide.");
    isValid = false;
  }

  // Vérification du champ "Date de naissance"
  if (birth.value === "") {
    displayError(birth, "Veuillez entrer votre date de naissance.");
    isValid = false;
  }

  // Vérification du champ 'quantity' pour un nombre entre 0 et 99
  const quantityValue = quantityField.value.trim();
  if (quantityValue === "") {
    displayError(quantityField, "Veuillez entrer un nombre valide entre 0 et 99");
    isValid = false;
  } else if (!isValidNumber(quantityValue)) {
    displayError(quantityField, "Veuillez entrer un nombre valide entre 0 et 99");
    isValid = false;
  }


  // Vérification qu'une localisation a été sélectionnée
  const selectedLocation = Array.from(locationRadios).some(radio => radio.checked);
  if (!selectedLocation) {
    displayError(locationRadios[0].parentElement, "Veuillez sélectionner une option");
    isValid = false;
  }

  // Vérification de la case des conditions générales
  if (!termsCheckbox.checked) {
    displayError(termsCheckbox.parentElement, "Vous devez accepter les conditions générales.");
    isValid = false;
  }

  // Afficher un message de succès si toutes les validations sont passées
  if (isValid) {
    form.classList.add("success-form")
    const validate = document.createElement("div");
    validate.classList.add("success")
    const validateTxt = document.createElement("p");
    validateTxt.textContent = "Merci pour votre inscription !";
    validateTxt.classList.add("success-message");
    modalBdy.appendChild(validate);
    validate.appendChild(validateTxt);
  }
});

// Fonction pour afficher un message d'erreur
function displayError(element, message) {
  const error = document.createElement("p");
  error.textContent = message;
  error.classList.add("error-message");
  element.parentElement.appendChild(error);
}

// Fonction pour effacer les messages d'erreur avant chaque validation
function clearErrors() {
  const errors = document.querySelectorAll(".error-message");
  errors.forEach((error) => error.remove());
}

// Fonction pour valider le format de l'e-mail
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidNumber(value) {
  const number = Number(value);
  return !isNaN(number) && number >= 0 && number <= 99;
}


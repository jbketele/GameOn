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

  const validations = [
    {
      field: lastname,
      condition: () => lastname.value.length >= 2,
      errorMessage: "Veuillez entrer au moins 2 caractères."
    },
    {
      field: firstname,
      condition: () => firstname.value.length >= 2,
      errorMessage: "Veuillez entrer au moins 2 caractères."
    },
    {
      field: email,
      condition: () => validateEmail(email.value),
      errorMessage: "Veuillez entrer une adresse email valide."
    },
    {
      field: birth,
      condition: () => {
        const today = new Date();
        const birthDate = new Date(birth.value);
        return birth.value !== "" && birthDate <= today;
      },
      errorMessage: "Veuillez entrer une date de naissance."
    },
    {
      field: quantityField,
      condition: () => {
        const quantityValue = quantityField.value.trim();
        return quantityValue !== "" && isValidNumber(quantityValue);
      },
      errorMessage: "Veuillez entrer un nombre entre 0 et 99."
    },
    {
      field: locationRadios,
      condition: () => Array.from(locationRadios).some(radio => radio.checked),
      errorMessage: "Veuillez sélectionner une localisation."
    },
    {
      field: termsCheckbox,
      condition: () => termsCheckbox.checked,
      errorMessage: "Vous devez accepter les conditions générales."
    },
    {
      field: notificationsCheckbox,
      condition: () => notificationsCheckbox.checked,
      errorMessage: "Veuillez accepter de recevoir des notifications si vous souhaitez les recevoir."
    },
  ];

  validations.forEach(({ field, condition, errorMessage }) => {
    isValid &= validateField(field, condition(), errorMessage);
  });

  // Fonction pour valider le format de l'e-mail
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
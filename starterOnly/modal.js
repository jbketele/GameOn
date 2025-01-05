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
const form = document.querySelector("form");
const modalBdy = document.querySelector(".modal-body");

// Form fields
const firstname = document.getElementById("first");
const lastname = document.getElementById("last");
const email = document.getElementById("email");
const birth = document.getElementById("birthdate");
const quantityField = document.getElementById("quantity");
const locationRadios = document.querySelectorAll('input[name="location"]');
const termsCheckbox = document.getElementById("checkbox1");


// Launch modal
modalBtn.forEach((btn) => btn.addEventListener("click", () => {
  modalbg.style.display = "block";
  window.scrollTo({ top: 0 });
}));

// Close modal
closeCross.addEventListener("click", () => {
  modalbg.style.display = "none";

  // Vérifie si le formulaire a été validé
  if (form.classList.contains("success-form")) {
    form.classList.remove("success-form"); // Supprime l'indicateur de validation
    modalBdy.querySelectorAll(".success").forEach((success) => success.remove()); // Supprime le message de succès
    form.reset();
  }
});



// Fonction pour valider le format de l'e-mail
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Fonction pour vérifier si un nombre est valide (entre 0 et 99)
function isValidNumber(value) {
  const num = parseInt(value, 10);
  return num >= 0 && num <= 99;
}


// Fonction pour afficher un message d'erreur
function displayError(element, message) {
  const parentElement = element.closest('.formData');
  let error = parentElement.querySelector(".error-message");
  if (!error) {
    error = document.createElement("p");
    error.classList.add("error-message");
    parentElement.appendChild(error);
  }
  error.textContent = message;
}

// Fonction pour supprimer les messages d'erreur
function removeError(element) {
  const parentElement = element.closest('.formData');
  const error = parentElement.querySelector(".error-message");
  if (error) {
    error.remove();
  }
}


// Écouteur d'événement pour le formulaire
form.addEventListener("submit", (event) => {
  event.preventDefault();

  let isValid = true;

  // Validation des champs
  const validations = [
    {
      field: firstname,
      valid: firstname.value.trim().length >= 2,
      message: "Veuillez entrer au moins 2 caractères."
    },
    {
      field: lastname,
      valid: lastname.value.trim().length >= 2,
      message: "Veuillez entrer au moins 2 caractères."
    },
    {
      field: email,
      valid: validateEmail(email.value),
      message: "Veuillez entrer une adresse email valide."
    },
    {
      field: birth,
      valid: function () {
        removeError(birth);

        if (!birth.value) {
          displayError(birth, "Veuillez entrer une date de naissance valide.");
          return false;
        }

        const birthDate = new Date(birth.value);
        const today = new Date();

        if (birthDate > today) {
          displayError(birth, "La date de naissance doit être dans le passé.");
          return false;
        }
        return true;
      },
      message: ""
    },

    {
      field: quantityField,
      valid: isValidNumber(quantityField.value.trim()),
      message: "Veuillez entrer un nombre entre 0 et 99."
    },
    {
      field: locationRadios[0],
      valid: Array.from(locationRadios).some((radio) => radio.checked),
      message: "Veuillez sélectionner une localisation."
    },
    {
      field: termsCheckbox,
      valid: termsCheckbox.checked,
      message: "Vous devez accepter les conditions générales."
    },
  ];

  // Validations de chaque formulaire
  validations.forEach(({ field, valid, message }) => {
    const isFieldValid = typeof valid === "function" ? valid() : valid; //Validation avec une fonction
    if (!isFieldValid) {
      if (message) {
        displayError(field, message);
      }
      isValid = false;
    } else {
      removeError(field);
    }
  });



  // Afficher un message de succès si toutes les validations sont passées
  if (isValid) {
    form.classList.add("success-form");
    const validate = document.createElement("div");
    validate.classList.add("success");
    const validateTxt = document.createElement("p");
    validateTxt.textContent = "Merci pour votre inscription !";
    validateTxt.classList.add("success-message");
    modalBdy.appendChild(validate);
    validate.appendChild(validateTxt);
    form.reset();
  }
});

//Enlever les messages d'erreur lors de la correction
[firstname, lastname, email, birth, quantityField].forEach((field) => {
  field.addEventListener("input", () => removeError(field));
});

//Suppression du message d'erreur quand une case est cochée
locationRadios.forEach((radio) => {
  radio.addEventListener("change", () => removeError(locationRadios[0]));
});

termsCheckbox.addEventListener("change", () => removeError(termsCheckbox));
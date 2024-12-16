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

// Fonction pour effacer les messages d'erreur avant chaque validation
function clearErrors() {
  const errors = document.querySelectorAll(".error-message");
  errors.forEach((error) => error.remove());
}

// Fonction pour afficher un message d'erreur
function displayError(element, message) {
  if (!(element instanceof HTMLElement)) {
    console.error("L'élément fourni n'est pas un élément DOM :", element);
    return;
  }

  const parentElement = element.closest('.formData');
  if (!parentElement) {
    console.error("Élément parent introuvable pour :", element);
    return;
  }

  const error = document.createElement("p");
  error.textContent = message;
  error.classList.add("error-message");
  parentElement.appendChild(error);
}


// Écouteur d'événement pour le formulaire
form.addEventListener("submit", (event) => {
  event.preventDefault();

  let isValid = true;
  clearErrors();

  // Validation des champs
  const validations = [
    {
      field: lastname,
      condition: function () { lastname.value.length >= 2; },
      errorMessage: "Veuillez entrer au moins 2 caractères."
    },
    {
      field: firstname,
      condition: function () { firstname.value.length >= 2; },
      errorMessage: "Veuillez entrer au moins 2 caractères."
    },
    {
      field: email,
      condition: function () { validateEmail(email.value); },
      errorMessage: "Veuillez entrer une adresse email valide."
    },
    {
      field: birth,
      condition: () => {
        const today = new Date();
        const birthDate = new Date(birth.value);

        if (birthDate === "") {
          displayError(birth, "Veuillez entrer une date de naissance.")
        }
        if (birthDate > today) {
          displayError(birth, "La date de naissance doit être dans le passé.")
        }
        //return birth.value !== "" && birthDate <= today;
      },
      errorMessage: "Veuillez entrer une date de naissance."
    },
    {
      field: quantityField,
      condition: function () {
        const quantityValue = quantityField.value.trim();
        return quantityValue !== "" && isValidNumber(quantityValue);
      },
      errorMessage: "Veuillez entrer un nombre entre 0 et 99."
    },
    {
      field: locationRadios,
      condition: function () {
        const locationSelected = Array.from(locationRadios).some(function (radio) {
          return radio.checked;
        });

        if (!locationSelected) {
          // Si aucun radio n'est sélectionné, on applique l'erreur à un élément parent
          const parentElement = locationRadios[0].closest('.formData');
          if (parentElement) {
            displayError(parentElement, "Veuillez sélectionner une localisation.");
          } else {
            console.error("Élément parent introuvable pour les boutons radio.");
          }
          return false; // Condition échouée
        }

        return true; // Condition réussie
      }
    },
    {
      field: termsCheckbox,
      condition: function () { termsCheckbox.checked; },
      errorMessage: "Vous devez accepter les conditions générales."
    },
    {
      field: notificationsCheckbox,
      condition: function () { notificationsCheckbox.checked; },
      errorMessage: "Veuillez accepter de recevoir des notifications si vous souhaitez les recevoir."
    },
  ];

  validations.forEach(function (validation) {
    const field = validation.field;

    // Vérification avancée
    if (!field || (field instanceof NodeList && field.length === 0)) {
      console.error("Champ de formulaire introuvable :", field);
      return;
    }

    if (!validation.condition()) {
      isValid = false;

      // Gestion des NodeList
      if (field instanceof NodeList) {
        displayError(field[0], validation.errorMessage); // Utilisez le premier élément de la liste
      } else {
        displayError(field, validation.errorMessage);
      }
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
  }
});

// inputs
const formEl = document.getElementById("form");
const userNameEl = document.getElementById("usernameEl");
const cardNumber = document.getElementById("card-iban");
const cvcEl = document.getElementById("cvc");
const submitBtn = document.getElementById("submitBtn");

submitBtn.disabled = true;

// DOM elements
const cardholderNameEl = document.getElementById("cardholder-name");
const dateEl = document.getElementById("date");
const cardIbanEl = document.getElementById("card-number");
const cvcNumber = document.getElementById("cvc-number");

// validations for fields
let cardHolderFormFilled = false;
let ibanFieldFilled = false;
let cvcFilled = false;

// checking divs
const inputCheckEl = document.getElementById("check");
const ibanCheckEl = document.getElementById("card-iban-check");
const cvcNumberEl = document.getElementById("cvcEl");

userNameEl.addEventListener("blur", () => {
  let str = userNameEl.value;
  let regex = /^[a-zA-Z]([a-zA-Z]){0,10}/;

  if (regex.test(str)) {
    userNameEl.classList.add("is-valid");
    userNameEl.classList.remove("is-invalid");
    inputCheckEl.classList.add("valid-feedback");
    inputCheckEl.classList.remove("invalid-feedback");
    inputCheckEl.textContent = "All Set";
    cardHolderFormFilled = true;
  } else {
    userNameEl.classList.remove("is-valid");
    userNameEl.classList.add("is-invalid");
    inputCheckEl.classList.remove("valid-feedback");
    inputCheckEl.classList.add("invalid-feedback");
    inputCheckEl.textContent = "Please choose a valid username.";
    cardHolderFormFilled = false;
  }
});

cardNumber.addEventListener("click", () => {
  let str = cardNumber.value;
  let regex = /^([0-9]{4}[\s-]?){3}([0-9]{4})$/;

  if (regex.test(str)) {
    cardNumber.classList.add("is-valid");
    cardNumber.classList.remove("is-invalid");
    ibanCheckEl.classList.add("valid-feedback");
    ibanCheckEl.classList.remove("invalid-feedback");
    ibanCheckEl.textContent = "All Set";
    ibanFieldFilled = true;
  } else {
    cardNumber.classList.remove("is-valid");
    cardNumber.classList.add("is-invalid");
    ibanCheckEl.classList.remove("valid-feedback");
    ibanCheckEl.classList.add("invalid-feedback");
    ibanCheckEl.textContent =
      "digits must be 16 characters long with no whitespaces";
    ibanFieldFilled = false;
  }
});

cvcEl.addEventListener("blur", () => {
  let str = cvcEl.value;
  let regex = /^[0-9]{3,4}$/;

  if (regex.test(str)) {
    cvcEl.classList.add("is-valid");
    cvcEl.classList.remove("is-invalid");
    cvcNumberEl.classList.add("valid-feedback");
    cvcNumberEl.classList.remove("invalid-feedback");
    cvcNumberEl.textContent = "All Set";
    cvcFilled = true;
    submitBtn.disabled = false;
  } else {
    cvcEl.classList.remove("is-valid");
    cvcEl.classList.add("is-invalid");
    cvcNumberEl.classList.remove("valid-feedback");
    cvcNumberEl.classList.add("invalid-feedback");
    cvcNumberEl.textContent = "digits must be 3 or 4 characters long";
    cvcFilled = false;
  }
});

formEl.addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();
  const { cardHolderName, cardNumber, cvc, date } = e.target;
  let cardHolderValue = cardHolderName.value;
  let cardNumberValue = cardNumber.value;
  let cvcValue = cvc.value;
  let dateValue = date.value;

  if (cardHolderFormFilled && ibanFieldFilled && cvcFilled) {
    cardIbanEl.textContent = cardNumberValue;
    cardholderNameEl.textContent = cardHolderValue;
    dateEl.textContent = dateValue;
    cvcNumber.textContent = cvcValue;

    formEl.innerHTML = `
     <div class='success-container'>
      <img src='./images/icon-complete.svg'>
       <h2>Thank You</h2>
        <p>we have added your card details</p>
        <button class='btn btn-primary successBtn'>Continue</button>
     </div>
    `;

    setTimeout(() => {
      formEl.innerHTML = `
     <label for="cardholdername">Card Holder Name</label>
     <input id="usernameEl" type="text" name="cardHolderName" placeholder="e.g. Faraz Ahmed"  />
     <div id="check" class="valid-feedback">
       Please choose a username.
     </div>
     <label for="cardnumber">Card Number</label>
     <input id="card-iban" type="text" name="cardNumber" placeholder=" e.g. 1234-5678 9123 4567" />
     <div id="card-iban-check" class="valid-feedback">
     </div>
     <label for="expiry-date">Exp. Date (MM/YY)</label>
     <input type="date" name="date" id="date" />
     <label for="cvc">CVC</label>
     <input  type="text" name="cvc" id="cvc" placeholder="e.g. 123" />
     <div id="cvcEl" class="valid-feedback">
     </div>
     <button id="submitBtn" disabled class="btn btn-primarey">Confirm</button>
     
     `;
      cardIbanEl.textContent = "0000 0000 0000 0000";
      cardholderNameEl.textContent = "Faraz Ahmed";
      dateEl.textContent = "0/0";
      cvcNumber.textContent = "000";
    }, 5000);
  } else {
  }
}

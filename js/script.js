/* Module 3 - Interactive Form
   Author: Lee Bryan */

const nameField = document.getElementById("name");
const jobTitle = document.getElementById ("title");
const otherJobRole = document.getElementById ("other-job-role");
const colorField = document.getElementById ("color");
const designField = document.getElementById ("design");
const colorFieldOptions = document.getElementById ("color").children;
const activityCost = document.querySelector (".activities-cost");
const checkBoxes = document.querySelectorAll("#activities input");
const selectedActivities = document.getElementById("activities-box");
const paymentMethodField = document.getElementById ("payment");
const creditCard = document.getElementById ("credit-card");
const paypal = document.getElementById("paypal");
const bitcoin = document.getElementById("bitcoin");
const formElement = document.querySelector("form");
const emailField = document.getElementById("email");
const ccNum = document.getElementById("cc-num");
const zip = document.getElementById("zip");
const cvv = document.getElementById("cvv");
let totalCost = 0;

// Sets the cursor to the Name field by default

nameField.focus();

// Hides the Other Job Role text field when the page is loaded

otherJobRole.style.display = "none";

// Displays the Other Job Role text field only when the Other job role is selected in the dropdown menu

jobTitle.addEventListener("change", (event) => {
    if (event.target.value == "other") {
        otherJobRole.style.display = "";}
        else {otherJobRole.style.display = "none";}
    });

// Disables the color dropdown menu

colorField.disabled = true;

designField.addEventListener ("change", (event) => {

// Enables the dropdown menu and resets the dropdown to default (Select a Design Theme Above)

    colorField.disabled = false;
    colorField.selectedIndex = 0;
    
// This loop disables the colors depending on the design selected

    for( let i = 0; i < colorFieldOptions.length; i++) {
        
        const selectedDesign = event.target.value;
        const dataTheme = colorField[i].getAttribute('data-theme');
        
        if ( selectedDesign === dataTheme) {
            colorFieldOptions[i].hidden = false;
            colorFieldOptions[i].setAttribute('selected', true);    //Shows the option in the field box
        } else {
            colorFieldOptions[i].hidden = true;
            colorFieldOptions[i].removeAttribute('selected');
        }
    }
});

// Adds up the total cost of the checked boxes and disables the options that occur at the same time as the selected option

document.querySelector('#activities').addEventListener('change', (e) => {
    let clicked = e.target;
    let clickedCost = +clicked.dataset.cost;

    if (clicked.checked) {
        totalCost += clickedCost;
        activityCost.textContent = `Total: $ ${totalCost}`;
    } else if (clicked.checked === false) {
        totalCost -= clickedCost;
        activityCost.textContent = `Total: $ ${totalCost}`;
        }

    for (let i=0; i < checkBoxes.length; i++){
        if(e.target.getAttribute('data-day-and-time') ===
            checkBoxes[i].getAttribute('data-day-and-time') &&
            e.target !== checkBoxes[i]
        ) if (e.target.checked) {
            checkBoxes[i].disabled = true;
            checkBoxes[i].parentElement.className = 'disabled';
        } else {
            checkBoxes[i].disabled = false;
            checkBoxes[i].parentElement.className = "";
        }
    }
});


// Only shows the credit card payment section by default

creditCard.defaultSelected = true;
paypal.style.display = "none";
bitcoin.style.display = "none";

// Sets the payment method field dropdown option to credit-card by default

paymentMethodField.options[1].setAttribute("selected",true);

// Updates to display the chosen payment method section from the dropdown list

paymentMethodField.addEventListener("change", (e) => {
    if (e.target.value === "credit-card"){
        creditCard.style.display = "";
        paypal.style.display = "none";
        bitcoin.style.display = "none";
    } else if (e.target.value === "paypal"){
        creditCard.style.display = "none";
        paypal.style.display = "";
        bitcoin.style.display = "none";
    } else if(e.target.value === "bitcoin"){
        creditCard.style.display = "none";
        paypal.style.display = "none";
        bitcoin.style.display = "";
    }
});

// Checks that the name field isn't blank or empty

function nameValidation () {
    const nameEntered = nameField.value;
    const validName = /^\w+$/.test(nameEntered); 
    if (validName) {
        hintNotRequired(nameField);
    } else {
        hintRequired(nameField);
    }
    return validName;
}

// Validates the name field in real time

nameField.addEventListener ("keyup",nameValidation);

// Checks the email is formatted correctly and provides two different conditional error messages

function emailValidation () {
    const emailEntered = emailField.value;
    const emailEmpty = /^\s*$/.test(emailEntered);
    const validEmail = /^[^@]+@[^@.]+\.com+$/i.test(emailEntered);
    if (emailEmpty) {
        hintRequired(emailField);
        email.parentElement.lastElementChild.innerHTML = 'Email field cannot be blank';
        return false;
    } else if(!validEmail) {
        hintRequired(emailField);
        email.parentElement.lastElementChild.innerHTML = 'Email address must contain @ symbol and end with ".com"';
        return false;
    } else {
        hintNotRequired(emailField);
        return true;
    }
}

// Validates the email field in real time

emailField.addEventListener ("keyup",emailValidation);

// Checks that one activity is selected

function isActivitySelected () {
    const activitySelected = totalCost > 0;
    if (activitySelected) {
        hintNotRequired(selectedActivities);
    } else {
        hintRequired(selectedActivities);
    }
    return activitySelected;
}

// Checks that the credit card number has between 13 - 16 digits

function cardNumberValidation() {
    const validCCNum = /^(\d{13,16})$/.test(ccNum.value);
    if (validCCNum) {
        hintNotRequired(ccNum);
    } else {
        hintRequired(ccNum);
    }
    return validCCNum;
}

// Checks that the zip code contains 5 digits

function zipValidation() {
    const validZip = /^(\d{5})$/.test(zip.value);
    if(validZip){
        hintNotRequired(zip);
    } else {
        hintRequired(zip);
    }
    return validZip;
}

// Checks that the cvv value contains 3 digits

function cvvValidation() {
    const validCVV = /^(\d{3})$/.test(cvv.value);
    if (validCVV) {
        hintNotRequired(cvv);
    } else {
        hintRequired(cvv);
    }
    return validCVV;
}

// Submits the form and identifies any errors

formElement.addEventListener('submit', e => {
    if (nameValidation()) {
        e.preventDefault();
    } 
    if (emailValidation()) {
        e.preventDefault();
    }   
    if (!isActivitySelected()) {
        e.preventDefault();
    }
    if (cardNumberValidation()) {
        e.preventDefault();
    }
    if (zipValidation()) {
        e.preventDefault();
    }
    if (cvvValidation()) {
        e.preventDefault();
    }
});

// Shows the hints depending if the requirements are met

function hintRequired (element) {
    element.parentElement.classList.add('not-valid');
    element.parentElement.classList.remove('valid');
    element.parentElement.lastElementChild.style.display = 'block';
}

function hintNotRequired (element) {
    element.parentElement.classList.add('valid');
    element.parentElement.classList.remove('not-valid');
    element.parentElement.lastElementChild.style.display = "none";
}

// Allows for the focus state to select each checkbox in the 'Register for Activities' section when the tab key is pressed (accessibility features)

for (let i = 0; i < checkBoxes.length; i++) {
    checkBoxes[i].addEventListener('focus', (e) => {
        checkBoxes[i].parentElement.classList.add('focus');
    });
    checkBoxes[i].addEventListener('blur', (e) => {
        checkBoxes[i].parentElement.classList.remove('focus');
    });
}
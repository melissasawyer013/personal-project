
// Shows hidden div with additional questions when needs or offerings checked on form
let checkboxes = document.querySelectorAll(".contains-hidden-div");
for (let i=0; i<checkboxes.length; i++) {
  console.log(checkboxes[i]);
  checkboxes[i].addEventListener('click', displayHiddenDiv, false);
};

function displayHiddenDiv(e) {
  let checkboxInputToCheck = e.target;
  let divToShow = checkboxInputToCheck.parentNode.parentNode.children[1];
  if (checkboxInputToCheck.checked == true) {
    divToShow.style.display = "flex";
  } else {
    divToShow.style.display = "none";
  }
}

// let emailA = document.querySelector(".emailA");
// let emailB = document.querySelector('.emailB');
// let emailMatchMessage = document.querySelector('#emailMatchMessage');

// function checkEmailMatch() {
//   console.log(emailA.value);
//   if (emailA.value != emailB.value) {
//     emailB.setCustomValidity('Email must match above');
//     emailMatchMessage.style.display = 'flex';
//   } else {
//     emailB.setCustomValidity('');
//     emailMatchMessage.style.display = 'none';
//   }
// }
// emailA.onchange = checkEmailMatch();
// emailB.onkeyup = checkEmailMatch();

// let passwordA = document.querySelector('.passA');
// let passwordB = document.querySelector('.passB');

// function validatePassword() {
//   if (passwordA != passwordB) {
//     passwordB.setCustomValidity('Passwords must match.');
//   } else {

//   }
// }

// passwordA.onchange = validatePassword();
// passwordB.onkeyUp = validatePassword();






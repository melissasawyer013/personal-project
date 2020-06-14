
// Shows hidden div with additional questions when needs or offerings checked on form
let checkboxes = document.querySelectorAll(".contains-hidden-div");
for (let i=0; i<checkboxes.length; i++) {
  // console.log(checkboxes[i]);
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


let checkboxesUpdate = document.querySelectorAll(".contains-hidden-div-update");

for (let i=0; i<checkboxesUpdate.length; i++) {
  // console.log(checkboxesUpdate[i]);
  checkboxesUpdate[i].addEventListener('click', displayHiddenDivUpdate, false);
  console.log(checkboxesUpdate[i].checked);
  
  
  
};

for (let i=0; i<checkboxesUpdate.length; i++) {
  console.log('second for loop initiated');
  console.log(`These are the checkboxes being assessed: ${checkboxesUpdate[i]} and is it checked ${checkboxesUpdate[i].checked}`);
  console.log(checkboxesUpdate[i].checked);
  if (checkboxesUpdate[i].checked == true) {
    console.log(`${checkboxesUpdate[i]} is checked`);
    console.log(`divToShow:`)
    console.log(checkboxesUpdate[i].parentNode.parentNode.children[1]);
    let divToShow = checkboxesUpdate[i].parentNode.parentNode.children[1];
    console.log(`divToShow: ${divToShow}`);
    divToShow.style.display = 'flex';
  }
}

function displayHiddenDivUpdate(e) {
  let checkboxInputToCheck = e.target;
  let divToShow = checkboxInputToCheck.parentNode.parentNode.children[1];
  if (checkboxInputToCheck.checked == true) {
    divToShow.style.display = "flex";
  } else {
    divToShow.style.display = "none";
  }
}
// Shows hidden div with additional questions when needs or offerings checked on form
// let checkForChecks = document.querySelectorAll(".checkForChecks");
// for (let i=0; i<checkForChecks.length; i++) {
//   checkForChecks[i].addEventListener('load', displayHiddenDivUpdate, false);
//   console.log(`listener engaged for ${checkForChecks[i]}`)
// };

// function displayHiddenDivUpdate() {
//   console.log('displayHiddenDivUpdate function engaged')
//   let updateCheckboxes = document.querySelectorAll(".contains-hidden-div-update");
//   console.log(updateCheckboxes)
//   for (let i=0; i<updateCheckboxes.length; i++) {
//     console.log(updateCheckboxes[1].checked)
//     if (updateCheckboxes[i].checked == true) {
//       updateCheckboxes[i].parentNode.parentNode.children[1].style.display = "flex";
//     }
//   };
// }
// if ($("#some-box").is(':checked')){
//   $("#main-box").show();
// }


//fetch function to add a community update to the database
function addCommunityUpdate(userID, updateKey, priorUpdates) {
  const formData = new FormData();
  let textArea = document.getElementsByClassName(`${updateKey}${userID}`);
  let noteUpdate = textArea[0].value;
  let communityNotesArray;;
  communityNotesArray = priorUpdates.split(',');
  communityNotesArray.push(noteUpdate);
  formData.append('userID', userID),
  formData.append('updateKey', updateKey);
  formData.append('arrayToAppend', communityNotesArray);
  formData.append(updateKey, Array.from(communityNotesArray));

  fetch(`/addCommunityNotes`, {
    method: 'PUT',
    body: new URLSearchParams(formData),
  })
  .then (res => {
    if (res.status === 200) {
      console.log(`communityNotesArray: ${communityNotesArray}`);
      let spotToPrint = document.getElementById(`print${updateKey}${userID}`);
      spotToPrint.innerHTML = '';
      console.log(spotToPrint.innerHTML);
      communityNotesArray.forEach(note => {
        if (note.length != 0) {
          spotToPrint.innerHTML += '<span>' + note + '</span><br>';
        }
      });
      spotToPrint.innerHTML += '<br>';      
    }
  })
  .catch (err => console.log(err))
}




/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function toggleResponsive() {
  var x = document.getElementById("bottomNav");
  if (x.className === "bottom-nav") {
    x.className += " responsive";
  } else {
    x.className = "bottom-nav";
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






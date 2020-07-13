// const { text } = require("body-parser");

// Shows hidden div with additional questions when needs or offerings checked on form
let checkboxes = document.querySelectorAll(".contains-hidden-div");
for (let i=0; i<checkboxes.length; i++) {
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
};


let checkboxesUpdate = document.querySelectorAll(".contains-hidden-div-update");

for (let i=0; i<checkboxesUpdate.length; i++) {
  checkboxesUpdate[i].addEventListener('click', displayHiddenDivUpdate, false);
};

for (let i=0; i<checkboxesUpdate.length; i++) {
  if (checkboxesUpdate[i].checked == true) {
    let divToShow = checkboxesUpdate[i].parentNode.parentNode.children[1];
    divToShow.style.display = 'flex';
  }
};

function displayHiddenDivUpdate(e) {
  let checkboxInputToCheck = e.target;
  let divToShow = checkboxInputToCheck.parentNode.parentNode.children[1];
  if (checkboxInputToCheck.checked == true) {
    divToShow.style.display = "flex";
  } else {
    divToShow.style.display = "none";
  }
}



//fetch function to add a community update to the database
function addCommunityUpdate(userID, updateKey, priorUpdates,) {
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
      let spotToPrint = document.getElementById(`print${updateKey}${userID}`);
      spotToPrint.innerHTML = '';
      communityNotesArray.forEach(note => {
        if (note.length != 0) {
          spotToPrint.innerHTML += '<span>' + note + '</span><br>';
        }
      });
      spotToPrint.innerHTML += '<br>'; 
      console.log(textArea[0].value); 
      textArea[0].value = null;
      console.log(textArea[0].value);     
    } else {
      let spotToPrint = document.getElementById(`print${updateKey}${userID}`);
      spotToPrint.innerHTML = 'You must be logged in to update. <a href="login">Login here.</a> Copy your community update text to paste after logging in.<br><br>';
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


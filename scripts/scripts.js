let checkboxes = document.querySelectorAll(".contains-hidden-div");
for (let i=0; i<checkboxes.length; i++) {
  console.log(checkboxes[i]);
  checkboxes[i].addEventListener('click', displayHiddenDiv, false);
};

function displayHiddenDiv(e) {
  let checkboxInputToCheck = e.target;
  console.log(checkboxInputToCheck);
  let divToShow = checkboxInputToCheck.parentNode.parentNode.children[1];
  if (checkboxInputToCheck.checked == true) {
    console.log (`it's checked`);
    divToShow.style.display = "flex";
  } else {
    console.log(`it's not checked`)
    divToShow.style.display = "none";
  }
}






// function onSuccess(googleUser) {
//     console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
//   }
//   function onFailure(error) {
//     console.log(error);
//   }
//   function renderButton() {
//     gapi.signin2.render('my-signin2', {
//       'scope': 'profile email',
//       'width': 240,
//       'height': 50,
//       'longtitle': true,
//       'theme': 'dark',
//       'onsuccess': onSuccess,
//       'onfailure': onFailure
//     });
//   }






// let navBotList = document.querySelector('.navbar-bottom-list-links');
// let navBotLinkList = navBotList.children;

// console.log (navBotLinkList);

// for (let i=0; i<navBotLinkList.length; i++) {
//     if (navBotLinkList[i].className === "this-page") {
//         navBotLinkList[i].style.border === "#EBC043 solid 2px";
//     } 
// }

// console.log(navBotLinkList[5].className)

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



// let searchForm = document.querySelector("#searchForm");
// searchForm.addEventListener('click', addJS, false);

// function addJS() {
//   console.log(searchForm `This is logging`);

// }
//
// let searchForm = document.querySelector("#searchForm");
// console.log(searchForm);
// let searchResults = "<p>Hello World!</p>";
// for (let i=0; i<searchForm; i++) {
//   searchForm.addEventListener('click', addJS, false)
// }

// searchCheckboxes.addEventListener('click', displaySearchResults, false);
// function addJS(e) {
//   console.log("function initiated");
//   let spotToPutStuff = document.querySelector('#searchResultsContainer');
//   let childText = document.createElement('p');
//   childText.textContent = "Hello";
//   spotToPutStuff.appendchild(childText);
//   console.log("It's appended!")
// };
            // "<% searchMatchArray.forEach ((singleMatchedUser) => { %>
            
            // <div class="medium-content-container-column palette-c" style="font-size: 1em;">
                
            //     <h2> <%= offer %> </h2>
            //     <div class="container-row-no-wrap">
            //         <div class="search-result-row-label">
            //             <span>Neighbor's Name:</span>
            //         </div>   
            //         <div class="search-result-row-result">
            //             <span> <%= singleMatchedUser.publicDisplayName %> </span>
            //             <br><br>
            //         </div>
            //     </div>
            //     <div class="container-row-no-wrap">
            //         <div class="search-result-row-label">
            //             <span>Neighborhood:</span>
            //         </div>   
            //         <div class="search-result-row-result">
            //             <span> <%= singleMatchedUser.formNeighborhood %> </span>
            //             <br><br>
            //         </div>
            //     </div>
            //     <div class="container-row-no-wrap">
            //         <div class="search-result-row-label">
            //             <span>More Information from Neighbor:</span>
            //         </div>   
            //         <div class="search-result-row-result">
                        
            //             <!-- need to do some Looping here to get the correct explainOffer -->
            //             <span> <%= singleMatchedUser.explainOfferCooking %> </span>
            //             <br><br>
            //         </div>
            //     </div>
            //     <div class="container-row-no-wrap">
            //         <div class="search-result-row-label">
            //             <span>Contact Information:</span>
            //         </div>   
            //         <div class="search-result-row-result">
            //             <span> <%= singleMatchedUser.publicDisplayContact %> </span><br>
                        
            //             <br><br>
            //         </div>
            //     </div>
            //     <div class="container-row-no-wrap">
            //         <div class="search-result-row-label">
            //             <span>Community Update:</span>
            //         </div>   
            //         <div class="search-result-row-result">
            //             <span> <%= singleMatchedUser.communityUpdateOfferCooking %> </span>
            //             <br><br>
            //         </div>
            //     </div>
            //     <form action="/addCommunityNotes" method="PUT">
            //         <fieldset>
            //             <div class="container-row-no-wrap">
            //                 <div class="search-result-row-label">
            //                     <legend>Update this need or offering:</legend>
            //                     <label for="communityNotes">Examples: Explain how this need was met and on what date or explain how this offering was accessed and on what date.</label>
            //                 </div>   
            //                 <div class="search-result-row-result">
            //                     <textarea class="search-result-textarea" placeholder="Explain here" id="communityNotes" name="communityNotes"> <%= singleMatchedUser.communityUpdateOfferCooking %> </textarea>
            //                     <br><br>
            //                     <input type="submit" class="button palette-a">
            //                     <br>
            //                 </div>
            //             </div>
            //         </fieldset>  
            //     </form>  
            // </div>  
            
            
            // <% }) %></div>";








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
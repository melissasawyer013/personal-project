const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const app = express();
let dbHandler;
const dbURL = 'mongodb://localhost:27017';
const dbName = 'DCCN';
const collectionUserForm = 'userFormData';
const collectionDataSearch = 'dataSearch';
const PORT = 5500;

// app.connect(PORT, function() {

    //Connects to database
    mongoClient = mongodb.MongoClient;
    mongoClient.connect(dbURL, { useUnifiedTopology: true }, (err, dbClient) => {
        if (err) {
            console.log(`There was an error connecting to the database. Error: ${err}`);
        } else {
            console.log('You are connected to the database times two!')
            dbHandler = dbClient.db(dbName);
        };
    });
// });

router.get('/', (req, res) => {
    res.render('pages/index');  
});

router.get('/index', (req, res) => {
    res.render('pages/index');  
});

router.get('/about-us/', (req, res) => {
    res.render('pages/about-us');
});

router.get('/block-coordinator', (req, res) => {
    res.render('pages/block-coordinator');
});

router.get('/community-resources-add-organization', (req, res) => {
    res.render('pages/community-resources-add-organization');
});

router.get('/community-resources', (req, res) => {
    res.render('pages/community-resources');
});

router.get('/create-account', (req, res) => {
    res.render('pages/create-account');
});

router.get('/donate', (req, res) => {
    res.render('pages/donate');
});

router.get('/forgot-password', (req, res) => {
    res.render('pages/forgot-password');
});

router.get('/help', (req, res) => {
    res.render('pages/help');
});

router.get('/login', (req, res) => {
    res.render('pages/login');
});

router.get('/needs-and-offerings', (req, res) => {
    let formDataSearch = req.query;
    let searchNeighborhood = formDataSearch['searchNeighborhood'];
    let searchNeeds = formDataSearch['searchNeeds'];
    let searchOffers = formDataSearch['searchOffers'];
    if (searchOffers != undefined) {
        dbHandler.collection(collectionUserForm).find({formOfferings: searchOffers}).toArray((error, result) => {
        if (error) {
            console.log(error);
        } else {
            res.render('pages/needs-and-offerings.ejs', {
                'searchMatchArray': result || [],
                'offer': searchOffers || [],
                'need': searchNeeds || [],
            });
        }
    })
    } else {
        res.render('pages/needs-and-offerings.ejs', {
            'searchMatchArray': [],
            'offer': [],
            'need': []
        });
    }
    if (searchNeeds != undefined) {
        dbHandler.collection(collectionUserForm).find({formNeeds: searchNeeds}).toArray((error, result) => {
        if (error) {
            console.log(error);
        } else {
            res.render('pages/needs-and-offerings.ejs', {
                'searchMatchArray': result || [],
                'need': searchNeeds || [],
                'offer': searchOffers || []
            });
        }
    })
} else {
    res.render('pages/needs-and-offerings', {'searchMatchArray': []});
}});



//EXPERIMENTING WITH A PAGE
router.get('/experimentalSearchStuffNoPromises', (req, res) => {
    let formDataSearch = req.query;
    let searchMatchArray = [];
    let searchNeighborhood = formDataSearch['searchNeighborhood'];
    let searchNeeds = formDataSearch['searchNeeds'];
    let searchOffers = formDataSearch['searchOffers'];
    console.log(`fomrDataSearch: ${JSON.stringify(formDataSearch)}`)
    if (searchOffers != undefined) {
        dbHandler.collection(collectionUserForm).find({formOfferings: searchOffers}).toArray((error, result) => {
        if (error) {
            console.log(error);
        } else {
            res.render('pages/experimentalSearchStuffNoPromises.ejs', {
                'searchMatchArray': result || [],
                'offer': searchOffers || [],
                'need': searchNeeds || [],
            });
        }
    })
    } else {
        res.render('pages/experimentalSearchStuffNoPromises.ejs', {
            'searchMatchArray': [],
            'offer': [],
            'need': []
        });
    }
    if (searchNeeds != undefined) {
        dbHandler.collection(collectionUserForm).find({formNeeds: searchNeeds}).toArray((error, result) => {
        if (error) {
            console.log(error);
        } else {
            res.render('pages/experimentalSearchStuffNoPromises.ejs', {
                'searchMatchArray': result || [],
                'need': searchNeeds || [],
                'offer': searchOffers || []
            });
        }
    })
} else {
    res.render('pages/experimentalSearchStuffNoPromises.ejs', {
        'searchMatchArray': [],
        'offer': [],
        'need': []
    });
}});








router.get('/experimentalSearchStuff.ejs', async(req, res) => {
    let formDataSearchObject;
    let searchNeighborhood;
    let searchNeeds;
    let searchOffers;
    let searchesArray = [];
    let needMatches = [];
    let offerMatches = [];

    let searchQueryPromise = new Promise(async function(resolve, reject) {
        formDataSearchObject = req.query;
        console.log (`formDataSearchObject: ${formDataSearchObject}`)
        res.render('pages/experimentalSearchStuff.ejs')
        setTimeout(() => resolve(console.log('Done with promise')), 1000);
        
    })

    searchQueryPromise.then(
        result => setVariablesWithQueryResults, 
        console.log("Promies #1 kept! Oh yeah."), 
        error => console.log(error)
    );
    
    let setVariablesWithQueryResults = new Promise(async function(resolve, reject) {
        searchNeighborhood = await formDataSearchObject['searchNeighborhood']; //The neighborhood(s) the user selects with checkbox to search
        searchNeeds = await formDataSearchObject['searchNeeds']; //The need(s) the user selects with checkbox to search
        searchOffers = await formDataSearchObject['searchOffers']; //The offer(s) the user selects with checkbox to search
        // searchesArray //searchesArray should equal [[searchNeighborhood results], [searchNeeds results], [searchOffers results]]
        needMatches = [];
        offerMatches = [];
        console.log(`part 1 of promise # 2 kept - variables set except searchesArray`)
        if (searchNeighborhood) {
            //If only one neighborhood checkbox is selected, the data is not stored as an array. This makes it into an array for storage in the searchesArray variable
            if (Array.isArray(searchNeighborhood) === false) {
                searchNeighborhood = [searchNeighborhood];
            };
            searchesArray.push(searchNeighborhood);
            console.log('the Neighborhood checkboxes have been pushed to the searchesArray')
            console.log(JSON.stringify(searchNeighborhood));
        };
        if (searchNeeds) {
            //If only one need checkbox is selected, the data is not stored as an array. This makes it into an array for storage in the searchesArray variable
            if (Array.isArray(searchNeeds) === false) {
                searchNeeds = [searchNeeds];
            };
            searchesArray.push(searchNeeds);
            console.log(`Step 3: the needscheckboxes have been pushed to the searchesArray as an array`);
            console.log(JSON.stringify(searchNeeds));
            
        };
       
        if (searchOffers) {
            //If only one offer checkbox is selected, the data is not stored as an array. This makes it into an array for storage in the searchesArray variable
            if (Array.isArray(searchOffers) === false) {
                searchOffers = [searchOffers];
            };
            searchesArray.push(searchOffers);
            console.log(`Step 4: the offers checkboxes have been pushed to the searchesArray as an object`);
            console.log(JSON.stringify(searchOffers));
            
        };
        console.log(`searchesArray: ${JSON.stringify(searchesArray)}`);
        setTimeout(() => resolve(console.log('Done with promise #2!')), 1000);
    })

    setVariablesWithQueryResults.then(
        result => searchDatabaseAgainstQuery,
        console.log('setVariables function completed'), 
    )
    
    let searchDatabaseAgainstQuery = new Promise (async function(resolve, reject) {
        await searchesArray[1].forEach(async function(need){
            await dbHandler.collection(collectionUserForm)
            .find({formNeeds: need}) 
            .project({'publicDisplayName': 1, 'publicDisplayContact': 1, 'publicDisplayAddress': 1,})
            .toArray((error, result) => {
                if (error) {
                    console.log(error)
                } else {
                    needMatches.push(result);
                    console.log('the elements in searchesArray[1] have been looped through, the collection has been searched based on the element in searchesArray[1], and the matches have been pushed to the variable needMatches. Content in needMatches is:')
                    
                }
            })
        });
        console.log(`needMatches: ${JSON.stringify(needMatches)}`)



        await searchesArray[2].forEach(async function(offer){
            await dbHandler.collection(collectionUserForm)
            .find({formOfferings: offer})
            .project({'publicDisplayName': 1, 'publicDisplayContact': 1, 'publicDisplayAddress': 1,})
            .toArray((error, result) => {
                if (error) {
                    console.log(error);
                } else {
                    offerMatches.push(result);
                    console.log('the elements in searchesArray[2] have been looped through, the collection has been searched based on the element in searchesArray[2], and the matches have been pushed to the variable offerMatches. Content in offerMatches is:')
                    
                }
            })
        }) 
        console.log(`offerMatches: ${JSON.stringify(offerMatches)}`)
        console.log(`searchesArray: ${JSON.stringify(searchesArray)}`);
        setTimeout(() => resolve(console.log('Done with promise #3!')), 1000);
        
    })
})//end of experimental route 






// router.get('/experimentalSearchStuff.ejs', async(req, res) => {
//     let formDataSearchObject = await req.query;
//     let searchNeighborhood = await formDataSearchObject['searchNeighborhood']; //The neighborhood(s) the user selects with checkbox to search
//     let searchNeeds = await formDataSearchObject['searchNeeds']; //The need(s) the user selects with checkbox to search
//     let searchOffers = await formDataSearchObject['searchOffers']; //The offer(s) the user selects with checkbox to search
//     let searchesArray = await []; ///searchesArray should equal [[searchNeighborhood results], [searchNeeds results], [searchOffers results]]
//     let needMatches = await [];
//     let offerMatches = await [];
//     await console.log('Step 1: the variables are set')
    
//     const compileSearchParameters = async () => {
//         await console.log('Step 2: The compileSearchParameters function has initiated')
//         if (searchNeighborhood != undefined) {
            //If only one neighborhood checkbox is selected, the data is not stored as an array. This makes it into an array for storage in the searchesArray variable
        //     if (Array.isArray(searchNeighborhood) === false) {
        //         searchNeighborhood = await [searchNeighborhood];
        //     };
        //     await searchesArray.push(searchNeighborhood);
        //     await console.log('Step 3: the Neighborhood checkboxes have been pushed to the searchesArray')
        // };
        
        // if (searchNeeds != undefined) {
            //If only one need checkbox is selected, the data is not stored as an array. This makes it into an array for storage in the searchesArray variable
        //     if (Array.isArray(searchNeeds) === false) {
        //         searchNeeds = await [searchNeeds];
        //     };
        //     await searchesArray.push(searchNeeds);
        //     await console.log('Step 4: the needs checkboxes have been pushed to the searchesArray')
        // };
        // if (searchOffers != undefined) {
            //If only one offer checkbox is selected, the data is not stored as an array. This makes it into an array for storage in the searchesArray variable
        //     if (Array.isArray(searchOffers) === false) {
        //         searchOffers = await [searchOffers];
        //     };
        //     await searchesArray.push(searchOffers);
        //     await console.log('Step 5: the offers checkboxes have been pushed to the searchesArray')
        // };
        // await console.log('completed the compileSearchParameters function');
        // await console.log(searchesArray[0]);
        // await console.log(searchesArray[1]);
        // await console.log(searchesArray[2]);
    //     await compileSearchResults();
    // }
    
    
    // const compileSearchResults = async () => {
    //     await console.log('Step 6: The compileSearchResults function has initiated')
    //     for (const need of searchesArray[1]) {
    //         await dbHandler.collection(collectionUserForm)
    //         .find({formNeeds: need}) 
    //         .project({'publicDisplayName': 1, 'publicDisplayContact': 1, 'publicDisplayAddress': 1,})
    //         .toArray(async(error, result) => {
    //             if (error) {
    //                 await console.log(error)
    //             } else {
    //                 await needMatches.push(result);
    //                 await console.log('Step 7: the elements in searchesArray[1] have been looped through, the collection has been searched based on the element in searchesArray[1], and the matches have been pushed to the variable needMatches. Content in needMatches is:')
    //                 await console.log(needMatches);
    //             }
    //         })
    //     }
        // await searchesArray[1].forEach(async function(need){
        //     await dbHandler.collection(collectionUserForm)
        //     .find({formNeeds: need}) 
        //     .project({'publicDisplayName': 1, 'publicDisplayContact': 1, 'publicDisplayAddress': 1,})
        //     .toArray(async(error, result) => {
        //         if (error) {
        //             await console.log(error)
        //         } else {
        //             await needMatches.push(result);
        //             await console.log('Step 7: the elements in searchesArray[1] have been looped through, the collection has been searched based on the element in searchesArray[1], and the matches have been pushed to the variable needMatches. Content in needMatches is:')
        //             await console.log(needMatches);
        //         }
        //     })
        // });
        // for (const offer of searchesArray[2]) {
        //     await dbHandler.collection(collectionUserForm)
        //     .find({formOfferings: offer})
        //     .project({'publicDisplayName': 1, 'publicDisplayContact': 1, 'publicDisplayAddress': 1,})
        //     .toArray(async(error, result) => {
        //         if (error) {
        //             console.log(error);
        //         } else {
        //             await offerMatches.push(result);
        //             await console.log('Step 8: the elements in searchesArray[2] have been looped through, the collection has been searched based on the element in searchesArray[2], and the matches have been pushed to the variable offerMatches. Content in offerMatches is:')
        //             await console.log(offerMatches);
        //         }
        //     })
        // }
        // await searchesArray[2].forEach(async function(offer){
        //     await dbHandler.collection(collectionUserForm)
        //     .find({formOfferings: offer})
        //     .project({'publicDisplayName': 1, 'publicDisplayContact': 1, 'publicDisplayAddress': 1,})
        //     .toArray(async(error, result) => {
        //         if (error) {
        //             console.log(error);
        //         } else {
        //             await offerMatches.push(result);
        //             await console.log('Step 8: the elements in searchesArray[2] have been looped through, the collection has been searched based on the element in searchesArray[2], and the matches have been pushed to the variable offerMatches. Content in offerMatches is:')
        //             await console.log(offerMatches);
        //         }
        //     })
        // }) 
        // await console.log('completed the compileSearchParameters function');
        // await console.log(searchesArray[0]);
        // await console.log(searchesArray[1]);
        // await console.log(searchesArray[2]);
        // await renderPage();
    // }

    // const renderPage = async () => { 
    //     await console.log('Step 9: The renderPage function has initiated');
    //     await res.render('pages/experimentalSearchStuff.ejs', {
    //         'offerMatches': offerMatches || [],
    //         'needMatches': needMatches || [],
    //         'offer': searchesArray[2] || [],
    //         'need': searchesArray[1] || [],
    //     });
    //     await console.log('Step 10: The page has been rendered with the variable availble to the EJS file: offerMatches, needMatches, offer, need');
        // await needMatches.forEach(async(element)=> {
        //     await console.log('the element is');
        //     await console.log(element);
        // });
        // await console.log('the needMatches is: ');
        // await console.log(needMatches);
        // await console.log('the offerMatches is: ');
        // await console.log(offerMatches);
        // await console.log('the offer is: ');
        // await console.log(searchesArray[2]);
        // await console.log('the need is: ');
        // await console.log(searchesArray[1]);
        // await console.log('Step 11: completed renderPage function')
    // }
    

    // await compileSearchParameters();
    // await console.log('the get route is now finished running')
    // await console.log(searchesArray)

// }) 
//end of experimental route







// router.get('/experimentalSearchStuff.ejs', (req, res) => {
//     let formDataSearchObject = req.query;
//     console.log(formDataSearchObject);
//     res.render('pages/experimentalSearchStuff.ejs');
//     let searchNeighborhood = formDataSearchObject['searchNeighborhood'];
//     let searchNeeds = formDataSearchObject['searchNeeds'];
//     let searchOffers = formDataSearchObject['searchOffers'];
//     let searchesArray = [];
//     let needMatches = [];
//     console.log('the status of the formDataSearchObject is: ')
//     console.log(formDataSearchObject);
//     if (formDataSearchObject === {}){
//         res.render('pages/experimentalSearchStuff.ejs');
//     } else {
//         if (searchNeighborhood != undefined) {
            //If only one neighborhood checkbox is selected, the data is not stored as an array. This makes it into an array for storage in the searchesArray variable
        //     if (Array.isArray(searchNeighborhood) === false) {
        //         searchNeighborhood = [searchNeighborhood];
        //     };
        //     searchesArray.push(searchNeighborhood);
        // };
        // if (searchNeeds != undefined) {
            //If only one need checkbox is selected, the data is not stored as an array. This makes it into an array for storage in the searchesArray variable
            // if (Array.isArray(searchNeeds) === false) {
            //     searchNeeds = [searchNeeds];
            // };
            // searchesArray.push(searchNeeds);
            // searchesArray[1].forEach(function(need){
            //     dbHandler.collection(collectionUserForm)
            //     .find({formNeeds: need}) 
                // .project({'publicDisplayName': 1, 'publicDisplayContact': 1, 'publicDisplayAddress': 1,})
                // .toArray((error, result) => {
                //     if (error) {
                //         console.log(error)
                //     } else {
                        // console.log('the need being iterated through is:')
                        // console.log(need);
                        // console.log(`loop completed for: ${need}`);
                        // console.log(result);
                        // needMatches.push(result);
                        // console.log('the value of needMatches is: ')
                        // console.log(needMatches);
                        // console.log('needMatches length is: ');
                        // console.log(needMatches.length);
                        // for (let i=0; i<needMatches.length; i++) {
                        //     console.log(`Iteration ${i}: ${needMatches[i]}`);
                        // }
                        // for (let i=0; i<needMatches[0].length; i++) {
                        //     console.log('inner-needMatches:')
                        //     console.log(needMatches[0][i])
                        // }
                        // console.log('objects in needMatches: ')
                        // console.log(needMatches[0][0])
                        // console.log(needMatches[0].length)
        //             }
        //         })
        //     });
        // };
    
    //     if (searchOffers != undefined) {
    //         //If only one offer checkbox is selected, the data is not stored as an array. This makes it into an array for storage in the searchesArray variable
    //         if (Array.isArray(searchOffers) === false) {
    //             searchOffers = [searchOffers];
    //         };
    //         searchesArray.push(searchOffers);
    
           
    //     };
    // }
    
    
    
    
    // console.log('searchesArray is: ')
    // console.log(searchesArray);
    
    
    // console.log('searchesArray[1] is')
    // console.log(searchesArray[1])
    
    //WHY DOES THIS STUFF HAPPEN BEFORE MY FOREACH LOOP ABOVE?
    // console.log('Is needMatches an array?')
    // console.log(Array.isArray(needMatches));
    // console.log('needMatches length is: ')
    // console.log(needMatches.length)
    // console.log('needMatchesis: ')
    // console.log(needMatches)


// }) //end of experimental route





//     let searchNeighborhood = formDataSearch['searchNeighborhood'];
//     let searchNeeds = formDataSearch['searchNeeds'];
//     let searchOffers = formDataSearch['searchOffers'];
//     const userSearchObject = {
//         searchNeighborhood: searchNeighborhood,
//         searchNeeds: searchNeeds,
//         searchOffers: searchOffers,
//     }
//     console.log(`userSearchObject: ${userSearchObject}`)
//     if (searchOffers || searchNeeds){
//         dbHandler.collection(collectionUserForm).find({formOfferings: searchOffers, formNeeds: searchNeeds}).toArray((error, result) => {
//         if (error) {
//             console.log(error);
//         } else {
//             res.render('pages/experimentalSearchStuff.ejs', {
//                 'userSearchObject': userSearchObject,
//                 'searchMatchArray': result || [],
//                 'offer': searchOffers,
//                 'need': searchNeeds,
                
//             });
//             console.log(`Search Needs: ${searchNeeds}`);
//             console.log(`Search Offerings: ${searchOffers}`)
//             // console.log(`searchMatchArray: ${searchMatchArray}`)
//         }
//     })
// } else {
//     res.render('pages/experimentalSearchStuff.ejs', {searchMatchArray: []});
// }});




// router.get('/experimentalSearchStuff.ejs', (req, res) => {
//     let formDataSearch = req.query;
//     let searchNeighborhood = formDataSearch['searchNeighborhood'];
//     let searchNeeds = formDataSearch['searchNeeds'];
//     let searchOffers = formDataSearch['searchOffers'];
//     const userSearchArray = [searchNeighborhood, searchNeeds, searchOffers,];
//     console.log(userSearchArray);
    //loop through userSearchArray, 
    // if i[1] != undefined, dbHandler.collection(collectionUserForm).find({formOfferings: searchOffers}).toArray
    // if i[2] !=undefined, dbHandler.collection(collectionUserForm).find({formNeeds: searchNeeds}).toArray
    // in ejs, make two separate for each loops? (for needs and for offerings)?
    // let allSearchParams = [];
    
    // if (formDataSearch === undefined) {
    //     res.render('pages/experimentalSearchStuff.ejs', {userSearchArray: []});
    // }
    // function searchNeedsAdd() {
    //     dbHandler.collection(collectionUserForm).find({formNeeds: searchNeeds}).toArray((error, result) => {
    //         if (error) {
    //             console.log(error);
    //         } else {
    //             allSearchParams.push(result);
    //         }
    //     })
    // }

    // function searchOffersAdd() {
    //     dbHandler.collection(collectionUserForm).find({formOfferings: searchOffers}).toArray((error, result) => {
    //         if (error) {
    //             console.log(error);
    //         } else {
    //             allSearchParams.push(result)
    //         }
    //     })
    // }
    // if (userSearchArray[1] != undefined) {
    //     searchOffersAdd();
    //     console.log(allSearchParams);
    // };

    // if(userSearchArray[2] != undefined) {
    //     searchNeedsAdd();
    //     console.log(allSearchParams);
    // };
// })
    

    // if (userSearchArray[2] != undefined) {
    //     dbHandler.collection(collectionUserForm).find({formNeeds: searchNeeds}).toArray((error, result) => {
    //         if (error) {
    //             console.log(error);
    //         } else {
    //             res.render('pages/experimentalSearchStuff.ejs', {
    //                 'searchMatchArray': result || [],
    //                 'need': searchNeeds,
    //             });
    //         }
    //     })
    // } else {
    //     res.render('pages/experimentalSearchStuff', {searchMatchArray: []});
    // }})
    
//     for (let i=0; i<userSearchArray.length; i++) {

//     }
//     if ((searchOffers)&&(searchNeeds === undefined)) {
//         dbHandler.collection(collectionUserForm).find({formOfferings: searchOffers}).toArray((error, result) => {
//         if (error) {
//             console.log(error);
//         } else {
//             res.render('pages/experimentalSearchStuff.ejs', {
//                 'userSearchObject': userSearchObject,
//                 'searchMatchArray': result || [],
//                 'offer': searchOffers,
//             });
//         }
//     })
//     } else if ((searchNeeds)&&(searchOffers === undefined)) {
//         dbHandler.collection(collectionUserForm).find({formNeeds: searchNeeds}).toArray((error, result) => {
//         if (error) {
//             console.log(error);
//         } else {
//             res.render('pages/experimentalSearchStuff.ejs', {
//                 'searchMatchArray': result || [],
//                 'need': searchNeeds,
//             });
//         }
//     })
// } else {
//     res.render('pages/experimentalSearchStuff', {searchMatchArray: []});
// }})







router.get('/update-form', (req, res) => {
    res.render('pages/update-form');
});

router.post('/addFormData', (req, res) => {
    const formData = req.body;
    let formFirstName = formData['formFirstName'];
    let formLastName = formData['formLastName'];
    let formPublicDisplayName = formData['formPublicDisplayName'];
    let publicDisplayName = ``;   
        if (formPublicDisplayName === "formFullNamePublic") {
            publicDisplayName = `${formFirstName} ${formLastName}`;
        }
        else if (formPublicDisplayName === "formFirstNameOnlyPublic") {
            publicDisplayName = formFirstName;
        } else if (formPublicDisplayName === "formLastNameOnlyPublic") {
            publicDisplayName = formLastName;
        } else {
            publicDisplayName = `Anonymous Neighbor`;
        };
    let formPhoneNumber = formData['formPhoneNumber'];
    let formEmail = formData['formEmail'];
    let formPublicDisplayContact = formData['formPublicDisplayContact'];
    let publicDisplayContact = ``;
        if (formPublicDisplayContact === "formPhoneAndEmailPublic") {
            publicDisplayContact = `${formPhoneNumber} or ${formEmail}`;
        } else if (formPublicDisplayContact === "formPhoneNumberOnlyPublic") {
            publicDisplayContact = `${formPhoneNumber}`;
        } else if (formPublicDisplayContact === "formEmailOnlyPublic") {
            publicDisplayContact = `${formEmail}`;
        } else {
            publicDisplayContact = `No contact provided. Please email DorchesterCommunityCare@gmail.com to get in contact with this neighbor.`
        }
    let formAddressHouseNumber = formData['formAddressHouseNumber'];
    let formAddressStreetName = formData['formAddressStreetName'];
    let formAddressApartmentNumber = formData['formAddressApartmentNumber'];
    let formNeighborhood = formData['formNeighborhood'];
    let formPublicDisplayAddress = formData['formPublicDisplayAddress'];
    let publicDisplayAddress = ``;
        if (formPublicDisplayAddress === "formFullAddressPublic") {
            publicDisplayAddress = `${formNeighborhood}: ${formAddressHouseNumber} ${formAddressStreetName} ${formAddressApartmentNumber}`;
        } else if (formPublicDisplayAddress === "formStreetNameOnlyPublic") {
            publicDisplayAddress = `${formNeighborhood}: ${formAddressStreetName}`;
        } else {
            publicDisplayAddress = `${formNeighborhood}`;
        }
    let formOfferings = formData['formOfferings'];
    let explainOfferChildcare = formData['explainOfferChildcare'];
    let communityUpdateOfferChildcare = '';
    
    let explainOfferCooking = formData['explainOfferCooking'];
    let communityUpdateOfferCooking = '';
    let explainOfferFoodAndSupplies = formData['explainOfferFoodAndSupplies'];
    let communityUpdateOfferFoodAndSupplies = '';
    let explainOfferRidesCar = formData['explainOfferRidesCar'];
    let communityUpdateOfferRidesCar = '';
    let explainOfferPetCare = formData['explainOfferPetCare'];
    let communityUpdateOfferPetCare = '';
    let explainOfferInternetSubs = formData['explainOfferInternetSubs'];
    let communityUpdateOfferInternetSubs = '';
    let explainOfferMedicalSupport = formData['explainOfferMedicalSupport'];
    let communityUpdateOfferMedicalSupport = '';
    let explainOfferMedicalAdvice = formData['explainOfferMedicalAdvice'];
    let communityUpdateOfferMedicalAdvice = '';
    let explainOfferStorage = formData['explainOfferStorage'];
    let communityUpdateOfferStorage = '';
    let explainOfferArt = formData['explainOfferArt'];
    let communityUpdateOfferArt = '';
    let explainOfferMentalHealth = formData['explainOfferMentalHealth'];
    let communityUpdateOfferMentalHealth = '';
    let explainOfferCompanionship = formData['explainOfferCompanionship'];
    let communityUpdateOfferCompanionship = '';
    let explainOfferLegal = formData['explainOfferLegal'];
    let communityUpdateOfferLegal = '';
    let explainOfferInterpretation = formData['explainOfferInterpretation'];
    let communityUpdateOfferInterpretation = '';
    let explainOfferSocialServices = formData['explainOfferSocialServices'];
    let communityUpdateOfferSocialServices = '';
    let explainOfferHealing = formData['explainOfferHealing'];
    let communityUpdateOfferHealing = '';
    let explainOfferHousingShort = formData['explainOfferHousingShort'];
    let communityUpdateOfferHousingShort = '';
    let explainOfferHousingLong = formData['explainOfferHousingLong'];
    let communityUpdateOfferHousingLong = '';
    let explainOfferOther = formData['explainOfferOther'];
    let communityUpdateOfferOther = '';
    let formGiveMoney = formData['formGiveMoney'];
    let formNeeds = formData['formNeeds'];
    let explainNeedChildcare = formData['explainNeedChildcare'];
    let needChildcareFrequency = formData['needChildcareFrequency'];
    let needChildcareUrgency = formData['needChildcareUrgency'];
    let communityUpdateNeedChildcare = '';
    let explainNeedCooking = formData['explainNeedCooking'];
    let needCookingFrequency = formData['needCookingFrequency'];
    let needCookingUrgency = formData['needCookingUrgency'];
    let communityUpdateNeedCooking = '';
    let explainNeedFoodAndSupplies = formData['explainNeedFoodAndSupplies'];
    let needFoodAndSuppliesFrequency = formData['needFoodAndSuppliesFrequency'];
    let needFoodAndSuppliesUrgency = formData['needFoodAndSuppliesUrgency'];
    let communityUpdateNeedFoodAndSupplies = '';
    let explainNeedRidesCar = formData['explainNeedRidesCar'];
    let needRidesCarFrequency = formData['needRidesCarFrequency'];
    let needRidesCarUrgency = formData['needRidesCarUrgency'];
    let communityUpdateNeedRidesCar = '';
    let explainNeedPetCare = formData['explainNeedPetCare'];
    let needPetCareFrequency = formData['needPetCareFrequency'];
    let needPetCareUrgency = formData['needPetCareUrgency'];
    let communityUpdateNeedPetCare = '';
    let explainNeedInternetSubscriptions = formData['explainNeedInternetSubscriptions'];
    let communityUpdateNeedInternetSubscriptions = '';
    let explainNeedMedicalSupport = formData['explainNeedMedicalSupport'];
    let needMedicalSupportFrequency = formData['needMedicalSupportFrequency'];
    let needMedicalSupportUrgency = formData['needMedicalSupportUrgency'];
    let communityUpdateNeedMedicalSupport = '';
    let explainNeedMedicalAdvice = formData['explainNeedMedicalAdvice'];
    let needMedicalAdviceUrgency = formData['needMedicalAdviceUrgency'];
    let communityUpdateNeedMedicalAdvice = '';
    let explainNeedStorage = formData['explainNeedStorage'];
    let needStorageUrgency = formData['needStorageUrgency'];
    let communityUpdateNeedStorage = '';
    let explainNeedArt = formData['explainNeedArt'];
    let needArtFrequency = formData['needArtFrequency'];
    let needArtUrgency = formData['needArtUrgency'];
    let communityUpdateNeedArt = '';
    let explainNeedMentalHealth = formData['explainNeedMentalHealth'];
    let needMentalHealthFrequency = formData['needMentalHealthFrequency'];
    let needMentalHealthUrgency = formData['needMentalHealthUrgency'];
    let communityUpdateNeedMentalHealth = '';
    let explainNeedCompanionship = formData['explainNeedCompanionship'];
    let needCompanionshipFrequency = formData['needCompanionshipFrequency'];
    let needCompanionshipUrgency = formData['needCompanionshipUrgency'];
    let communityUpdateNeedCompanionship = '';
    let explainNeedLegal = formData['explainNeedLegal'];
    let needLegalUrgency = formData['needLegalUrgency'];
    let communityUpdateNeedLegal = '';
    let explainNeedInterpretation = formData['explainNeedInterpretation'];
    let needInterpretationFrequency = formData['needInterpretationFrequency'];
    let needInterpretationUrgency = formData['needInterpretationUrgency'];
    let communityUpdateNeedInterpretation = '';
    let explainNeedSocialServices = formData['explainNeedSocialServices'];
    let needSocialServicesFrequency = formData['needSocialServicesFrequency'];
    let needSocialServicesUrgency = formData['needSocialServicesUrgency'];
    let communityUpdateNeedSocialServices = '';
    let explainNeedHealing = formData['explainNeedHealing'];
    let needHealingFrequency = formData['needHealingFrequency'];
    let needHealingUrgency = formData['needHealingUrgency'];
    let communityUpdateNeedHealing = '';
    let explainNeedHousingShort = formData['explainNeedHousingShort'];
    let needHousingShortUrgency = formData['needHousingShortUrgency'];
    let communityUpdateNeedHousingShort = '';
    let explainNeedHousingLong = formData['explainNeedHousingLong'];
    let needHousingLongUrgency = formData['needHousingLongUrgency'];
    let communityUpdateNeedHousingLong = '';
    let explainNeedOther = formData['explainNeedOther'];
    let needOtherFrequency = formData['needOtherFrequency'];
    let needOtherUrgency = formData['needOtherUrgency'];
    let communityUpdateNeedOther = '';
    let formFinancialNeed = formData['formFinancialNeed'];
    let explainNeedFinancial = formData['explainNeedFinancial'];
    let needFinancialFrequency = formData['needFinancialFrequency'];
    let needFinancialUrgency = formData['needFinancialUrgency'];
    let communityUpdateNeedFinancial = '';
    let needFinancialPublic = formData['needFinancialPublic'];
    let explainNeighborConnections = formData['explainNeighborConnections'];
    let blockCoord = formData['blockCoord'];
    let networkHelp = formData['networkHelp'];
    let formExplainCheckIn = formData['formExplainCheckIn'];


    

    const userFormDataObject = {
        publicDisplayName: publicDisplayName,
        publicDisplayContact: publicDisplayContact,
        publicDisplayAddress: publicDisplayAddress,
        formFirstName: formFirstName,
        formLastName: formLastName,
        formPublicDisplayName: formPublicDisplayName,
        formPhoneNumber: formPhoneNumber,
        formEmail: formEmail,
        formPublicDisplayContact: formPublicDisplayContact,
        formAddressHouseNumber: formAddressHouseNumber,
        formAddressStreetName: formAddressStreetName,
        formAddressApartmentNumber: formAddressApartmentNumber,
        formNeighborhood: formNeighborhood,
        formPublicDisplayAddress: formPublicDisplayAddress,
        formOfferings: formOfferings,
        explainOfferChildcare: explainOfferChildcare,
        communityUpdateOfferChildcare: communityUpdateOfferChildcare,
        explainOfferCooking: explainOfferCooking,
        communityUpdateOfferCooking: communityUpdateOfferCooking,
        explainOfferFoodAndSupplies: explainOfferFoodAndSupplies,
        communityUpdateOfferFoodAndSupplies: communityUpdateOfferFoodAndSupplies,
        explainOfferRidesCar: explainOfferRidesCar,
        communityUpdateOfferRidesCar: communityUpdateOfferRidesCar,
        explainOfferPetCare: explainOfferPetCare,
        communityUpdateOfferPetCare: communityUpdateOfferPetCare,
        explainOfferInternetSubs: explainOfferInternetSubs,
        communityUpdateOfferInternetSubs: communityUpdateOfferInternetSubs,
        explainOfferMedicalSupport: explainOfferMedicalSupport,
        communityUpdateOfferMedicalSupport: communityUpdateOfferMedicalSupport,
        explainOfferMedicalAdvice: explainOfferMedicalAdvice,
        communityUpdateOfferMedicalAdvice: communityUpdateOfferMedicalAdvice,
        explainOfferStorage: explainOfferStorage,
        communityUpdateOfferStorage: communityUpdateOfferStorage,
        explainOfferArt: explainOfferArt,
        communityUpdateOfferArt: communityUpdateOfferArt,
        explainOfferMentalHealth: explainOfferMentalHealth,
        communityUpdateOfferMentalHealth: communityUpdateOfferMentalHealth,
        explainOfferCompanionship: explainOfferCompanionship,
        communityUpdateOfferCompanionship: communityUpdateOfferCompanionship,
        explainOfferLegal: explainOfferLegal,
        communityUpdateOfferLegal: communityUpdateOfferLegal,
        explainOfferInterpretation: explainOfferInterpretation,
        communityUpdateOfferInterpretation: communityUpdateOfferInterpretation,
        explainOfferSocialServices: explainOfferSocialServices,
        communityUpdateOfferSocialServices: communityUpdateOfferSocialServices,
        explainOfferHealing: explainOfferHealing,
        communityUpdateOfferHealing: communityUpdateOfferHealing,
        explainOfferHousingShort: explainOfferHousingShort,
        communityUpdateOfferHousingShort: communityUpdateOfferHousingShort,
        explainOfferHousingLong: explainOfferHousingLong,
        communityUpdateOfferHousingLong: communityUpdateOfferHousingLong,
        explainOfferOther: explainOfferOther,
        communityUpdateOfferOther: communityUpdateOfferOther,
        formGiveMoney:formGiveMoney,
        formNeeds: formNeeds,
        explainNeedChildcare: explainNeedChildcare,
        needChildcareFrequency: needChildcareFrequency,
        needChildcareUrgency: needChildcareUrgency,
        communityUpdateNeedChildcare: communityUpdateNeedChildcare,
        explainNeedCooking: explainNeedCooking,
        needCookingFrequency: needCookingFrequency,
        needCookingUrgency: needCookingUrgency,
        communityUpdateNeedCooking: communityUpdateNeedCooking,
        explainNeedFoodAndSupplies: explainNeedFoodAndSupplies,
        needFoodAndSuppliesFrequency: needFoodAndSuppliesFrequency,
        needFoodAndSuppliesUrgency: needFoodAndSuppliesUrgency,
        communityUpdateNeedFoodAndSupplies: communityUpdateNeedFoodAndSupplies,
        explainNeedRidesCar: explainNeedRidesCar,
        needRidesCarFrequency: needRidesCarFrequency,
        needRidesCarUrgency: needRidesCarUrgency,
        communityUpdateNeedRidesCar: communityUpdateNeedRidesCar,
        explainNeedPetCare: explainNeedPetCare,
        needPetCareFrequency: needPetCareFrequency,
        needPetCareUrgency: needPetCareUrgency,
        communityUpdateNeedPetCare: communityUpdateNeedPetCare,
        explainNeedInternetSubscriptions: explainNeedInternetSubscriptions,
        communityUpdateNeedInternetSubscriptions: communityUpdateNeedInternetSubscriptions,
        explainNeedMedicalSupport: explainNeedMedicalSupport,
        needMedicalSupportFrequency: needMedicalSupportFrequency,
        needMedicalSupportUrgency: needMedicalSupportUrgency,
        communityUpdateNeedMedicalSupport: communityUpdateNeedMedicalSupport,
        explainNeedMedicalAdvice: explainNeedMedicalAdvice,
        needMedicalAdviceUrgency: needMedicalAdviceUrgency,
        communityUpdateNeedMedicalAdvice: communityUpdateNeedMedicalAdvice,
        explainNeedStorage: explainNeedStorage,
        needStorageUrgency: needStorageUrgency,
        communityUpdateNeedStorage: communityUpdateNeedStorage,
        explainNeedArt: explainNeedArt,
        needArtFrequency: needArtFrequency,
        needArtUrgency: needArtUrgency,
        communityUpdateNeedArt: communityUpdateNeedArt,
        explainNeedMentalHealth: explainNeedMentalHealth,
        needMentalHealthFrequency: needMentalHealthFrequency,
        needMentalHealthUrgency: needMentalHealthUrgency,
        communityUpdateNeedMentalHealth: communityUpdateNeedMentalHealth,
        explainNeedCompanionship: explainNeedCompanionship,
        needCompanionshipFrequency: needCompanionshipFrequency,
        needCompanionshipUrgency: needCompanionshipUrgency,
        communityUpdateNeedCompanionship: communityUpdateNeedCompanionship,
        explainNeedLegal: explainNeedLegal,
        needLegalUrgency: needLegalUrgency,
        communityUpdateNeedLegal: communityUpdateNeedLegal,
        explainNeedInterpretation: explainNeedInterpretation,
        needInterpretationFrequency: needInterpretationFrequency,
        needInterpretationUrgency: needInterpretationUrgency,
        communityUpdateNeedInterpretation: communityUpdateNeedInterpretation,
        explainNeedSocialServices: explainNeedSocialServices,
        needSocialServicesFrequency: needSocialServicesFrequency,
        needSocialServicesUrgency: needSocialServicesUrgency,
        communityUpdateNeedSocialServices: communityUpdateNeedSocialServices,
        explainNeedHealing: explainNeedHealing,
        needHealingFrequency: needHealingFrequency,
        needHealingUrgency: needHealingUrgency,
        communityUpdateNeedHealing: communityUpdateNeedHealing,
        explainNeedHousingShort: explainNeedHousingShort,
        needHousingShortUrgency: needHousingShortUrgency,
        communityUpdateNeedHousingShort: communityUpdateNeedHousingShort,
        explainNeedHousingLong: explainNeedHousingLong,
        needHousingLongUrgency: needHousingLongUrgency,
        communityUpdateNeedHousingLong: communityUpdateNeedHousingLong,
        explainNeedOther: explainNeedOther,
        needOtherFrequency: needOtherFrequency,
        needOtherUrgency: needOtherUrgency,
        communityUpdateNeedOther: communityUpdateNeedOther,
        formFinancialNeed: formFinancialNeed,
        explainNeedFinancial: explainNeedFinancial,
        needFinancialFrequency: needFinancialFrequency,
        needFinancialUrgency: needFinancialUrgency,
        communityUpdateNeedFinancial: communityUpdateNeedFinancial,
        needFinancialPublic: needFinancialPublic,
        explainNeighborConnections: explainNeighborConnections,
        blockCoord: blockCoord,
        networkHelp: networkHelp,
        formExplainCheckIn: formExplainCheckIn,
    }

    console.log(userFormDataObject);
    dbHandler.collection(collectionUserForm).insertOne(userFormDataObject, (error, result) => {
        if (error) {
            console.log(`There was an error adding the information to the database. The error is: ${error}`);
        } else {
            console.log(`Yes! The data was added. Here it is: ${result}`);
            res.redirect('/index');
        }
    })
    
})



module.exports = router;

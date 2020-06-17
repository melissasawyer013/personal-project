const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const dbURL = process.env.dbURL;
const dbName = process.env.dbName;
const collectionCommunityResourceSubmission = process.env.collectionCommunityResourceSubmission;
const collectionUserForm = process.env.collectionUserForm;
const collectionBlockCoord = process.env.collectionBlockCoord;
const collectionHelpSubmissions = process.env.collectionHelpSubmissions;
const PORT = process.env.PORT || 5500;
const dotenv = require('dotenv');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const PATH = require('path');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const morgan = require('morgan');
const uuid = require('uuidv4').uuid;
const ensure = require('connect-ensure-login');
const methodOverride = require('method-override');
const initializePassport = require('./passport-config');
let dbHandler;

dotenv.config();
router.use(express.urlencoded( {extended: false }));

//Connects to database
mongoClient = mongodb.MongoClient;
mongoClient.connect(dbURL, { useUnifiedTopology: true }, (err, dbClient) => {
    if (err) {
        console.log(`There was an error connecting to the database. Error: ${err}`);
    } else {
        console.log('You are connected to the database through the routes.js file.')
        dbHandler = dbClient.db(dbName);
        
    };
});

router.use(flash());

router.use(methodOverride('_method'));

router.post('/sendLogin', passport.authenticate('local', {
    successRedirect: '/update-form',
    failureRedirect: '/login',
    failureFlash: true
}))

router.get('/update-form', checkAuthenticated, (req, res) => {
    res.render('pages/update-form', {user: req.user})
})

router.get('/login', checkNotAuthenticated, (req, res) => {
    req.flash('message', 'Login successful!')
    res.render('pages/login', {
        user: req.user,
    });
});

router.delete('/logout', (req, res) => {
    req.logOut();
    res.redirect('/login')
})


function checkAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/update-form')
    }
    next()
}

router.get('/', (req, res) => {
    res.render('pages/index', {
        user: req.user,
    });  
});

router.get('/index', (req, res) => {
    res.render('pages/index', {
        user: req.user,
    });  
});

router.get('/about-us/', (req, res) => {
    res.render('pages/about-us', {
        user: req.user,
    });
});

router.get('/block-coordinator', (req, res) => {
    res.render('pages/block-coordinator', {
        user: req.user,
    });
});

router.post('/addBlockCoordSub', (req, res) => {
    const formData = req.body;
    let coordinatorName = formData['coordinatorName'];
    let coordinatorPhoneNumber = formData['coordinatorPhoneNumber'];
    let coordinatorEmailAddress = formData['coordinatorEmailAddress'];
    let coordinatorExplain = formData['coordinatorExplain'];
    const userFormDataObject = {
        coordinatorName: coordinatorName,
        coordinatorPhoneNumber: coordinatorPhoneNumber,
        coordinatorEmailAddress: coordinatorEmailAddress,
        coordinatorExplain: coordinatorExplain,
    }
    dbHandler.collection(collectionBlockCoord).insertOne(userFormDataObject, (err, res) => {
        if (err) {
            console.log(`There was an error updating the database. The error is: ${err}`);
        } else {
            console.log(`The block coordination interest form was sumbitted`);
        }
    })
    res.render('pages/block-coordinator', {
        user: req.user,
    });
});


router.get('/community-resources-add-organization', (req, res) => {
    res.render('pages/community-resources-add-organization', {
        user: req.user,
    });
});

router.get('/community-resources', (req, res) => {
    res.render('pages/community-resources', {
        user: req.user,
    });
});

router.get('/donate', (req, res) => {
    res.render('pages/donate', {
        user: req.user,
    });
});

router.get('/forgot-password', (req, res) => {
    res.render('pages/forgot-password');
});

router.get('/help', (req, res) => {
    res.render('pages/help', {
        user: req.user,
    });
});

router.post('/submitHelp', (req, res) => {
    const formData = req.body;
    let helpMessageName = formData['helpMessageName'];
    let helpMessageEmail = formData['helpMessageEmail'];
    let helpMessageText = formData['helpMessageText'];
    const userFormDataObject = {
        helpMessageName: helpMessageName,
        helpMessageEmail: helpMessageEmail,
        helpMessageText: helpMessageText,
    }
    dbHandler.collection(collectionHelpSubmissions).insertOne(userFormDataObject, (err, res) => {
        if (err) {
            console.log(`There was an error updating the database. The error is: ${err}`);
        } else {
            console.log(`The block coordination interest form was sumbitted`);
        }
    })
    res.render('pages/help', {
        user: req.user,
    });
})

router.get('/needs-and-offerings', (req, res) => {
    res.render('pages/needs-and-offerings', {
        'needsToDisplay': undefined,
        'offersToDisplay': undefined,
        user: req.user,
    }); 
}); 

router.put('/addCommunityNotes', checkAuthenticated, (function (req, res) {
    let update = req.body;
    let userID = update['userID'];
    let arrayToAppend = update['arrayToAppend'];
    arrayToAppend = arrayToAppend.split(',');
    let updateKey = update['updateKey'];
    let updateObject = {[updateKey]: arrayToAppend};
    let ObjectId = require('mongodb').ObjectID;

    dbHandler.collection(collectionUserForm)
    .updateOne({"_id" : ObjectId(userID)}, {$set: updateObject}, function(err, res) {
        if (err) {
            console.log(err);
        } else if (res) {
            console.log('added to the database');
        } else {
            console.log('not really added')
        }
    });
    res.end();
}));


router.get('/searchForNeedsAndOfferings', (function (req, res) {
    let formDataSearch = req.query;
    let searchNeighborhood = formDataSearch['searchNeighborhood'];
    let searchNeeds = formDataSearch['searchNeeds'];
    let searchOffers = formDataSearch['searchOffers'];
    let searchOffersArray = searchOffers;
    if (typeof searchOffers === 'string') {
        searchOffersArray = searchOffers.split(',');
    }
    if (searchOffersArray === undefined) {
        searchOffersArray = [];
    }
    let searchNeedsArray = searchNeeds;
    if (typeof searchNeeds === 'string') {
        searchNeedsArray = searchNeeds.split(',');
    }
    if (searchNeedsArray === undefined) {
        searchNeedsArray = [];
    }
    //This is the place where the search offerings happens
    dbHandler.collection(collectionUserForm)
    .find({formOfferings: { $in: searchOffersArray}})
    .toArray((offerError, offerResult) => {
            if (offerError) {
                console.log (offerError);
            } else {
                //expandSearchResults() function parses out the search results to separate the findings for datasets that match multiple search collections
                let allOfferEntries = expandSearchResults(offerResult, searchOffersArray, 'formOfferings');
                //the getResultSpecifics() takes the result of the expandSearchResults() function and uses a switch statement to create an array for each match that contains the data that needs to be displayed on the ejs page
                let allOfferEntriesDisplayInfoArray = getResultSpecifics(allOfferEntries);
                //This is where the search needs happens
                dbHandler.collection(collectionUserForm).find( { formNeeds: { $in: searchNeedsArray} } )
                    .toArray((needError, needResult) => {
                        if (needError) {
                            console.log (needError);
                        } else {
                            //expandSearchResults() function parses out the search results to separate the findings for datasets that match multiple search collections
                            let allNeedEntries = expandSearchResults (needResult, searchNeedsArray, 'formNeeds');   
                            //the getResultSpecifics() takes the result of the expandSearchResults() function and uses a switch statement to create an array for each match that contains the data that needs to be displayed on the ejs page
                            let allNeedEntriesDisplayInfoArray = getResultSpecifics(allNeedEntries);
                            res.render('pages/needs-and-offerings', {
                                'needsToDisplay': allNeedEntriesDisplayInfoArray,
                                'offersToDisplay': allOfferEntriesDisplayInfoArray,
                                user: req.user,
                            })
                        }
                    });
            }
        })    
}))

function expandSearchResults (allResultsArray, searchedTerms, searchTerm) {
    let allEntries = {};
    allResultsArray.forEach((singleResult) => {
    searchedTerms.forEach((singleTerm) => {
        if (singleTerm in allEntries) {
            console.log('');
        } else {
            allEntries[singleTerm] = [];
        }
        if (singleResult[searchTerm].includes(singleTerm)) {
            allEntries[singleTerm].push(singleResult);
        }
    })
    })
    return allEntries;
}

function getResultSpecifics(matchEntries) {
    let allEntriesDisplayInfoArray = [];
    for (var key of Object.keys(matchEntries)) {
        matchEntries[key].forEach(matchObject => { 
            let singleMatchArray = [
                matchObject._id,
                key,
                matchObject.formFirstName,
                matchObject.formLastName,
                matchObject.publicDisplayName,
                matchObject.formNeighborhood,
                matchObject.publicDisplayContact,
                matchObject.publicDisplayAddress,
            ]
            switch(key) {
                case 'Offer: Childcare':
                    singleMatchArray.push(matchObject.explainOfferChildcare);
                    singleMatchArray.push(matchObject.communityUpdateOfferChildcare);
                    singleMatchArray.push('communityUpdateOfferChildcare');
                    allEntriesDisplayInfoArray.push(singleMatchArray);
                    return
                case 'Offer: Cooking':
                    singleMatchArray.push(matchObject.explainOfferCooking);
                    singleMatchArray.push(matchObject.communityUpdateOfferCooking);
                    singleMatchArray.push('communityUpdateOfferCooking');
                    allEntriesDisplayInfoArray.push(singleMatchArray);
                    return
                case 'Offer: Food and Supplies':
                    singleMatchArray.push(matchObject.explainOfferFoodAndSupplies);
                    singleMatchArray.push(matchObject.communityUpdateOfferFoodAndSupplies);
                    singleMatchArray.push('communityUpdateOfferFoodAndSupplies');
                    allEntriesDisplayInfoArray.push(singleMatchArray);
                    return
                case 'Offer: Rides or Access to a Vehicle':
                    singleMatchArray.push(matchObject.explainOfferRidesCar);
                    singleMatchArray.push(matchObject.communityUpdateOfferRidesCar);
                    singleMatchArray.push('communityUpdateOfferRidesCar');
                    allEntriesDisplayInfoArray.push(singleMatchArray);
                    return
                case 'Offer: PetCare / Dog-Walking':
                    singleMatchArray.push(matchObject.explainOfferPetCare);
                    singleMatchArray.push(matchObject.communityUpdateOfferPetCare);
                    singleMatchArray.push('communityUpdateOfferPetCare');
                    allEntriesDisplayInfoArray.push(singleMatchArray);
                    return
                case 'Offer: Internet Subscriptions':
                    singleMatchArray.push(matchObject.explainOfferInternetSubs);
                    singleMatchArray.push(matchObject.communityUpdateOfferInternetSubs);
                    singleMatchArray.push('communityUpdateOfferInternetSubs');
                    allEntriesDisplayInfoArray.push(singleMatchArray);
                    return
                case 'Offer: Medical Support':
                    singleMatchArray.push(matchObject.explainOfferMedicalSupport);
                    singleMatchArray.push(matchObject.communityUpdateOfferMedicalSupport);
                    singleMatchArray.push('communityUpdateOfferMedicalSupport');
                    allEntriesDisplayInfoArray.push(singleMatchArray);
                    return
                case 'Offer: Medical Advice':
                    singleMatchArray.push(matchObject.explainOfferMedicalAdvice);
                    singleMatchArray.push(matchObject.communityUpdateOfferMedicalAdvice);
                    singleMatchArray.push('communityUpdateOfferMedicalAdvice');
                    allEntriesDisplayInfoArray.push(singleMatchArray);
                    return
                case 'Offer: Storage Space':
                    singleMatchArray.push(matchObject.explainOfferStorage);
                    singleMatchArray.push(matchObject.communityUpdateOfferStorage);
                    singleMatchArray.push('communityUpdateOfferStorage');
                    allEntriesDisplayInfoArray.push(singleMatchArray);
                    return
                case 'Offer: Art / Music / Writing':
                    singleMatchArray.push(matchObject.explainOfferArt);
                    singleMatchArray.push(matchObject.communityUpdateOfferArt);
                    singleMatchArray.push('communityUpdateOfferArt');
                    allEntriesDisplayInfoArray.push(singleMatchArray);
                    return
                case 'Offer: Mental Health Counseling / Resources':
                    singleMatchArray.push(matchObject.explainOfferMentalHealth);
                    singleMatchArray.push(matchObject.communityUpdateOfferMentalHealth);
                    singleMatchArray.push('communityUpdateOfferMentalHealth');
                    allEntriesDisplayInfoArray.push(singleMatchArray);
                    return
                case 'Offer: Conversation / Companionship':
                    singleMatchArray.push(matchObject.explainOfferCompanionship);
                    singleMatchArray.push(matchObject.communityUpdateOfferCompanionship);
                    singleMatchArray.push('communityUpdateOfferCompanionship');
                    allEntriesDisplayInfoArray.push(singleMatchArray);
                    return
                case 'Offer: Legal Representation / Advocacy':
                    singleMatchArray.push(matchObject.explainOfferLegal);
                    singleMatchArray.push(matchObject.communityUpdateOfferLegal);
                    singleMatchArray.push('communityUpdateOfferLegal');
                    allEntriesDisplayInfoArray.push(singleMatchArray);
                    return
                case 'Offer: Interpretation / Translation':
                    singleMatchArray.push(matchObject.explainOfferInterpretation);
                    singleMatchArray.push(matchObject.communityUpdateOfferInterpretation);
                    singleMatchArray.push('communityUpdateOfferInterpretation');
                    allEntriesDisplayInfoArray.push(singleMatchArray);
                    return
                case 'Offer: Social Service Guidance':
                    singleMatchArray.push(matchObject.explainOfferSocialServices);
                    singleMatchArray.push(matchObject.communityUpdateOfferSocialServices);
                    singleMatchArray.push('communityUpdateOfferSocialServices');
                    allEntriesDisplayInfoArray.push(singleMatchArray);
                    return
                case 'Offer: Healing / Ritual / Herbal Medicine':
                    singleMatchArray.push(matchObject.explainOfferHealing);
                    singleMatchArray.push(matchObject.communityUpdateOfferHealing);
                    singleMatchArray.push('communityUpdateOfferHealing');
                    allEntriesDisplayInfoArray.push(singleMatchArray);
                    return
                case 'Offer: Housing (short-term)':
                    singleMatchArray.push(matchObject.explainOfferHousingShort);
                    singleMatchArray.push(matchObject.communityUpdateOfferHousingShort);
                    singleMatchArray.push('communityUpdateOfferHousingShort');
                    allEntriesDisplayInfoArray.push(singleMatchArray);
                    return
                case 'Offer: Housing (long-term)':
                    singleMatchArray.push(matchObject.explainOfferHousingLong);
                    singleMatchArray.push(matchObject.communityUpdateOfferHousingLong);
                    singleMatchArray.push('communityUpdateOfferHousingLong');
                    allEntriesDisplayInfoArray.push(singleMatchArray);
                    return
                case 'Offer: Other':
                    singleMatchArray.push(matchObject.explainOfferOther);
                    singleMatchArray.push(matchObject.communityUpdateOfferOther);
                    singleMatchArray.push('communityUpdateOfferOther');
                    allEntriesDisplayInfoArray.push(singleMatchArray);
                    return
                case 'Need: Childcare':
                    singleMatchArray.push(matchObject.explainNeedChildcare);
                    singleMatchArray.push(matchObject.communityUpdateNeedChildcare);
                    singleMatchArray.push('communityUpdateNeedChildcare');
                    singleMatchArray.push(matchObject.needChildcareUrgency);
                    singleMatchArray.push(matchObject.needChildcareFrequency);
                    allEntriesDisplayInfoArray.push(singleMatchArray);
                    return
                case 'Need: Cooking':
                    singleMatchArray.push(matchObject.explainNeedCooking);
                    singleMatchArray.push(matchObject.communityUpdateNeedCooking);
                    singleMatchArray.push('communityUpdateNeedCooking');
                    singleMatchArray.push(matchObject.needCookingUrgency);
                    singleMatchArray.push(matchObject.needCookingFrequency);
                    allEntriesDisplayInfoArray.push(singleMatchArray);
                    return
                case 'Need: Food and Supplies':
                    singleMatchArray.push(matchObject.explainNeedFoodAndSupplies);
                    singleMatchArray.push(matchObject.communityUpdateNeedFoodAndSupplies);
                    singleMatchArray.push('communityUpdateNeedFoodAndSupplies');
                    singleMatchArray.push(matchObject.needFoodAndSuppliesUrgency);
                    singleMatchArray.push(matchObject.needFoodAndSuppliesFrequency);
                    allEntriesDisplayInfoArray.push(singleMatchArray);
                    return
                case 'Need: Rides or Access to a Vehicle':
                    singleMatchArray.push(matchObject.explainNeedRidesCar);
                    singleMatchArray.push(matchObject.communityUpdateNeedRidesCar);
                    singleMatchArray.push('communityUpdateNeedRidesCar');
                    singleMatchArray.push(matchObject.needRidesCarUrgency);
                    singleMatchArray.push(matchObject.needRidesCarFrequency);
                    allEntriesDisplayInfoArray.push(singleMatchArray);
                    return
                case 'Need: PetCare / Dog-Walking':
                    singleMatchArray.push(matchObject.explainNeedPetCare);
                    singleMatchArray.push(matchObject.communityUpdateNeedPetCare);
                    singleMatchArray.push('communityUpdateNeedPetCare');
                    singleMatchArray.push(matchObject.needPetCareUrgency);
                    singleMatchArray.push(matchObject.needPetCareFrequency);
                    allEntriesDisplayInfoArray.push(singleMatchArray);
                    return
                case 'Need: Internet Subscriptions':
                    singleMatchArray.push(matchObject.explainNeedInternetSubscriptions);
                    singleMatchArray.push(matchObject.communityUpdateNeedInternetSubscriptions);
                    singleMatchArray.push('communityUpdateNeedInternetSubscriptions');
                    allEntriesDisplayInfoArray.push(singleMatchArray);
                    return
                case 'Need: Medical Support':
                    singleMatchArray.push(matchObject.explainNeedMedicalSupport);
                    singleMatchArray.push(matchObject.communityUpdateNeedMedicalSupport);
                    singleMatchArray.push('communityUpdateNeedMedicalSupport');
                    singleMatchArray.push(matchObject.needMedicalSupportUrgency);
                    singleMatchArray.push(matchObject.needMedicalSupportFrequency);
                    allEntriesDisplayInfoArray.push(singleMatchArray);
                    return
                case 'Need: Medical Advice':
                    singleMatchArray.push(matchObject.explainNeedMedicalAdvice);
                    singleMatchArray.push(matchObject.communityUpdateNeedMedicalAdvice);
                    singleMatchArray.push('communityUpdateNeedMedicalAdvice');
                    singleMatchArray.push(matchObject.needMedicalAdviceUrgency);
                    allEntriesDisplayInfoArray.push(singleMatchArray);
                    return
                case 'Need: Storage Space':
                    singleMatchArray.push(matchObject.explainNeedStorage);
                    singleMatchArray.push(matchObject.communityUpdateNeedStorage);
                    singleMatchArray.push('communityUpdateNeedStorage');
                    singleMatchArray.push(matchObject.needStorageUrgency);
                    allEntriesDisplayInfoArray.push(singleMatchArray);
                    return
                case 'Need: Art / Music / Writing':
                    singleMatchArray.push(matchObject.explainNeedArt);
                    singleMatchArray.push(matchObject.communityUpdateNeedArt);
                    singleMatchArray.push('communityUpdateNeedArt');
                    singleMatchArray.push(matchObject.needArtUrgency);
                    singleMatchArray.push(matchObject.needArtFrequency);
                    allEntriesDisplayInfoArray.push(singleMatchArray);
                    return
                case 'Need: Mental Health Counseling':
                    singleMatchArray.push(matchObject.explainNeedMentalHealth);
                    singleMatchArray.push(matchObject.communityUpdateNeedMentalHealth);
                    singleMatchArray.push('communityUpdateNeedMentalHealth');
                    singleMatchArray.push(matchObject.needMentalHealthUrgency);
                    singleMatchArray.push(matchObject.needMentalHealthFrequency);
                    allEntriesDisplayInfoArray.push(singleMatchArray);
                    return
                case 'Need: Conversation / Companionship':
                    singleMatchArray.push(matchObject.explainNeedCompanionship);
                    singleMatchArray.push(matchObject.communityUpdateNeedCompanionship);
                    singleMatchArray.push('communityUpdateNeedCompanionship');
                    singleMatchArray.push(matchObject.needCompanionshipUrgency);
                    singleMatchArray.push(matchObject.needCompanionshipFrequency);
                    allEntriesDisplayInfoArray.push(singleMatchArray);
                    return
                case 'Need: Legal Representation / Advocacy':
                    singleMatchArray.push(matchObject.explainNeedLegal);
                    singleMatchArray.push(matchObject.communityUpdateNeedLegal);
                    singleMatchArray.push('communityUpdateNeedLegal');
                    singleMatchArray.push(matchObject.needLegalUrgency);
                    allEntriesDisplayInfoArray.push(singleMatchArray);
                    return
                case 'Need: Interpretation / Translation':
                    singleMatchArray.push(matchObject.explainNeedInterpretation);
                    singleMatchArray.push(matchObject.communityUpdateNeedInterpretation);
                    singleMatchArray.push('communityUpdateNeedInterpretation');
                    singleMatchArray.push(matchObject.needInterpretationUrgency);
                    singleMatchArray.push(matchObject.needInterpretationFrequency);
                    allEntriesDisplayInfoArray.push(singleMatchArray);
                    return
                case 'Need: Social Service Guidance':
                    singleMatchArray.push(matchObject.explainNeedSocialServices);
                    singleMatchArray.push(matchObject.communityUpdateNeedSocialServices);
                    singleMatchArray.push('communityUpdateNeedSocialServices');
                    singleMatchArray.push(matchObject.needSocialServicesUrgency);
                    singleMatchArray.push(matchObject.needSocialServicesFrequency);
                    allEntriesDisplayInfoArray.push(singleMatchArray);
                    return
                case 'Need: Healing / Ritual / Herbal Medicine':
                    singleMatchArray.push(matchObject.explainNeedHealing);
                    singleMatchArray.push(matchObject.communityUpdateNeedHealing);
                    singleMatchArray.push('communityUpdateNeedHealing');
                    singleMatchArray.push(matchObject.needHealingUrgency);
                    singleMatchArray.push(matchObject.needHealingFrequency);
                    allEntriesDisplayInfoArray.push(singleMatchArray);
                    return
                case 'Need: Housing (short-term)':
                    singleMatchArray.push(matchObject.explainNeedHousingShort);
                    singleMatchArray.push(matchObject.communityUpdateNeedHousingShort);
                    singleMatchArray.push('communityUpdateNeedHousingShort');
                    singleMatchArray.push(matchObject.needHousingShortUrgency);
                    allEntriesDisplayInfoArray.push(singleMatchArray);
                    return
                case 'Need: Housing (long-term)':
                    singleMatchArray.push(matchObject.explainNeedHousingLong);
                    singleMatchArray.push(matchObject.communityUpdateNeedHousingLong);
                    singleMatchArray.push('communityUpdateNeedHousingLong');
                    singleMatchArray.push(matchObject.needHousingLongUrgency);
                    allEntriesDisplayInfoArray.push(singleMatchArray);
                    return
                case 'Need: Other':
                    singleMatchArray.push(matchObject.explainNeedOther);
                    singleMatchArray.push(matchObject.communityUpdateNeedOther);
                    singleMatchArray.push('communityUpdateNeedOther');
                    singleMatchArray.push(matchObject.needOtherUrgency);
                    singleMatchArray.push(matchObject.needOtherFrequency);
                    allEntriesDisplayInfoArray.push(singleMatchArray);
                    return
                // case 'Financial Need':
            }
        })
    }
    return allEntriesDisplayInfoArray;
}

router.post('/addResourceSubmission', (req, res) => {
    const formData = req.body;
    let nomResourceName = formData['nomResourceName'];
    let nomResourceURL = formData['nomResourceURL'];
    let nomResourceInfo = formData['nomResourceInfo'];
    let nomResourceConnection = formData['nomResourceConnection'];
    let nomResourceContact = formData['nomResourceContact'];
    const userFormDataObject = {
        nomResourceName: nomResourceName,
        nomResourceURL: nomResourceURL,
        nomResourceInfo: nomResourceInfo,
        nomResourceConnection: nomResourceConnection,
        nomResourceContact: nomResourceContact,
    }
    dbHandler.collection(collectionCommunityResourceSubmission).insertOne(userFormDataObject, (err, res) => {
        if (err) {
            message = `The community resource was sumbitted.`;
            console.log(`There was an error updating the database. The error is: ${err}`);
        } else {
            console.log(`Yes! The community resource was submitted.`);   
        }
    })
    console.log(userFormDataObject);
    res.render('pages/community-resources-add-organization', {
        user: req.user,
    });
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
    let communityUpdateOfferChildcare = [];
    let explainOfferCooking = formData['explainOfferCooking'];
    let communityUpdateOfferCooking = [];
    let explainOfferFoodAndSupplies = formData['explainOfferFoodAndSupplies'];
    let communityUpdateOfferFoodAndSupplies = [];
    let explainOfferRidesCar = formData['explainOfferRidesCar'];
    let communityUpdateOfferRidesCar = [];
    let explainOfferPetCare = formData['explainOfferPetCare'];
    let communityUpdateOfferPetCare = [];
    let explainOfferInternetSubs = formData['explainOfferInternetSubs'];
    let communityUpdateOfferInternetSubs = [];
    let explainOfferMedicalSupport = formData['explainOfferMedicalSupport'];
    let communityUpdateOfferMedicalSupport = [];
    let explainOfferMedicalAdvice = formData['explainOfferMedicalAdvice'];
    let communityUpdateOfferMedicalAdvice = [];
    let explainOfferStorage = formData['explainOfferStorage'];
    let communityUpdateOfferStorage = [];
    let explainOfferArt = formData['explainOfferArt'];
    let communityUpdateOfferArt = [];
    let explainOfferMentalHealth = formData['explainOfferMentalHealth'];
    let communityUpdateOfferMentalHealth = [];
    let explainOfferCompanionship = formData['explainOfferCompanionship'];
    let communityUpdateOfferCompanionship = [];
    let explainOfferLegal = formData['explainOfferLegal'];
    let communityUpdateOfferLegal = [];
    let explainOfferInterpretation = formData['explainOfferInterpretation'];
    let communityUpdateOfferInterpretation = [];
    let explainOfferSocialServices = formData['explainOfferSocialServices'];
    let communityUpdateOfferSocialServices = [];
    let explainOfferHealing = formData['explainOfferHealing'];
    let communityUpdateOfferHealing = [];
    let explainOfferHousingShort = formData['explainOfferHousingShort'];
    let communityUpdateOfferHousingShort = [];
    let explainOfferHousingLong = formData['explainOfferHousingLong'];
    let communityUpdateOfferHousingLong = [];
    let explainOfferOther = formData['explainOfferOther'];
    let communityUpdateOfferOther = [];
    let formGiveMoney = formData['formGiveMoney'];
    let formNeeds = formData['formNeeds'];
    let explainNeedChildcare = formData['explainNeedChildcare'];
    let needChildcareFrequency = formData['needChildcareFrequency'];
    let needChildcareUrgency = formData['needChildcareUrgency'];
    let communityUpdateNeedChildcare = [];
    let explainNeedCooking = formData['explainNeedCooking'];
    let needCookingFrequency = formData['needCookingFrequency'];
    let needCookingUrgency = formData['needCookingUrgency'];
    let communityUpdateNeedCooking = [];
    let explainNeedFoodAndSupplies = formData['explainNeedFoodAndSupplies'];
    let needFoodAndSuppliesFrequency = formData['needFoodAndSuppliesFrequency'];
    let needFoodAndSuppliesUrgency = formData['needFoodAndSuppliesUrgency'];
    let communityUpdateNeedFoodAndSupplies = [];
    let explainNeedRidesCar = formData['explainNeedRidesCar'];
    let needRidesCarFrequency = formData['needRidesCarFrequency'];
    let needRidesCarUrgency = formData['needRidesCarUrgency'];
    let communityUpdateNeedRidesCar = [];
    let explainNeedPetCare = formData['explainNeedPetCare'];
    let needPetCareFrequency = formData['needPetCareFrequency'];
    let needPetCareUrgency = formData['needPetCareUrgency'];
    let communityUpdateNeedPetCare = [];
    let explainNeedInternetSubscriptions = formData['explainNeedInternetSubscriptions'];
    let communityUpdateNeedInternetSubscriptions = [];
    let explainNeedMedicalSupport = formData['explainNeedMedicalSupport'];
    let needMedicalSupportFrequency = formData['needMedicalSupportFrequency'];
    let needMedicalSupportUrgency = formData['needMedicalSupportUrgency'];
    let communityUpdateNeedMedicalSupport = [];
    let explainNeedMedicalAdvice = formData['explainNeedMedicalAdvice'];
    let needMedicalAdviceUrgency = formData['needMedicalAdviceUrgency'];
    let communityUpdateNeedMedicalAdvice = [];
    let explainNeedStorage = formData['explainNeedStorage'];
    let needStorageUrgency = formData['needStorageUrgency'];
    let communityUpdateNeedStorage = [];
    let explainNeedArt = formData['explainNeedArt'];
    let needArtFrequency = formData['needArtFrequency'];
    let needArtUrgency = formData['needArtUrgency'];
    let communityUpdateNeedArt = [];
    let explainNeedMentalHealth = formData['explainNeedMentalHealth'];
    let needMentalHealthFrequency = formData['needMentalHealthFrequency'];
    let needMentalHealthUrgency = formData['needMentalHealthUrgency'];
    let communityUpdateNeedMentalHealth = [];
    let explainNeedCompanionship = formData['explainNeedCompanionship'];
    let needCompanionshipFrequency = formData['needCompanionshipFrequency'];
    let needCompanionshipUrgency = formData['needCompanionshipUrgency'];
    let communityUpdateNeedCompanionship = [];
    let explainNeedLegal = formData['explainNeedLegal'];
    let needLegalUrgency = formData['needLegalUrgency'];
    let communityUpdateNeedLegal = [];
    let explainNeedInterpretation = formData['explainNeedInterpretation'];
    let needInterpretationFrequency = formData['needInterpretationFrequency'];
    let needInterpretationUrgency = formData['needInterpretationUrgency'];
    let communityUpdateNeedInterpretation = [];
    let explainNeedSocialServices = formData['explainNeedSocialServices'];
    let needSocialServicesFrequency = formData['needSocialServicesFrequency'];
    let needSocialServicesUrgency = formData['needSocialServicesUrgency'];
    let communityUpdateNeedSocialServices = [];
    let explainNeedHealing = formData['explainNeedHealing'];
    let needHealingFrequency = formData['needHealingFrequency'];
    let needHealingUrgency = formData['needHealingUrgency'];
    let communityUpdateNeedHealing = [];
    let explainNeedHousingShort = formData['explainNeedHousingShort'];
    let needHousingShortUrgency = formData['needHousingShortUrgency'];
    let communityUpdateNeedHousingShort = [];
    let explainNeedHousingLong = formData['explainNeedHousingLong'];
    let needHousingLongUrgency = formData['needHousingLongUrgency'];
    let communityUpdateNeedHousingLong = [];
    let explainNeedOther = formData['explainNeedOther'];
    let needOtherFrequency = formData['needOtherFrequency'];
    let needOtherUrgency = formData['needOtherUrgency'];
    let communityUpdateNeedOther = [];
    let formFinancialNeed = formData['formFinancialNeed'];
    let explainNeedFinancial = formData['explainNeedFinancial'];
    let needFinancialFrequency = formData['needFinancialFrequency'];
    let needFinancialUrgency = formData['needFinancialUrgency'];
    let communityUpdateNeedFinancial = [];
    let needFinancialPublic = formData['needFinancialPublic'];
    let explainNeighborConnections = formData['explainNeighborConnections'];
    let blockCoord = formData['blockCoord'];
    let networkHelp = formData['networkHelp'];
    let formExplainCheckIn = formData['formExplainCheckIn'];
    let username = formData['username'];
    let password = formData['password'];
    let formPasswordB = formData['formPasswordB'];
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
        username: username,
        password: password,
        formPasswordB: formPasswordB
    }

    let errors = [];
    // if (formEmail != username) {
    //     errors.push({msg: 'Email addresses must match.'});
    // }
    if (password != formPasswordB) {
        errors.push({msg: "Password entries do not match."})
    }
    if (password.length < 6) {
        errors.push({msg: "Password should be at least 6 characters."})
    }
    if (errors.length > 0) {
        res.render('pages/index', {
            errors,
            formData,
        });
    } else {
        bcrypt.genSalt(10, (err, salt) => 
            bcrypt.hash(userFormDataObject.password, salt, (err, hash) => {
                if(err) throw err;
                //Set password to hashed
                userFormDataObject.password = hash;
                //Save user
                dbHandler.collection(collectionUserForm).insertOne(userFormDataObject, (error, result) => {
                    if (error) {
                        console.log(`There was an error adding the information to the database. The error is: ${error}`);
                    } else {
                        res.redirect('/login');
                        req.flash('successMsg', "You are now registered and able to login.");
                    }
                })
        }))  
    } 
});

router.post('/updateFormData', (req, res) => {
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
    let communityUpdateOfferChildcare = [];
    let explainOfferCooking = formData['explainOfferCooking'];
    let communityUpdateOfferCooking = [];
    let explainOfferFoodAndSupplies = formData['explainOfferFoodAndSupplies'];
    let communityUpdateOfferFoodAndSupplies = [];
    let explainOfferRidesCar = formData['explainOfferRidesCar'];
    let communityUpdateOfferRidesCar = [];
    let explainOfferPetCare = formData['explainOfferPetCare'];
    let communityUpdateOfferPetCare = [];
    let explainOfferInternetSubs = formData['explainOfferInternetSubs'];
    let communityUpdateOfferInternetSubs = [];
    let explainOfferMedicalSupport = formData['explainOfferMedicalSupport'];
    let communityUpdateOfferMedicalSupport = [];
    let explainOfferMedicalAdvice = formData['explainOfferMedicalAdvice'];
    let communityUpdateOfferMedicalAdvice = [];
    let explainOfferStorage = formData['explainOfferStorage'];
    let communityUpdateOfferStorage = [];
    let explainOfferArt = formData['explainOfferArt'];
    let communityUpdateOfferArt = [];
    let explainOfferMentalHealth = formData['explainOfferMentalHealth'];
    let communityUpdateOfferMentalHealth = [];
    let explainOfferCompanionship = formData['explainOfferCompanionship'];
    let communityUpdateOfferCompanionship = [];
    let explainOfferLegal = formData['explainOfferLegal'];
    let communityUpdateOfferLegal = [];
    let explainOfferInterpretation = formData['explainOfferInterpretation'];
    let communityUpdateOfferInterpretation = [];
    let explainOfferSocialServices = formData['explainOfferSocialServices'];
    let communityUpdateOfferSocialServices = [];
    let explainOfferHealing = formData['explainOfferHealing'];
    let communityUpdateOfferHealing = [];
    let explainOfferHousingShort = formData['explainOfferHousingShort'];
    let communityUpdateOfferHousingShort = [];
    let explainOfferHousingLong = formData['explainOfferHousingLong'];
    let communityUpdateOfferHousingLong = [];
    let explainOfferOther = formData['explainOfferOther'];
    let communityUpdateOfferOther = [];
    let formGiveMoney = formData['formGiveMoney'];
    let formNeeds = formData['formNeeds'];
    let explainNeedChildcare = formData['explainNeedChildcare'];
    let needChildcareFrequency = formData['needChildcareFrequency'];
    let needChildcareUrgency = formData['needChildcareUrgency'];
    let communityUpdateNeedChildcare = [];
    let explainNeedCooking = formData['explainNeedCooking'];
    let needCookingFrequency = formData['needCookingFrequency'];
    let needCookingUrgency = formData['needCookingUrgency'];
    let communityUpdateNeedCooking = [];
    let explainNeedFoodAndSupplies = formData['explainNeedFoodAndSupplies'];
    let needFoodAndSuppliesFrequency = formData['needFoodAndSuppliesFrequency'];
    let needFoodAndSuppliesUrgency = formData['needFoodAndSuppliesUrgency'];
    let communityUpdateNeedFoodAndSupplies = [];
    let explainNeedRidesCar = formData['explainNeedRidesCar'];
    let needRidesCarFrequency = formData['needRidesCarFrequency'];
    let needRidesCarUrgency = formData['needRidesCarUrgency'];
    let communityUpdateNeedRidesCar = [];
    let explainNeedPetCare = formData['explainNeedPetCare'];
    let needPetCareFrequency = formData['needPetCareFrequency'];
    let needPetCareUrgency = formData['needPetCareUrgency'];
    let communityUpdateNeedPetCare = [];
    let explainNeedInternetSubscriptions = formData['explainNeedInternetSubscriptions'];
    let communityUpdateNeedInternetSubscriptions = [];
    let explainNeedMedicalSupport = formData['explainNeedMedicalSupport'];
    let needMedicalSupportFrequency = formData['needMedicalSupportFrequency'];
    let needMedicalSupportUrgency = formData['needMedicalSupportUrgency'];
    let communityUpdateNeedMedicalSupport = [];
    let explainNeedMedicalAdvice = formData['explainNeedMedicalAdvice'];
    let needMedicalAdviceUrgency = formData['needMedicalAdviceUrgency'];
    let communityUpdateNeedMedicalAdvice = [];
    let explainNeedStorage = formData['explainNeedStorage'];
    let needStorageUrgency = formData['needStorageUrgency'];
    let communityUpdateNeedStorage = [];
    let explainNeedArt = formData['explainNeedArt'];
    let needArtFrequency = formData['needArtFrequency'];
    let needArtUrgency = formData['needArtUrgency'];
    let communityUpdateNeedArt = [];
    let explainNeedMentalHealth = formData['explainNeedMentalHealth'];
    let needMentalHealthFrequency = formData['needMentalHealthFrequency'];
    let needMentalHealthUrgency = formData['needMentalHealthUrgency'];
    let communityUpdateNeedMentalHealth = [];
    let explainNeedCompanionship = formData['explainNeedCompanionship'];
    let needCompanionshipFrequency = formData['needCompanionshipFrequency'];
    let needCompanionshipUrgency = formData['needCompanionshipUrgency'];
    let communityUpdateNeedCompanionship = [];
    let explainNeedLegal = formData['explainNeedLegal'];
    let needLegalUrgency = formData['needLegalUrgency'];
    let communityUpdateNeedLegal = [];
    let explainNeedInterpretation = formData['explainNeedInterpretation'];
    let needInterpretationFrequency = formData['needInterpretationFrequency'];
    let needInterpretationUrgency = formData['needInterpretationUrgency'];
    let communityUpdateNeedInterpretation = [];
    let explainNeedSocialServices = formData['explainNeedSocialServices'];
    let needSocialServicesFrequency = formData['needSocialServicesFrequency'];
    let needSocialServicesUrgency = formData['needSocialServicesUrgency'];
    let communityUpdateNeedSocialServices = [];
    let explainNeedHealing = formData['explainNeedHealing'];
    let needHealingFrequency = formData['needHealingFrequency'];
    let needHealingUrgency = formData['needHealingUrgency'];
    let communityUpdateNeedHealing = [];
    let explainNeedHousingShort = formData['explainNeedHousingShort'];
    let needHousingShortUrgency = formData['needHousingShortUrgency'];
    let communityUpdateNeedHousingShort = [];
    let explainNeedHousingLong = formData['explainNeedHousingLong'];
    let needHousingLongUrgency = formData['needHousingLongUrgency'];
    let communityUpdateNeedHousingLong = [];
    let explainNeedOther = formData['explainNeedOther'];
    let needOtherFrequency = formData['needOtherFrequency'];
    let needOtherUrgency = formData['needOtherUrgency'];
    let communityUpdateNeedOther = [];
    let formFinancialNeed = formData['formFinancialNeed'];
    let explainNeedFinancial = formData['explainNeedFinancial'];
    let needFinancialFrequency = formData['needFinancialFrequency'];
    let needFinancialUrgency = formData['needFinancialUrgency'];
    let communityUpdateNeedFinancial = [];
    let needFinancialPublic = formData['needFinancialPublic'];
    let explainNeighborConnections = formData['explainNeighborConnections'];
    let blockCoord = formData['blockCoord'];
    let networkHelp = formData['networkHelp'];
    let formExplainCheckIn = formData['formExplainCheckIn'];
    let userId = formData['userId'];
    let username = formData['username'];
    let password = formData['password'];
    let formPasswordB = formData['formPasswordB'];
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
    var ObjectID = require('mongodb').ObjectID;
    dbHandler.collection(collectionUserForm).updateOne({"_id": ObjectID(userId)}, {$set: userFormDataObject}, function(err, res) {
        if (err) {
            console.log(`There was an error updating the database. The error is: ${err}`);
        } else {
            console.log(`Yes! The data was updated.`);
        }
    })
    res.redirect('/update-form');
});

module.exports = router;

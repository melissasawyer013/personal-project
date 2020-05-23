// Import the Express module and 
// Create an instance of Express
const express = require('express');
const router = express.Router();
const PATH = require('path');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');

const app = express();
const PORT = 5500;



//configuring EJS
// This is the function that is triggered each time our server receives a request from the client
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(PATH.join(__dirname, 'public')));

app.use(router);
const route = require('./routes/routes');
app.use('/', route);

let dbHandler;
const dbURL = 'mongodb://localhost:27017';
const dbName = 'DCCN'
const collectionUserForm = 'userFormData'

// Starts the app's server by listening to port 5500
app.listen(PORT, function() {
    console.log(`App running on port ${PORT}`);
    //Connects to database
    mongoClient = mongodb.MongoClient;
    mongoClient.connect(dbURL, { useUnifiedTopology: true }, (err, dbClient) => {
        if (err) {
            console.log(`There was an error connecting to the database. Error: ${err}`);
        } else {
            console.log('You are connected to the database!')
            dbHandler = dbClient.db(dbName);
        };
    });
});


app.get('/searchNeedsOfferings', (req, res) => {
    dbHandler.collection(collectionUserForm).find({formOfferings: 'formOfferPetCare'}, {projection: {formFirstName: 1, formLastName:1, formOfferings: 1, explainOfferPetCare: 1}}).toArray((err, result) => {
        if (err) {
            console.log(`ERROR: ${err}`);
        } else {
            console.log(result);
            let data = {}; //attribute is the category name (ex. childcare)
            // value is an array of the listing that belong only to that category
            result.forEach( (singleMatch) => {
                const category = singleMatch.searchOfferings; //How I want to group the categories
                if (!category in data) {
                    data[category] = [];
                } 
                data[category].push(singleMatch)
            })
            res.render('listings', {
                categorizedData: data
            });
        }
    })
})

// app.get('/searchNeedsOfferings', (req, res) => {
//     dbHandler.collection(collectionUserForm).find({formOfferings: 'formOfferPetCare'}, {projection: {formFirstName: 1, formLastName:1, formOfferings: 1, explainOfferPetCare: 1}}).toArray((err, result) => {
//         if (err) {
//             console.log(`ERROR: ${err}`);
//         } else {
//             console.log(result);
//             res.redirect('/needs-and-offerings', {
//                 'allMatches' : result
//             }
//             );
//         }
//     })
// })


app.post('/addFormData', (req, res) => {
    const formData = req.body;
    let formFirstName = formData['formFirstName'];
    let formLastName = formData['formLastName'];
    const formPublicDisplayName = formData['formPublicDisplayName'];
    let publicDisplayName = `${formFirstName} ${formLastName}`;   
    // (formData['formPublicDisplayName'] === "formFullNamePublic")
        if (formData['formPublicDisplayName'] === "firstNameOnlyPublic") {
            publicDisplayName = `${formFirstName}`;
        } else if (formData['formPublicDisplayName'] === "formLastNameOnlyPublic") {
            publicDisplayName = `${formLastName}`;
        } else {
            publicDisplayName = `Anonymous Neighbor`;
        };
    const formPhoneNumber = formData['formPhoneNumber'];
    const formEmail = formData['formEmail'];
    const formPublicDisplayContact = formData['formPublicDisplayContact'];
    let publicDisplayContact;
        if (formPublicDisplayContact = "formPhoneAndEmailPublic") {
            publicDisplayContact = `${formPhoneNumber} or ${formEmail}`;
        } else if (formPublicDisplayContact === "formPhoneNumberOnlyPublic") {
            publicDisplayContact = `${formPhoneNumber}`;
        } else if (formPublicDisplayContact === "formEmailOnlyPublic") {
            publicDisplayContact = `${formEmail}`;
        } else {
            publicDisplayContact = `No contact provided. Please email DorchesterCommunityCare@gmail.com to get in contact with this neightbor.`
        }
    const formAddressHouseNumber = formData['formAddressHouseNumber'];
    const formAddressStreetName = formData['formAddressStreetName'];
    const formAddressApartmentNumber = formData['formAddressApartmentNumber'];
    const formNeighborhood = formData['formNeighborhood'];
    const formPublicDisplayAddress = formData['formPublicDisplayAddress'];
    let publicDisplayAddress;
        if (formPublicDisplayAddress === "formFullAddressPublic") {
            publicDisplayAddress = `${formNeighborhood}: ${formAddressHouseNumber} ${formAddressStreetName} ${formAddressApartmentNumber}`;
        } else if (formPublicDisplayAddress === "formStreetNameOnlyPublic") {
            publicDisplayAddress = `${formNeighborhood}: ${formAddressStreetName}`;
        } else {
            publicDisplayAddress = `${formNeighborhood}`;
        }
    const formOfferings = formData['formOfferings'];
    const explainOfferChildcare = formData['explainOfferChildcare'];
    const explainOfferCooking = formData['explainOfferCooking'];
    const explainOfferFoodAndSupplies = formData['explainOfferFoodAndSupplies'];
    const explainOfferRidesCar = formData['explainOfferRidesCar'];
    const explainOfferPetCare = formData['explainOfferPetCare'];
    const explainOfferInternetSubs = formData['explainOfferInternetSubs'];
    const explainOfferMedicalSupport = formData['explainOfferMedicalSupport'];
    const explainOfferMedicalAdvice = formData['explainOfferMedicalAdvice'];
    const explainOfferStorage = formData['explainOfferStorage'];
    const explainOfferArt = formData['explainOfferArt'];
    const explainOfferMentalHealth = formData['explainOfferMentalHealth'];
    const explainOfferCompanionship = formData['explainOfferCompanionship'];
    const explainOfferLegal = formData['explainOfferLegal'];
    const explainOfferInterpretation = formData['explainOfferInterpretation'];
    const explainOfferSocialServices = formData['explainOfferSocialServices'];
    const explainOfferHealing = formData['explainOfferHealing'];
    const explainOffeHousingShort = formData['explainOffeHousingShort'];
    const explainOffeHousingLong = formData['explainOffeHousingLong'];
    const explainOfferOther = formData['explainOfferOther'];
    const formGiveMoney = formData['formGiveMoney'];
    const formNeeds = formData['formNeeds'];
    const explainNeedChildcare = formData['explainNeedChildcare'];
    const needChildcareFrequency = formData['needChildcareFrequency'];
    const needChildcareUrgency = formData['needChildcareUrgency'];
    const explainNeedCooking = formData['explainNeedCooking'];
    const needCookingFrequency = formData['needCookingFrequency'];
    const needCookingUrgency = formData['needCookingUrgency'];
    const explainNeedFoodAndSupplies = formData['explainNeedFoodAndSupplies'];
    const needFoodAndSuppliesFrequency = formData['needFoodAndSuppliesFrequency'];
    const needFoodAndSuppliesUrgency = formData['needFoodAndSuppliesUrgency'];
    const explainNeedRidesCar = formData['explainNeedRidesCar'];
    const needRidesCarFrequency = formData['needRidesCarFrequency'];
    const needRidesCarUrgency = formData['needRidesCarUrgency'];
    const explainNeedPetcare = formData['explainNeedPetcare'];
    const needPetcareFrequency = formData['needPetcareFrequency'];
    const needPetcareUrgency = formData['needPetcareUrgency'];
    const explainNeedInternetSubscriptions = formData['explainNeedInternetSubscriptions'];
    const explainNeedMedicalSupport = formData['explainNeedMedicalSupport'];
    const needMedicalSupportFrequency = formData['needMedicalSupportFrequency'];
    const needMedicalSupportUrgency = formData['needMedicalSupportUrgency'];
    const explainNeedMedicalAdvice = formData['explainNeedMedicalAdvice'];
    const needMedicalAdviceUrgency = formData['needMedicalAdviceUrgency'];
    const explainNeedneedStorage = formData['explainNeedneedStorage'];
    const needStorageUrgency = formData['needStorageUrgency'];
    const explainNeedArt = formData['explainNeedArt'];
    const needArtFrequency = formData['needArtFrequency'];
    const needArtUrgency = formData['needArtUrgency'];
    const explainNeedMentalHealth = formData['explainNeedMentalHealth'];
    const needMentalHealthFrequency = formData['needMentalHealthFrequency'];
    const needMentalHealthUrgency = formData['needMentalHealthUrgency'];
    const explainNeedCompanionship = formData['explainNeedCompanionship'];
    const needCompanionshipFrequency = formData['needCompanionshipFrequency'];
    const needCompanionshipUrgency = formData['needCompanionshipUrgency'];
    const explainNeedLegal = formData['explainNeedLegal'];
    const needLegalUrgency = formData['needLegalUrgency'];
    const explainNeedInterpretation = formData['explainNeedInterpretation'];
    const needInterpretationFrequency = formData['needInterpretationFrequency'];
    const needInterpretationUrgency = formData['needInterpretationUrgency'];
    const explainNeedSocialServices = formData['explainNeedSocialServices'];
    const needSocialServicesFrequency = formData['needSocialServicesFrequency'];
    const needSocialServicesUrgency = formData['needSocialServicesUrgency'];
    const explainNeedHealing = formData['explainNeedHealing'];
    const needHealingFrequency = formData['needHealingFrequency'];
    const needHealingUrgency = formData['needHealingUrgency'];
    const explainNeedHousingShort = formData['explainNeedHousingShort'];
    const needHousingShortUrgency = formData['needHousingShortUrgency'];
    const explainNeedHousingLong = formData['explainNeedHousingLong'];
    const needHousingLongUrgency = formData['needHousingLongUrgency'];
    const explainNeedOther = formData['explainNeedOther'];
    const needOtherFrequency = formData['needOtherFrequency'];
    const needOtherUrgency = formData['needOtherUrgency'];
    const formFinancialNeed = formData['formFinancialNeed'];
    const explainNeedFinancial = formData['explainNeedFinancial'];
    const needFinancialFrequency = formData['needFinancialFrequency'];
    const needFinancialUrgency = formData['needFinancialUrgency'];
    const needFinancialPublic = formData['needFinancialPublic'];
    const explainNeighborConnections = formData['explainNeighborConnections'];
    const blockCoord = formData['blockCoord'];
    const networkHelp = formData['networkHelp'];
    const formExplainCheckIn = formData['formExplainCheckIn'];

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
        explainOfferCooking: explainOfferCooking,
        explainOfferFoodAndSupplies: explainOfferFoodAndSupplies,
        explainOfferRidesCar: explainOfferRidesCar,
        explainOfferPetCare: explainOfferPetCare,
        explainOfferInternetSubs: explainOfferInternetSubs,
        explainOfferMedicalSupport: explainOfferMedicalSupport,
        explainOfferMedicalAdvice: explainOfferMedicalAdvice,
        explainOfferStorage: explainOfferStorage,
        explainOfferArt: explainOfferArt,
        explainOfferMentalHealth: explainOfferMentalHealth,
        explainOfferCompanionship: explainOfferCompanionship,
        explainOfferLegal: explainOfferLegal,
        explainOfferInterpretation: explainOfferInterpretation,
        explainOfferSocialServices: explainOfferSocialServices,
        explainOfferHealing: explainOfferHealing,
        explainOffeHousingShort: explainOffeHousingShort,
        explainOffeHousingLong: explainOffeHousingLong,
        explainOfferOther: explainOfferOther,
        formGiveMoney:formGiveMoney,
        formNeeds: formNeeds,
        explainNeedChildcare: explainNeedChildcare,
        needChildcareFrequency: needChildcareFrequency,
        needChildcareUrgency: needChildcareUrgency,
        explainNeedCooking: explainNeedCooking,
        needCookingFrequency: needCookingFrequency,
        needCookingUrgency: needCookingUrgency,
        explainNeedFoodAndSupplies: explainNeedFoodAndSupplies,
        needFoodAndSuppliesFrequency: needFoodAndSuppliesFrequency,
        needFoodAndSuppliesUrgency: needFoodAndSuppliesUrgency,
        explainNeedRidesCar: explainNeedRidesCar,
        needRidesCarFrequency: needRidesCarFrequency,
        needRidesCarUrgency: needRidesCarUrgency,
        explainNeedPetcare: explainNeedPetcare,
        needPetcareFrequency: needPetcareFrequency,
        needPetcareUrgency: needPetcareUrgency,
        explainNeedInternetSubscriptions: explainNeedInternetSubscriptions,
        explainNeedMedicalSupport: explainNeedMedicalSupport,
        needMedicalSupportFrequency: needMedicalSupportFrequency,
        needMedicalSupportUrgency: needMedicalSupportUrgency,
        explainNeedMedicalAdvice: explainNeedMedicalAdvice,
        needMedicalAdviceUrgency: needMedicalAdviceUrgency,
        explainNeedneedStorage: explainNeedneedStorage,
        needStorageUrgency: needStorageUrgency,
        explainNeedArt: explainNeedArt,
        needArtFrequency: needArtFrequency,
        needArtUrgency: needArtUrgency,
        explainNeedMentalHealth: explainNeedMentalHealth,
        needMentalHealthFrequency: needMentalHealthFrequency,
        needMentalHealthUrgency: needMentalHealthUrgency,
        explainNeedCompanionship: explainNeedCompanionship,
        needCompanionshipFrequency: needCompanionshipFrequency,
        needCompanionshipUrgency: needCompanionshipUrgency,
        explainNeedLegal: explainNeedLegal,
        needLegalUrgency: needLegalUrgency,
        explainNeedInterpretation: explainNeedInterpretation,
        needInterpretationFrequency: needInterpretationFrequency,
        needInterpretationUrgency: needInterpretationUrgency,
        explainNeedSocialServices: explainNeedSocialServices,
        needSocialServicesFrequency: needSocialServicesFrequency,
        needSocialServicesUrgency: needSocialServicesUrgency,
        explainNeedHealing: explainNeedHealing,
        needHealingFrequency: needHealingFrequency,
        needHealingUrgency: needHealingUrgency,
        explainNeedHousingShort: explainNeedHousingShort,
        needHousingShortUrgency: needHousingShortUrgency,
        explainNeedHousingLong: explainNeedHousingLong,
        needHousingLongUrgency: needHousingLongUrgency,
        explainNeedOther: explainNeedOther,
        needOtherFrequency: needOtherFrequency,
        needOtherUrgency: needOtherUrgency,
        formFinancialNeed: formFinancialNeed,
        explainNeedFinancial: explainNeedFinancial,
        needFinancialFrequency: needFinancialFrequency,
        needFinancialUrgency: needFinancialUrgency,
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



// I can walk dogs. I would ask that they have a disinfected leash and that I can meet them at the door. I am only in close contact with one person who is only in contact with me. I wear masks and sanitize regularly.
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
    const userSearchObject = {
        searchNeighborhood: searchNeighborhood,
        searchNeeds: searchNeeds,
        searchOffers: searchOffers,
    }
    console.log(userSearchObject)
    if (searchOffers) {
        dbHandler.collection(collectionUserForm).find({formOfferings: searchOffers}).toArray((error, result) => {
        if (error) {
            console.log(error);
        } else {
            res.render('pages/needs-and-offerings.ejs', {
                'searchMatchArray': result || [],
                'offer': searchOffers,
            });
        }
    })
    } else if (searchNeeds) {
        dbHandler.collection(collectionUserForm).find({formNeeds: searchNeeds}).toArray((error, result) => {
        if (error) {
            console.log(error);
        } else {
            res.render('pages/needs-and-offerings.ejs', {
                'searchMatchArray': result || [],
                'need': searchNeeds,
            });
        }
    })
} else {
    res.render('pages/needs-and-offerings', {searchMatchArray: []});
}});

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

const express = require('express');
const router = express.Router();

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
    res.render('pages/needs-and-offerings');
});

router.get('/update-form', (req, res) => {
    res.render('pages/update-form');
});

// router.post('/addFormData', (req, res) => {
//     const formData = req.body;
//     const formFirstName = formData['formFirstName'];
//     const formLastName = formData['formLastName'];
//     const formPublicDisplayName = formData['formPublicDisplayName']; //Is this the right way to collect form data for radio and checkbox inputs? Just one constant
//     const formPhoneNumber = formData['formPhoneNumber'];
//     const formEmail = formData['formEmail'];
//     const formPublicDisplayContact = formData['formPublicDisplayContact'];
//     const formAddressHouseNumber = formData['formAddressHouseNumber'];
//     const formAddressStreetName = formData['formAddressStreetName'];
//     const formAddressApartmentNumber = formData['formAddressApartmentNumber'];
//     const formNeighborhood = formData['formNeighborhood'];
//     const formPublicDisplayAddress = formData['formPublicDisplayAddress'];
//     const formOfferings = formData['formOfferings'];
//     const explainOfferChildcare = formData['explainOfferChildcare'];
//     const explainOfferCooking = formData['explainOfferCooking'];
//     const explainOfferFoodAndSupplies = formData['explainOfferFoodAndSupplies'];
//     const explainOfferRidesCar = formData['explainOfferRidesCar'];
//     const explainOfferPetCare = formData['explainOfferPetCare'];
//     const explainOfferInternetSubs = formData['explainOfferInternetSubs'];
//     const explainOfferMedicalSupport = formData['explainOfferMedicalSupport'];
//     const explainOfferMedicalAdvice = formData['explainOfferMedicalAdvice'];
//     const explainOfferStorage = formData['explainOfferStorage'];
//     const explainOfferArt = formData['explainOfferArt'];
//     const explainOfferMentalHealth = formData['explainOfferMentalHealth'];
//     const explainOfferCompanionship = formData['explainOfferCompanionship'];
//     const explainOfferLegal = formData['explainOfferLegal'];
//     const explainOfferInterpretation = formData['explainOfferInterpretation'];
//     const explainOfferSocialServices = formData['explainOfferSocialServices'];
//     const explainOfferHealing = formData['explainOfferHealing'];
//     const explainOffeHousingShort = formData['explainOffeHousingShort'];
//     const explainOffeHousingLong = formData['explainOffeHousingLong'];
//     const explainOfferOther = formData['explainOfferOther'];
//     const formGiveMoney = formData['formGiveMoney'];
//     const formNeeds = formData['formNeeds'];
//     const explainNeedChildcare = formData['explainNeedChildcare'];
//     const needChildcareFrequency = formData['needChildcareFrequency'];
//     const needChildcareUrgency = formData['needChildcareUrgency'];
//     const explainNeedCooking = formData['explainNeedCooking'];
//     const needCookingFrequency = formData['needCookingFrequency'];
//     const needCookingUrgency = formData['needCookingUrgency'];
//     const explainNeedFoodAndSupplies = formData['explainNeedFoodAndSupplies'];
//     const needFoodAndSuppliesFrequency = formData['needFoodAndSuppliesFrequency'];
//     const needFoodAndSuppliesUrgency = formData['needFoodAndSuppliesUrgency'];
//     const explainNeedRidesCar = formData['explainNeedRidesCar'];
//     const needRidesCarFrequency = formData['needRidesCarFrequency'];
//     const needRidesCarUrgency = formData['needRidesCarUrgency'];
//     const explainNeedPetcare = formData['explainNeedPetcare'];
//     const needPetcareFrequency = formData['needPetcareFrequency'];
//     const needPetcareUrgency = formData['needPetcareUrgency'];
//     const explainNeedInternetSubscriptions = formData['explainNeedInternetSubscriptions'];
//     const explainNeedMedicalSupport = formData['explainNeedMedicalSupport'];
//     const needMedicalSupportFrequency = formData['needMedicalSupportFrequency'];
//     const needMedicalSupportUrgency = formData['needMedicalSupportUrgency'];
//     const explainNeedMedicalAdvice = formData['explainNeedMedicalAdvice'];
//     const needMedicalAdviceUrgency = formData['needMedicalAdviceUrgency'];
//     const explainNeedneedStorage = formData['explainNeedneedStorage'];
//     const needStorageUrgency = formData['needStorageUrgency'];
//     const explainNeedArt = formData['explainNeedArt'];
//     const needArtFrequency = formData['needArtFrequency'];
//     const needArtUrgency = formData['needArtUrgency'];
//     const explainNeedMentalHealth = formData['explainNeedMentalHealth'];
//     const needMentalHealthFrequency = formData['needMentalHealthFrequency'];
//     const needMentalHealthUrgency = formData['needMentalHealthUrgency'];
//     const explainNeedCompanionship = formData['explainNeedCompanionship'];
//     const needCompanionshipFrequency = formData['needCompanionshipFrequency'];
//     const needCompanionshipUrgency = formData['needCompanionshipUrgency'];
//     const explainNeedLegal = formData['explainNeedLegal'];
//     const needLegalUrgency = formData['needLegalUrgency'];
//     const explainNeedInterpretation = formData['explainNeedInterpretation'];
//     const needInterpretationFrequency = formData['needInterpretationFrequency'];
//     const needInterpretationUrgency = formData['needInterpretationUrgency'];
//     const explainNeedSocialServices = formData['explainNeedSocialServices'];
//     const needSocialServicesFrequency = formData['needSocialServicesFrequency'];
//     const needSocialServicesUrgency = formData['needSocialServicesUrgency'];
//     const explainNeedHealing = formData['explainNeedHealing'];
//     const needHealingFrequency = formData['needHealingFrequency'];
//     const needHealingUrgency = formData['needHealingUrgency'];
//     const explainNeedHousingShort = formData['explainNeedHousingShort'];
//     const needHousingShortUrgency = formData['needHousingShortUrgency'];
//     const explainNeedHousingLong = formData['explainNeedHousingLong'];
//     const needHousingLongUrgency = formData['needHousingLongUrgency'];
//     const explainNeedOther = formData['explainNeedOther'];
//     const needOtherFrequency = formData['needOtherFrequency'];
//     const needOtherUrgency = formData['needOtherUrgency'];
//     const formFinancialNeed = formData['formFinancialNeed'];
//     const explainNeedFinancial = formData['explainNeedFinancial'];
//     const needFinancialFrequency = formData['needFinancialFrequency'];
//     const needFinancialUrgency = formData['needFinancialUrgency'];
//     const needFinancialPublic = formData['needFinancialPublic'];
//     const explainNeighborConnections = formData['explainNeighborConnections'];
//     const blockCoord = formData['blockCoord'];
//     const networkHelp = formData['networkHelp'];
//     const formExplainCheckIn = formData['formExplainCheckIn'];

//     const userFormDataObject = {
//         formFirstName: formFirstName,
//         formLastName: formLastName,
//         formPublicDisplayName: formPublicDisplayName,
//         formPhoneNumber: formPhoneNumber,
//         formEmail: formEmail,
//         formPublicDisplayContact: formPublicDisplayContact,
//         formAddressHouseNumber: formAddressHouseNumber,
//         formAddressStreetName: formAddressStreetName,
//         formAddressApartmentNumber: formAddressApartmentNumber,
//         formNeighborhood: formNeighborhood,
//         formPublicDisplayAddress: formPublicDisplayAddress,
//         formOfferings: formOfferings,
//         explainOfferChildcare: explainOfferChildcare,
//         explainOfferCooking: explainOfferCooking,
//         explainOfferFoodAndSupplies: explainOfferFoodAndSupplies,
//         explainOfferRidesCar: explainOfferRidesCar,
//         explainOfferPetCare: explainOfferPetCare,
//         explainOfferInternetSubs: explainOfferInternetSubs,
//         explainOfferMedicalSupport: explainOfferMedicalSupport,
//         explainOfferMedicalAdvice: explainOfferMedicalAdvice,
//         explainOfferStorage: explainOfferStorage,
//         explainOfferArt: explainOfferArt,
//         explainOfferMentalHealth: explainOfferMentalHealth,
//         explainOfferCompanionship: explainOfferCompanionship,
//         explainOfferLegal: explainOfferLegal,
//         explainOfferInterpretation: explainOfferInterpretation,
//         explainOfferSocialServices: explainOfferSocialServices,
//         explainOfferHealing: explainOfferHealing,
//         explainOffeHousingShort: explainOffeHousingShort,
//         explainOffeHousingLong: explainOffeHousingLong,
//         explainOfferOther: explainOfferOther,
//         formGiveMoney:formGiveMoney,
//         formNeeds: formNeeds,
//         explainNeedChildcare: explainNeedChildcare,
//         needChildcareFrequency: needChildcareFrequency,
//         needChildcareUrgency: needChildcareUrgency,
//         explainNeedCooking: explainNeedCooking,
//         needCookingFrequency: needCookingFrequency,
//         needCookingUrgency: needCookingUrgency,
//         explainNeedFoodAndSupplies: explainNeedFoodAndSupplies,
//         needFoodAndSuppliesFrequency: needFoodAndSuppliesFrequency,
//         needFoodAndSuppliesUrgency: needFoodAndSuppliesUrgency,
//         explainNeedRidesCar: explainNeedRidesCar,
//         needRidesCarFrequency: needRidesCarFrequency,
//         needRidesCarUrgency: needRidesCarUrgency,
//         explainNeedPetcare: explainNeedPetcare,
//         needPetcareFrequency: needPetcareFrequency,
//         needPetcareUrgency: needPetcareUrgency,
//         explainNeedInternetSubscriptions: explainNeedInternetSubscriptions,
//         explainNeedMedicalSupport: explainNeedMedicalSupport,
//         needMedicalSupportFrequency: needMedicalSupportFrequency,
//         needMedicalSupportUrgency: needMedicalSupportUrgency,
//         explainNeedMedicalAdvice: explainNeedMedicalAdvice,
//         needMedicalAdviceUrgency: needMedicalAdviceUrgency,
//         explainNeedneedStorage: explainNeedneedStorage,
//         needStorageUrgency: needStorageUrgency,
//         explainNeedArt: explainNeedArt,
//         needArtFrequency: needArtFrequency,
//         needArtUrgency: needArtUrgency,
//         explainNeedMentalHealth: explainNeedMentalHealth,
//         needMentalHealthFrequency: needMentalHealthFrequency,
//         needMentalHealthUrgency: needMentalHealthUrgency,
//         explainNeedCompanionship: explainNeedCompanionship,
//         needCompanionshipFrequency: needCompanionshipFrequency,
//         needCompanionshipUrgency: needCompanionshipUrgency,
//         explainNeedLegal: explainNeedLegal,
//         needLegalUrgency: needLegalUrgency,
//         explainNeedInterpretation: explainNeedInterpretation,
//         needInterpretationFrequency: needInterpretationFrequency,
//         needInterpretationUrgency: needInterpretationUrgency,
//         explainNeedSocialServices: explainNeedSocialServices,
//         needSocialServicesFrequency: needSocialServicesFrequency,
//         needSocialServicesUrgency: needSocialServicesUrgency,
//         explainNeedHealing: explainNeedHealing,
//         needHealingFrequency: needHealingFrequency,
//         needHealingUrgency: needHealingUrgency,
//         explainNeedHousingShort: explainNeedHousingShort,
//         needHousingShortUrgency: needHousingShortUrgency,
//         explainNeedHousingLong: explainNeedHousingLong,
//         needHousingLongUrgency: needHousingLongUrgency,
//         explainNeedOther: explainNeedOther,
//         needOtherFrequency: needOtherFrequency,
//         needOtherUrgency: needOtherUrgency,
//         formFinancialNeed: formFinancialNeed,
//         explainNeedFinancial: explainNeedFinancial,
//         needFinancialFrequency: needFinancialFrequency,
//         needFinancialUrgency: needFinancialUrgency,
//         needFinancialPublic: needFinancialPublic,
//         explainNeighborConnections: explainNeighborConnections,
//         blockCoord: blockCoord,
//         networkHelp: networkHelp,
//         formExplainCheckIn: formExplainCheckIn,
//     }

//     console.log(userFormDataObject);
//     dbHandler.collection(collectionUserForm).insertOne(userFormDataObject, (error, result) => {
//         if (error) {
//             console.log(`There was an error adding the information to the database. The error is: ${error}`);
//         } else {
//             console.log(`Yes! The data was added. Here it is: ${result}`);
//             res.redirect('/index');
//         }
//     })
    
// })



module.exports = router;

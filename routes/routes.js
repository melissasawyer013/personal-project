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

module.exports = router;

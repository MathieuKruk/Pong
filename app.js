//#############################################################################################//
// GLOBAL CONST
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

const websiteName = 'Pong Game';
const port = process.env.PORT || 3000;


//#############################################################################################//
// RENDERING TEMPLATE
app.set("view engine", "pug");
app.set('views', __dirname + '/src');
// Folder hosting all static files
app.use(express.static(__dirname + '/public'));


//#############################################################################################//
// DATA PARSING
app.use(express.urlencoded({
	extended: false
}));
app.use(express.json());


//#############################################################################################//
// ROUTING

// Landing page
app.get('/', function(req, res) {
	res.render('pages/landing');
	console.log('%c DEV-Message: [PAGE RENDERING]_(SUCCESS)  --  Landing page has correclty loaded.', 'color: green;')
});

// About us page
app.get('/about', function(req, res) {
	res.render('pages/about');
	console.log('DEV-Message: [PAGE RENDERING]_(SUCCESS)  --  About us page has correclty loaded.')
});

// Achievment: insulating facades page
app.get('/achievements/facades', function(req, res) {
	res.render('pages/achievement-facades');
	console.log('DEV-Message: [PAGE RENDERING]_(SUCCESS)  --  Achievement/facades page has correclty loaded.')
});

// Achievment: Big works page
app.get('/achievements/big-works', function(req, res) {
	res.render('pages/achievement-big-works');
	console.log('DEV-Message: [PAGE RENDERING]_(SUCCESS)  --  Achievement/big-works page has correclty loaded.')
});

// Achievment: Renovations page
app.get('/achievements/renovations', function(req, res) {
	res.render('pages/achievement-renovations');
	console.log('DEV-Message: [PAGE RENDERING]_(SUCCESS)  --  Achievement/renovations page has correclty loaded.')
});

// Achievment: Earthworks page
app.get('/achievements/earthworks', function(req, res) {
	res.render('pages/achievement-earthworks');
	console.log('DEV-Message: [PAGE RENDERING]_(SUCCESS)  --  Achievement/earthworks page has correclty loaded.')
});

// Contact page
app.get('/contact', function(req, res) {
	res.render('pages/contact');
	console.log('DEV-Message: [PAGE RENDERING]_(SUCCESS) --  Contact page has correclty loaded.')
});

// Contact page
app.post('/email', function(req, res) {
	console.log('Data: ', req.body)
	res.json({ message: 'Message received!'})
});

app.get('*', (req, res, next) => {
	res.status(200).send('DEV-Message: [PAGE RENDERING]_(ERROR) --  Page not found');
	next();
});

//#############################################################################################//
// APP LISTENING
app.listen(port, () => {
	console.log(`DEV-Message: [APP LISTENING]_(SUCCESS) -- ${websiteName}'s app is running on port ${port}`);
});
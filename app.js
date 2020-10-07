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
	console.log('%c DEV-Message: [PAGE RENDERING]_(SUCCESS)  --  Landing page has correclty loaded.');
});

// Error page
app.get('*', (req, res, next) => {
	res.status(200).send('DEV-Message: [PAGE RENDERING]_(ERROR) --  Page not found');
	next();
});

//#############################################################################################//
// APP LISTENING
app.listen(port, () => {
	console.log(`DEV-Message: [APP LISTENING]_(SUCCESS) -- ${websiteName}'s app is running on port ${port}`);
});
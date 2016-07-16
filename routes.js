'use strict';

let express = require('express');
let router = require('express').Router();
let ContactInfo = require('./contact-info');

router.get('/', (req, res) => res.send('ping'));

router.post('/', (req, res) => {
	let body = req.body;
	if (!body) res.status(400);

	new ContactInfo(body).save()
		.then(data => {
			console.log("Data saved: " + data);
			res.sendFile('index.html', { root: __dirname + "/public" });
		})
		.catch(err => {
			console.error(err);
			res.status(500);
		});
});

let auth = (req, res, next) => {
	if (req.query.user === process.env.SUPER_USER && req.query.pwd === process.env.SUPER_PASSWORD) {
		next();
	} else {
		res.sendStatus(401);
	}
};

router.get("/list", auth, (req, res) => {
	ContactInfo.find().then(data => {
		res.json(data);
	})
});

module.exports = router;

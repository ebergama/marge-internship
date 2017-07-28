'use strict';

let express = require('express');
let router = require('express').Router();
let ContactInfoNext = require('./contact-info');
let _ = require('lodash');

router.get('/', (req, res) => res.send('ping'));
router.options('/', (req, res) => res.status(204));
router.post('/', (req, res) => {
	let body = req.body;
	if (!body) res.status(400);

	new ContactInfoNext(body).save()
		.then(data => {
			console.log("Data saved: " + data);
			res.send('ok');
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
	ContactInfoNext.find().then(data => {
		res.json(data);
	})
});

router.get('/count', (req, res) => {
	ContactInfoNext.count({}).then(data => res.json({'count': data}));
});

router.get('/byUniversity', auth, (req, res) => {
	ContactInfoNext.find().then(data => res.json(_.mapValues(_.groupBy(data, 'university'), item => item.length)));
});

module.exports = router;

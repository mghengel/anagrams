var express = require('express');
var router = express.Router();
var fs = require('fs');
var _ = require('lodash');

// Parse dictionary.txt the data store on app startup.
// writing syncronously as it might take long. Sorry for the memory
var dictionary = {};
dictionary["words"] = fs.readFileSync('dictionary.txt').toString().split("\n");

// Handles all router requests that come in
router.all('/*', function(req, res, next) {
	next();
});

// Get anagrams for given word
router.get('/anagrams/:word.json', function(req, res, next){
	// Set anagrams object
	var anagrams = {
		anagrams: []
	};
	// Loop through dictionary words 
	for(var i = 0; i < dictionary.words.length && anagrams.anagrams.length != req.query.limit; i++) {

		// Store originaly dictionary word
		var word = dictionary.words[i];

		// soreted dictionary word
		var sortedword = dictionary.words[i].toLowerCase().split("").sort().join("");

		// Compare requested sorted word to sorted dictionayr word
		if (req.params.word.toLowerCase().split("").sort().join("") == sortedword) {

			// Check if word is equal to dictionary word. If not, push to array
			if (word.toLowerCase() != req.params.word.toLowerCase()) {
				anagrams.anagrams.push(word);
			}
		}
	}
	res.status(200);
	res.send(anagrams);
});

// Nothing to see here
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ANAGRAMS' });
});

// Post JSON array of words into the data store
router.post('/words.json', function(req, res, next) {
	// Add to dictionary based on lowercasing match and keeping the original word in the dictionary
	dictionary.words = _.unionBy(dictionary.words, req.body.words, _.lowerCase);
	res.status(201);
	res.send();
});

// Deletes a single word from the data store.
router.delete('/words/:word.json', function(req, res, next) {
	// Remove requested word from dictionary 
	_.remove(dictionary.words, function(n) {
		return n.toLowerCase() == req.params.word.toLowerCase();
	});
	res.status(200);
	res.send();
});

// Delete all words in the data store
router.delete('/words.json', function(req, res, next) {
	dictionary.words = [];
	res.status(204);
	res.send();
});


module.exports = router;

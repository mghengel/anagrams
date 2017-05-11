var express = require('express');
var router = express.Router();
var fs = require('fs');
var _ = require('lodash');


// Old code to store words object
// var words = {};

// Old code to read json object from file
// Read words.json function
// var readFile = function(callback){
// 	fs.readFile('words.json', 'utf8', function(err, data) {
// 		if (err) callback(err)
// 		callback(data)
// 	});
// };

// Old function to write json object to file
// Write words json function
// var writeFile = function(obj, callback){
// 	fs.writeFile('words.json', JSON.stringify(obj), 'utf8', function(err){
// 		if (err) callback(err)
// 		callback(obj)
// 	});
// };

// Parse dictionary.txt into memory on app startup.
// writing syncronously as it might take long
var dictionary = {};
dictionary["words"] = fs.readFileSync('dictionary.txt').toString().split("\n");

router.all('/*', function(req, res, next) {
	// Not needed anymore
	// readFile(function(data){
	// 	words = JSON.parse(data);
	// 	next();
	// });
	next();
});

/* GET home page. */
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
	console.log(anagrams);
	res.send(anagrams);
});

// Nothing to see here
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// What is the point of this? Just a different endpoint that stores words?
router.post('/words.json', function(req, res, next) {
	// Add to dictionary based on lowercasing match and keeping the original word in the dictionary
	dictionary.words = _.unionBy(dictionary.words, req.body.words, _.lowerCase);
	console.log(dictionary)
	res.status(201);
	res.send();

	// Old code to write .words.json endpoint before I knew what it was for!!!
	// writeFile(req.body, function(response) {
	// 	res.status(201);
	// 	res.send(response)
	// });
});

// Deletes a single word from the data store.
// A single word or any word that matches?
router.delete('/words/:word.json', function(req, res, next) {
	_.remove(dictionary.words, function(n) {
		return n.toLowerCase() == req.params.word.toLowerCase();
	});
	console.log(dictionary);
	res.status(200);
	res.send();
	
	// Old code to write the new words object with word deleted
	// writeFile(words, function(response){
	// 	res.send(response)
	// });
	
});

router.delete('/words.json', function(req, res, next) {
	dictionary.words = [];
	res.status(204);
	res.send();

	// Old code to write words.json to blank array
	// words.words = [];
	// writeFile(words, function(response) {
	// 	res.status(204);
	// 	res.send(response);
	// });
});


module.exports = router;

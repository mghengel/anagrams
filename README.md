# anagrams

## The anagram code on startup creates a "data store" consisting of all English words.

#### A POST request to '/words.json' with a JSON array will add words to the "data store" if they do not exist and is case insensative.

curl -i -X POST -d '{ "words": ["read", "dear", "dare"] }' http://localhost:3000/words.json -H "Content-Type: application/json

#### A GET request to '/anagrams/:word.json' will return a JSON array of all anagrams of the supplied word.

curl -i http://localhost:3000/anagrams/read.json

#### Optionally on the GET anagram request you can supply a limit to the number of anagrams returned.

curl -i http://localhost:3000/anagrams/read.json?limit=2

#### A DELETE request to '/words/:word.json' will delete the supplied word from the "data store". 

curl -i -X DELETE http://localhost:3000/words/read.json

#### A DELETE request to 'words.json' will delete all words in the "data store".

curl -i -X DELETE http://localhost:3000/words.json


## Set Up
#### The application is built on Node.js using express.js for the framework

If you don't have node installed Node: https://nodejs.org/en/

Clone the poject 'git clone git@github.com:mghengel/anagrams.git'

cd into project

I run "gulp" in Dev, so you can use that if you want or you can run 'npm start'

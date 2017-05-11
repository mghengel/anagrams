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


## NOTES

#### A few things:

##### First, I built the project unsure of what the "data store" part of the project was and what it's relationship was to the dictionary.txt and the anagrams. I had created the endpoints for the "data store" but only used them to update and delete what the user Posted. Alternatively, I was seperatly consuming the dictionary.txt to handle the 'anagrams' endpoint. After getting clarification I reworked the code to consume the dictionary.txt into the data store, then making updates and deletes to that. Make sense??? ha. If you are curious there is a branch titled 'Old-code' where you can see all the previous code I talked about. It's all commented out but it should give some insight into what I was doing before the clarification. 

##### Second, my Ruby environment/gemsets gave me tons of trouble running the tests. So I was not able to run them, only read them! So instead, here are my tests/checks/routine for testing:

curl -i -X DELETE http://localhost:3000/words.json

curl -i -X POST -d '{ "words": ["read", "dear", "dare"] }' http://localhost:3000/words.json -H "Content-Type: application/json"

curl -i -X POST -d '{ "words": ["read", "DEAR", "Dare", "test", "TEST"] }' http://localhost:3000/words.json -H "Content-Type: application/json"

curl -i http://localhost:3000/anagrams/read.json

curl -i http://localhost:3000/anagrams/reaD.json

curl -i http://localhost:3000/anagrams/read.json?limit=2

curl -i -X POST -d '{ "words": ["eadr"] }' http://localhost:3000/words.json -H "Content-Type: application/json"

curl -i http://localhost:3000/anagrams/reaD.json

curl -i -X DELETE http://localhost:3000/words/read.json

##### Third, sorry for taking so long with! I had planned to do this this past weekend but I had a huge wrench thrown in my weekend. Long Story we can chat about. 

##### Fourth, I really enjoyed doing this and honestly wish I could do the optional stuff but I really need to get this out of my hands so I can breath for a minute!

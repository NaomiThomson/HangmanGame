// hangman words
easyNames = ['Gascoigne', 'Ebrietas', 'Micolash']; 
hardNames = ['Blood Starved Beast', 'Orphan of Kos', 'Queen of Vilebloods'];

// initializing score
var wins = 0; 
var tries = 12;

// initializing hidden word 
var word_underscores = []; 

var difficulty = prompt('Easy or Hard?');

// !!!!! NEED TO FIGURE OUT HOW TO OMIT SPACE !!!!!! 
// take in a word (string) and replace letters with underscores
function underscores(word, newArray) {
	for (var i=0; i < word.length; i++) {
		newArray.push('_');
	};

}; 

if (difficulty === 'Easy') {
	underscores(easyNames[0], word_underscores);
}

if (difficulty === 'Hard') {
	underscores(hardNames[0], word_underscores);
}

console.log(word_underscores);

// initializing letters guessed
var letters_guessed = new Array();

// function starts as soon as the user clicks on any key 
document.onkeyup = function(event) {

	var letter = event.key; 
	var word = easyNames[0];
	var word_expand = new Array();
	

	// loop through word and add each letter to new array
	for (var i = 0; i < word.length; i++) {
    	word_expand.push(word.charAt(i));
	};

	// if letter is in the word, will return index of letter which is always > 0
	function isInArray(word, letter) {
    	return word.indexOf(letter.toLowerCase()) > -1;
	};
	
	// for letters found inside the word, reveal letter
	for (var i = 0; i < word_expand.length; i++) {
		if (isInArray(word_expand, letter) === true && word_expand[i].toLowerCase() === letter) {
		word_underscores[i] = letter;
		};
	};

	console.log(word_underscores);


	// !!!!! NEED TO UPDATE TRIES LEFT IN HTML !!!!! 
	// if letter isn't in the word and has not already been guessed, subtract from tries left
	if (isInArray(word_expand, letter) === false && isInArray(letters_guessed, letter) === false) {
		tries = tries - 1;
		console.log(tries);

	};


	// add letter to letters guessed 
	letters_guessed.push(letter);

	// delete letter guessed from letters left
	if (isInArray(letters_guessed, letter) === true) {
		var delete_letter = document.getElementById(letter);
		delete_letter.style.visibility = 'hidden';
	};

} 
// hangman words
easyNames = ['Gascoigne', 'Ebrietas', 'Micolash']; 
hardNames = ['Blood Starved Beast', 'Orphan of Kos', 'Queen of Vilebloods'];

// initializing score
var wins = 0; 
var tries = 12;

// initializing hidden word 
var unknown_word = ['_', '_', '_', '_', '_', '_', '_', '_', '_'];

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

	// !!!!! NEED TO FIGURE OUT HOW TO REVEAL LETTER IN 2 INDICES !!!!!
	// if letter is in the word, reveal letter
	if (isInArray(word_expand, letter) === true) {
		var letter_index = word_expand.indexOf(letter.toLowerCase());
		unknown_word[letter_index] = letter; 
		// var reveal_letter = document.getElementById('current-word').;
		console.log(unknown_word);
		
	};


	// if letter isn't in the word and has not already been guessed, subtract from tries left
	if (isInArray(word_expand, letter) === false && isInArray(letters_guessed, letter) === false) {
		tries = tries - 1;
		console.log(tries);

	};


	// add letter to letters guessed 
	letters_guessed.push(letter);
	console.log(letters_guessed);

	// delete letter guessed from letters left
	if (isInArray(letters_guessed, letter) === true) {
		var delete_letter = document.getElementById(letter);
		delete_letter.style.visibility = 'hidden';
	};


}
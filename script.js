// hangman words
names = ['gascoigne', 'ebrietas', 'micolash', 'amygdalan', 'yharnam', 'byrgenwerth'];

// initializing score
var wins = 0;
var tries = 12;

// initializing hidden word
var word_underscores = [];
var word = names[Math.floor(Math.random() * names.length)];

// take in a word (string) and replace letters with underscores
function underscores(word, newArray) {
	for (var i=0; i < word.length; i++) {
		newArray.push('_ ');
	};

};

underscores(word, word_underscores);

// replace word with underscores and update innerHTML
var new_word = '';
for (i = 0; i < word_underscores.length; i++) {
	new_word += word_underscores[i]
}
document.getElementById('current-word').innerHTML = new_word;

// initializing letters guessed
var letters_guessed = new Array();

// function starts as soon as the user clicks on any key
document.onkeyup = function(event) {

	var letter = event.key;
	var word_expand = word.split('');

	// if letter is in the word, will return index of letter which is always > 0
	function isInArray(word, letter) {
    	return word.indexOf(letter) > -1;
	};

	// for letters found inside the word, reveal letter
	for (var i = 0; i < word_expand.length; i++) {
		if (isInArray(word_expand, letter) === true && word_expand[i] === letter) {
		word_underscores[i] = letter;
		};
	};

	// change word with revealed letters and update innerHTML
	var current_word = '';
	for (i = 0; i < word_underscores.length; i++) {
		current_word += word_underscores[i]
	}
	document.getElementById('current-word').innerHTML = current_word.toUpperCase();

	// if letter isn't in the word and has not already been guessed, subtract from tries left
	if (isInArray(word_expand, letter) === false && isInArray(letters_guessed, letter) === false) {
		tries = tries - 1;
		document.getElementById('tries-left').innerHTML = tries;

	};

	// add letter to letters guessed
	letters_guessed.push(letter);

	// delete letter guessed from letters left
	if (isInArray(letters_guessed, letter) === true) {
		var delete_letter = document.getElementById(letter);
		delete_letter.style.visibility = 'hidden';
	};

	// display win or lose img once game is over, and update score
	if (word == current_word) {
		var div = document.createElement('div');
		div.setAttribute('class', 'win-img');
		document.getElementById('current-word').appendChild(div);
		wins += 1;
		document.getElementById('score').innerHTML = 'Wins: ' + wins;
	};

	if (word != current_word && tries == 0) {
		var div = document.createElement('div');
		div.setAttribute('class', 'lose-img');
		document.getElementById('current-word').appendChild(div);
	}
}

var variables = {
	"names": ["gascoigne", "ebrietas", "micolash", "amygdalan", "yharnam", "byrgenwerth"],
	"nameArray": [],
	"wins": 0,
	"tries": 12,
	"newWord": "",
	"currentWord": "",
	"lettersGuessed": []
};

var functions = {
	getLength: function(objArray) {
		var length = Object.keys(objArray).length;
		return length;
	},
	genRanWord: function (objArray, length) {
		var word = objArray[Math.floor(Math.random() * length)];
		return word
	},
	createUnderscores: function(objArray, length) {
		for (var i=0; i < length; i++) {
			objArray.push("_ ")
		};
		return objArray;
	},
	arrayToStr: function(objArray, length, str) {
		for (i = 0; i < length; i++) {
			str += objArray[i]
		};
		return str;
	},
	updateHTML: function(id, content) {
		document.getElementById(id).innerHTML = content;
	},
	isInArray: function(word, letter) {
		return word.indexOf(letter) > -1;
	},

};

// before game starts, choose word randomly from list and display its letters as underscores
var word_list_length = functions.getLength(variables.names);
var word = functions.genRanWord(variables.names, word_list_length);
var word_expanded = word.split("");
var word_length = functions.getLength(word_expanded);
	var unknown_word = functions.createUnderscores(variables.nameArray, word_length);
var display_new_word = functions.arrayToStr(unknown_word, word_length, variables.newWord);
functions.updateHTML("current-word", display_new_word);

// game starts onkeyup
document.onkeyup = function(event) {
	var letter = event.key;

	// for letters found inside the word, reveal letter
	for (var i = 0; i < word_length; i++) {
		if (functions.isInArray(word_expanded, letter) === true && word_expanded[i] === letter) {
			unknown_word[i] = letter;
		};
	};
	display_current_word = functions.arrayToStr(unknown_word, word_length, variables.currentWord);
	functions.updateHTML("current-word", display_current_word);

	// if letter isn't in the word and has not already been guessed, subtract from tries left
	if (functions.isInArray(word_expanded, letter) === false && functions.isInArray(variables.lettersGuessed, letter) === false) {
		variables.tries -= 1;
		functions.updateHTML("tries-left", variables.tries);
	};

	// add letter to letters guessed
	variables.lettersGuessed.push(letter);

	// delete letter guessed from letters left
	if (functions.isInArray(variables.lettersGuessed, letter) === true) {
		var delete_letter = document.getElementById(letter);
		delete_letter.style.visibility = "hidden";
	};

	// display win or lose img once game is over, and update score
	if (word == display_current_word) {
		var div = document.createElement('div');
		div.setAttribute('class', 'win-img');
		document.getElementById('current-word').appendChild(div);
		variables.wins += 1;
		functions.updateHTML("score", "Wins: " + variables.wins);
	};

	if (word != display_current_word && variables.tries == 0) {
		var div = document.createElement('div');
		div.setAttribute('class', 'lose-img');
		document.getElementById('current-word').appendChild(div);
	}
}

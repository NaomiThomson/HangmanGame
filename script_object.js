var gameInfo = {
	"names": ["gascoigne", "ebrietas", "micolash", "amygdalan", "yharnam", "byrgenwerth"],
	"nameArray": [],
	"wins": 0,
	"tries": 12,
	"newWord": "",
	"currentWord": "",
	"lettersGuessed": []
};

var gameMethods = {
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
var word_list_length = gameMethods.getLength(gameInfo.names);
var word = gameMethods.genRanWord(gameInfo.names, word_list_length);
var word_expanded = word.split("");
var word_length = gameMethods.getLength(word_expanded);
	var unknown_word = gameMethods.createUnderscores(gameInfo.nameArray, word_length);
var display_new_word = gameMethods.arrayToStr(unknown_word, word_length, gameInfo.newWord);
gameMethods.updateHTML("current-word", display_new_word);

// game starts onkeyup
document.onkeyup = function(event) {
	var letter = event.key;

	// for letters found inside the word, reveal letter
	for (var i = 0; i < word_length; i++) {
		if (gameMethods.isInArray(word_expanded, letter) === true && word_expanded[i] === letter) {
			unknown_word[i] = letter;
		};
	};
	display_current_word = gameMethods.arrayToStr(unknown_word, word_length, gameInfo.currentWord);
	gameMethods.updateHTML("current-word", display_current_word);

	// if letter isn't in the word and has not already been guessed, subtract from tries left
	if (gameMethods.isInArray(word_expanded, letter) === false && gameMethods.isInArray(gameInfo.lettersGuessed, letter) === false) {
		gameInfo.tries -= 1;
		gameMethods.updateHTML("tries-left", gameInfo.tries);
	};

	// add letter to letters guessed
	gameInfo.lettersGuessed.push(letter);

	// delete letter guessed from letters left
	if (gameMethods.isInArray(gameInfo.lettersGuessed, letter) === true) {
		var delete_letter = document.getElementById(letter);
		delete_letter.style.visibility = "hidden";
	};

	// display win or lose img once game is over, and update score
	if (word == display_current_word) {
		var div = document.createElement('div');
		div.setAttribute('class', 'win-img');
		document.getElementById('current-word').appendChild(div);
		gameInfo.wins += 1;
		gameMethods.updateHTML("score", "Wins: " + gameInfo.wins);
		// window.location = './index.html';
	};

	if (word != display_current_word && gameInfo.tries == 0) {
		var div = document.createElement('div');
		div.setAttribute('class', 'lose-img');
		document.getElementById('current-word').appendChild(div);
	}
}

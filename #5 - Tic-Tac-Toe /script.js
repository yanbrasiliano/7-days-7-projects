// Initial Data
let board = {
	a1: '',
	a2: '',
	a3: '',
	b1: '',
	b2: '',
	b3: '',
	c1: '',
	c2: '',
	c3: ''
};

let player = '';
let warning = '';
let playing = false;

reset();

// Events

document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach(item => {
	item.addEventListener('click', addItem);
});


// Functions

function addItem(event) {
	let item = event.target.getAttribute('data-item');

	if (board[item] === '' && playing) {
		board[item] = player;
		renderBoard();
		changePlayer();
	}
}

function reset() {
	warning = '';
	let random = Math.floor(Math.random() * 2);
	player = (random === 0) ? 'x' : 'o';
	playing = true;

	for (let i in board) {
		board[i] = '';
	}

	renderBoard();
	renderInformation();

}

function renderBoard() {
	for (let i in board) {
		let item = document.querySelector(`div[data-item="${i}"]`);
		item.innerHTML = board[i];
	}

	checkGame();

}

function renderInformation() {
	document.querySelector('.vez').innerHTML = player;
	document.querySelector('.resultado').innerHTML = warning;
}

function changePlayer() {
	player = (player === 'x') ? 'o' : 'x';
	renderInformation();
}

function checkGame() {

	if (checkWinner('x')) {
		warning = 'The player X is winner!';
		playing = false;

	} else if (checkWinner('o')) {
		warning = 'The player O is winner!';
		playing = false;

	} else if (checkTie()) {
		warning = 'The game is tied!';
		playing = false;
	}

}

function checkWinner(player) {
	let possibilities = [
		'a1,a2,a3',
		'b1,b2,b3',
		'c1,c2,c3',

		'a1,b1,c1',
		'a2,b2,c2',
		'a3,b3,c3',

		'a1,b2,c3',
		'a3,b2,c1'

	];

	for (let i in possibilities) {
		let array = possibilities[i].split(',');
		let hasWon = array.every(option => board[option] === player);

		if (hasWon) {
			return true;
		}
	}
	return false;
}

function checkTie() {

	for (let i in board) {
		if (board[i] === ''){
			return false;
		}
	}
	return true;
}
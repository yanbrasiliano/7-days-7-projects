// Initial data.
let currentQuestion = 0;
let correctAnswer = 0;
showQuestion();

document.querySelector('.scoreArea button').addEventListener('click', resetEvent);

// Functions
function showQuestion() {
	if (questions[currentQuestion]) {

		let pct = Math.floor((currentQuestion / questions.length) * 100);
		document.querySelector('.progress--bar').style.width = `${pct}%`;

		let q = questions[currentQuestion];

		document.querySelector('.scoreArea').style.display = 'none';
		document.querySelector('.questionArea').style.display = 'block';

		document.querySelector('.question').innerHTML = q.question;

		let options = '';

		for (let i in q.options) {
			options += `<div data-op="${i}" class="option"><span>${parseInt(i)+1}</span>${q.options[i]}</div>`;
		}

		document.querySelector('.options').innerHTML = options;
		document.querySelectorAll('.options .option').forEach(item => {
			item.addEventListener('click', optionClickHandler);
		});

	} else {

		finishQuiz();

	}
}

function optionClickHandler(e) {
	let clicked = parseInt(e.target.getAttribute('data-op'));

	if (questions[currentQuestion].answer === clicked) {
		correctAnswer++;
	}
	currentQuestion++;
	showQuestion();
}

function finishQuiz() {
	let points = Math.floor((correctAnswer / questions.length) * 100);

	if (points < 30) {
		document.querySelector('.scoreText1').innerHTML = 'Reboot!'
		document.querySelector('.scorePct').style.color = '#FF0000';

	} else if (points >= 30 && points < 70) {
		document.querySelector('.scoreText1').innerHTML = 'Top!'
		document.querySelector('.scorePct').style.color = '#FFFF00';

	} else if (points >= 70) {
		document.querySelector('.scoreText1').innerHTML = 'Congratulations!'
		document.querySelector('.scorePct').style.color = '#0D630D';
	}

	document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;
	document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} e acertou ${correctAnswer}.`;


	document.querySelector('.scoreArea').style.display = 'block';
	document.querySelector('.questionArea').style.display = 'none';
	document.querySelector('.progress--bar').style.width = '100%';



};


function resetEvent() {
	correctAnswers = 0;
	currentQuestion = 0;
	showQuestion();
}
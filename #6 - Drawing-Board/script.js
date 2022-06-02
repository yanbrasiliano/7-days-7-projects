//Initial Data
let colorCurrent = 'black';
let screen = document.querySelector('#display');
let ctx = screen.getContext('2d');
let canDraw = false;

let mouseX = 0;
let mouseY = 0;


//Events
document.querySelectorAll('.colorArea .color').forEach(item => {
	item.addEventListener('click', colorClick);
});
screen.addEventListener('mousedown', mouseDownEvent);
screen.addEventListener('mousemove', mouseMoveEvent);
screen.addEventListener('mouseup', mouseUpEvent);
document.querySelector('.clear').addEventListener('click',clearScreen);


//Functions
function colorClick(e) {
	let color = e.target.getAttribute('data-color');
	colorCurrent = color;

	document.querySelector('.color.active').classList.remove('active');
	e.target.classList.add('active');


}

function mouseMoveEvent(e) {
	if (canDraw) {
		draw(e.pageX, e.pageY);
	}
}

function mouseDownEvent(e) {
	canDraw = true;
	mouseX = e.pageX - screen.offsetLeft;
	mouseY = e.pageY - screen.offsetTop;

}

function mouseUpEvent() {
	canDraw = false;
}

function draw(x, y) {
	let pointX = x - screen.offsetLeft;
	let pointY = y - screen.offsetTop;


	//drawing 
	ctx.beginPath();
	ctx.lineWidth = 5;
	ctx.lineJoin = "round";
	ctx.moveTo(mouseX, mouseY);
	ctx.lineTo(pointX, pointY);
	ctx.closePath();
	ctx.strokeStyle = colorCurrent;
	ctx.stroke();
	mouseX = pointX;
	mouseY = pointY;
}

function clearScreen() {
	ctx.setTransform(1,0,0,1,0,0);
	ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
}
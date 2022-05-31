document.querySelector('.busca').addEventListener('submit', async (event) => {
	event.preventDefault();

	let input = document.querySelector('#searchInput').value;
	if (input != '') {
		clearInfo();
		showWarning('Searching...');

		let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=
		${encodeURI(input)}&units=metric&lang=pt_br&appid=d06cdb298fafc83c520d5ab677fc477e`);

		let json = await result.json();
		console.log(json);

		if (json.cod === 200) {
			showInfo({
				name: json.name,
				country: json.sys.country,
				temp: json.main.temp,
				tempIcon: json.weather[0].icon,
				windSpeed: json.wind.speed,
				windAngle: json.wind.deg
			})
		} else {
			clearInfo();
			showWarning("We did not find this information.");
			
		}
	}

});


function showInfo(obj) {
	showWarning('');

	document.querySelector('.titulo').innerHTML = `${obj.name}, ${obj.country}`;
	
	document.querySelector('.tempInfo').innerHTML = `${obj.temp} <sup>ºC</sup>`;
	document.querySelector('.ventoInfo').innerHTML = `${obj.windSpeed} <span>km/h</span>`;

	document.querySelector('.temp img').setAttribute('src', 
	`http://openweathermap.org/img/wn/${obj.tempIcon}@2x.png`);
	
	document.querySelector('.ventoPonto').style.transform = `rotate(${obj.windAngle-90}deg)`;

	document.querySelector('.resultado').style.display = 'block';
}

function showWarning(msg) {
	document.querySelector('.aviso').innerHTML = msg;
}

function clearInfo(){
	showWarning('');
	document.querySelector('.resultado').style.display = 'none';

}
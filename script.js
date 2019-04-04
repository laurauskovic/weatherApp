let appId ='7a7ce5fafd98302e9e4380243c3d7a31';
let units ='imperial';
let searchMethod;

function getSearchMethod(searchTerm) {
	if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
		searchMethod = 'zip';
	else
		searchMethod = 'q';
}

function searchWeather(searchTerm) {
	getSearchMethod(searchTerm);
	fetch("http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=$(appId)&units=$(units)").then(result => {
		return result.jason();
	}).then(result => {
		init(result);
	})
}

function init(resultFromServer) {
	switch(resultFromServer.weather[0].main) {
		case 'clear':
		document.body.style.backgroundImage = 'url(clear/jpg)';
			break;

		case 'Clouds':
		document.body.style.backgroundImage = 'url(Clouds/jpg)';
			break;

		case 'Rain':
		case 'Drizzle':
		case 'Mist':
			document.body.style.backgroundImage = 'url(Rain/jpg)';
			break;

		case 'Thunderstrom':
			document.body.style.backgroundImage = 'url(Thunderstrom/jpg)';
			break;

		case 'Snow':
			document.body.style.backgroundImage = 'url(Snow/jpg)';
			break;

	default:
		break;

	}

let weatherDescriptionHeader = document.getElementById('eatherDescriptionHeader');
let temperatureElement = document.getElementById('temperature');
let humidityElement = document.getElementById('humidity');
let windSpeedElement = document.getElementById('windSpeed');
let cityHeader = document.getElementById('cityHeader');
let weatherIcon = document.getElementById('documentIconImg');

weatherIcon.src ="http://openweathermap.org/img/w/10d.png" + resultFromServer.weather[0].icon + ".png";

}

document.getElementById('searchBtn').addEventListener('clik', () => {
	let searchTerm = document.getElementById('searchInput').value;
	if(searchTerm)
		searchWeather(searchTerm);

})
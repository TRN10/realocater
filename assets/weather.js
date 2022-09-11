// weather authentication
var weatherAPIAppId = '85572fccbd008e17b2a41bc1471e6c04';

// DOM
var locationName = document.getElementById("location-name");
var weatherTable = document.getElementById("weatherTable");
var buttonFetchPropertyList = document.getElementById("button-fetch-property-list");

// RENDERED DOM
var tablePropertyList;
var tablePropertyListHead;
var tablePropertyListBody;


function getCityCurrentWeatherApi(weatherLocation, weatherLocationState) {
	// var theSuburb = document.querySelector('#suburb');
	// var theSuburb = document.getElementById('suburb');

	// console.log(theSuburb.value);	// textContent is not for input fields

	// var requestUrl = 'https://api.domain.com.au/v1/agencies?q=Pyrmont&pageNumber=1&pageSize=2&api_key=key_daead3aa93fcc658fb277dc12fbdb47e';
	// var locationUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=Sydney,NSW,AU&limit=5&appid=' + weatherAPIAppId;
	var locationUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + weatherLocation + ',' + weatherLocationState + ',AU&limit=5&appid=' + weatherAPIAppId;
	fetch(locationUrl)
	.then(function (response) {
		return response.json();
	})
	.then(function (data) {

		var locationLat = data[0].lat;
		var locationLon = data[0].lon;

		console.log(locationLat);
		console.log(locationLon);

		document.querySelector("#latitude").innerHTML = locationLat;
		document.querySelector("#longitude").textContent = locationLon;

		//Loop over the data to generate a table, each table row will have a link to the repo url
		var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat='+data[0].lat +'&lon='+data[0].lon +'&units=metric' +'&appid=' + weatherAPIAppId;
		fetch(weatherUrl)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			console.log(data.main.temp);
			console.log(data.main.feels_like);
			console.log(data.wind.speed);
			console.log(data.main.humidity);

			document.querySelector("#temp").innerHTML = data.main.temp;
			document.querySelector("#feels").innerHTML = data.main.feels_like;
			document.querySelector("#wind").innerHTML = data.wind.speed;
			document.querySelector("#humidity").innerHTML = data.main.humidity;	
		});
	});

	}

    buttonFetchPropertyList.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
    
        getCityCurrentWeatherApi(weatherLocation, 'NSW');
        // fetchResidentialProperties(locationName.value);
    });
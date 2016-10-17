window.onload = function() {

    var weatherAPIKey = 'c7da23ed8d9f406eef0ada24d52a89f2';
    var googleAPIKey = 'AIzaSyCQs3ZXjy4cPjiD53JkZ2LC2NeuCxVto6k';
    var units = '&units=metric';
    var data = {};
    var APICoordinatesRequest = 'https://www.googleapis.com/geolocation/v1/geolocate?key=' + googleAPIKey;
    var weatherByCoordinates = 'http://api.openweathermap.org/data/2.5/weather?lat=';
    var geoLocationData;

    requestAPI('POST', APICoordinatesRequest);

    function requestAPI(postOrGet, URLRequest) {
        var xhr = new XMLHttpRequest();
        xhr.open(postOrGet, URLRequest, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status == 200) {
                    data = JSON.parse(xhr.responseText);
                    callback(data);
                } else if (xhr.status == 400) {
                    alert('There was an error 400');
                } else {
                    alert('There was an error: ' + xhr.status);
                }
            }

        }
        xhr.send();
    }

    function callback(result) {

        if (result.hasOwnProperty('location')) { //this was made to distinguish which API answered and have a single callback function for both
            geoLocationData = result;

            var latitude = geoLocationData.location.lat;
            var longitude = geoLocationData.location.lng;

            weatherByCoordinates += latitude + '&lon=' + longitude + units + '&APPID=' + weatherAPIKey;
            requestAPI('GET', weatherByCoordinates);

        } else { //if it's not the geolocation JSON, I can proceed with using the data I get from the openweatherAPI
            data = result;
            displayInfo(data);
        }
    }
    //convert Celsius to Fahrenheit
    document.querySelector('p[title]').onclick = function() {
        var currentTemperature = 0;
        var newTemperature = 0;
        var currentStandard = document.getElementById('CorF').innerText;
        currentTemperature = document.getElementById('temp').innerText;

        if (currentStandard == '°C') {
            //convert to F
            newTemperature = currentTemperature * 9 / 5 + 32;
            document.getElementById('temp').innerHTML = newTemperature.toFixed(2);
            document.getElementById('CorF').innerHTML = '&#8457';
        } else {
            //convert to C
            newTemperature = (currentTemperature - 32) * 5 / 9;
            document.getElementById('temp').innerHTML = newTemperature.toFixed(2);
            document.getElementById('CorF').innerHTML = '&deg;C';
        }

    };

    function displayInfo(data) {
        var cityNode = document.getElementById('cityName');
        var weatherNode = document.getElementById('weather');
        var temperatureNode = document.getElementById('temp');

        var cityText = document.createTextNode(data.name);
        var weatherText = document.createTextNode(data.weather[0].main);
        var temperatureText = document.createTextNode(data.main.temp);

        cityNode.appendChild(cityText);
        weatherNode.appendChild(weatherText);
        temperatureNode.appendChild(temperatureText);
        
        var weatherCode = data.weather[0].id;
        var currentWeatherImage = document.getElementById('weatherImage');

        if (weatherCode < 300) {
            //thunderstorm
            document.body.style.background = 'url(http://res.cloudinary.com/forgoroe/image/upload/v1476740195/backgrounds/thunder-background.jpg)';
            currentWeatherImage.src = 'http://res.cloudinary.com/forgoroe/image/upload/v1476551911/weather%20svg/sw-27.svg';
        } else if (weatherCode < 400) {
            //drizzle
            document.body.style.background = 'url(http://res.cloudinary.com/forgoroe/image/upload/c_scale,w_1920/v1476727254/backgrounds/rain-winter-painting-stream-forest-nature-mountain.jpg)';
            currentWeatherImage.src = 'http://res.cloudinary.com/forgoroe/image/upload/v1476551912/weather%20svg/sw-12.svg';
        } else if (weatherCode < 600) {
            //rain
            document.body.style.background = 'url(http://res.cloudinary.com/forgoroe/image/upload/c_scale,w_1920/v1476727254/backgrounds/rain-winter-painting-stream-forest-nature-mountain.jpg)';
            currentWeatherImage.src = 'http://res.cloudinary.com/forgoroe/image/upload/v1476551910/weather%20svg/sw-22.svg';
        } else if (weatherCode < 700) {
            //snow
            document.body.style.background = 'url(http://res.cloudinary.com/forgoroe/image/upload/c_scale,w_1920/v1476727249/backgrounds/jro-footsteps-in-the-snow-r1.jpg)';
            currentWeatherImage.src = 'http://res.cloudinary.com/forgoroe/image/upload/v1476551910/weather%20svg/sw-24.svg';
        } else if (weatherCode == 800) {
            //clear
            document.body.style.background = 'url(http://res.cloudinary.com/forgoroe/image/upload/c_scale,w_1920/v1476561810/backgrounds/gcIAxqB.jpg)';
            currentWeatherImage.src = 'http://res.cloudinary.com/forgoroe/image/upload/v1476551909/weather%20svg/sw-01.svg';
        } else if (weatherCode < 900) {
            //clouds
            document.body.style.background = 'url(http://res.cloudinary.com/forgoroe/image/upload/c_scale,w_1920/v1476727287/backgrounds/cloudy-sky_181908-1600x1200.jpg)';
            currentWeatherImage.src = 'http://res.cloudinary.com/forgoroe/image/upload/v1476551911/weather%20svg/sw-06.svg';
        }
    }
}

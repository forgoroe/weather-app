window.onload = function(){
var latitude;
var longitude;
var weatherByCoordinates;
var weatherAPIKey = 'c7da23ed8d9f406eef0ada24d52a89f2';
var units = '&units=metric';
var data = {};

if(checkAvailability()){

  navigator.geolocation.getCurrentPosition(function geo_success(position){
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    weatherByCoordinates = 'http://api.openweathermap.org/data/2.5/weather?lat='+ latitude + '&lon=' + longitude + units + '&APPID=' + weatherAPIKey;
    console.log(latitude, longitude);

    var xhr = new XMLHttpRequest();
    xhr.open("GET", weatherByCoordinates, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            if (xhr.status == 200) {
                data = JSON.parse(xhr.responseText);
                displayInfo(data);
            } else if (xhr.status == 400) {
                alert('There was an error 400');
            } else {
                alert('There was an error: ' + xhr.status);
            }
        }
  }

  xhr.send();

  }, function geo_error(error){
    alert('Problem with retrieving coordinates ' + error.message);
  },
  geo_options = {
    enableHighAccuracy: false,
    maximumAge: 30000,
  });

} else {
  alert('Geolocation not available');
}

//convert Celsius to Fahrenheit
document.querySelector('p[title]').onclick = function(){
  var currentTemperature = 0;
  var newTemperature = 0;
  var currentStandard = document.getElementById('CorF').innerText;
  currentTemperature = document.getElementById('temp').innerText;

  if(currentStandard == '°C'){
    //convert to F
    newTemperature = currentTemperature*9/5+32;
    document.getElementById('temp').innerHTML = newTemperature.toFixed(2);
    document.getElementById('CorF').innerHTML = '&#8457';
  } else{
    //convert to C
    newTemperature = (currentTemperature-32)*5/9;
    document.getElementById('temp').innerHTML = newTemperature.toFixed(2);
    document.getElementById('CorF').innerHTML = '&deg;C';
  }

};

function displayInfo(data){
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

  if (weatherCode < 300){
    currentWeatherImage.src = 'http://res.cloudinary.com/forgoroe/image/upload/v1476551911/weather%20svg/sw-27.svg';
  } else if(weatherCode < 400){
    currentWeatherImage.src = 'http://res.cloudinary.com/forgoroe/image/upload/v1476551912/weather%20svg/sw-12.svg';
  } else if(weatherCode < 600){
    currentWeatherImage.src = 'http://res.cloudinary.com/forgoroe/image/upload/v1476551910/weather%20svg/sw-22.svg';
  } else if(weatherCode < 700){
    currentWeatherImage.src = 'http://res.cloudinary.com/forgoroe/image/upload/v1476551910/weather%20svg/sw-24.svg';
  } else if(weatherCode == 800){
    currentWeatherImage.src = 'http://res.cloudinary.com/forgoroe/image/upload/v1476551909/weather%20svg/sw-01.svg';
  } else if(weatherCode < 900){
    currentWeatherImage.src = 'http://res.cloudinary.com/forgoroe/image/upload/v1476551911/weather%20svg/sw-06.svg';
  }
}

function checkAvailability(){
  if('geolocation' in navigator){
    return true;
  }else{
    return false;
  }
}
}

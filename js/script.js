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
                console.log(xhr.responseText);
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
}

function checkAvailability(){
  if('geolocation' in navigator){
    return true;
  }else{
    return false;
  }
}

}

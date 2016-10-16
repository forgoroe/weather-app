#Weather app

Simple weather app that displays the current position, weather conditions and temperature (which can be viewed in Fahrenheit or Celsius).

I've tried not using jQuery at all, focusing more on pure javascript.

![Preview](http://res.cloudinary.com/forgoroe/image/upload/v1476567006/previews/weatherAppPreview.png)

##Known issues

- Chrome won't allow the use of the app by opening index.html, but will require you to host the files locally to make them work. This issue doesn't occur with Firefox, which will ask you if you want to share your location, or better yet, fire up straight away.

  - UPDATE: [Reason](https://developers.google.com/web/updates/2016/04/geolocation-on-secure-contexts-only). I will probably need to update this "widget" with Google's API to retrieve the coordinates, rather than the using the navigator.geolocation object. This should allow for its use pretty much anywhere. In the mean time you can have a quick look on [github html preview](http://htmlpreview.github.io/?https://github.com/forgoroe/weather-app/blob/master/html/index.html) *on firefox* (N.B. Won't work in Chrome, as I've said).


- The only background change available is the "clear weather" background as it is the one that doesn't mess with the look of the page (I am terrible with fixing aesthetics sometimes)

##Motivation

This project was made by following the [FreeCodeCamp](https://www.freecodecamp.com/) user stories for the [weather app challenge](https://www.freecodecamp.com/challenges/show-the-local-weather).

##Resources and APIs

- [Bootstrap](http://getbootstrap.com/)

- [Fontawesome](http://fontawesome.io/)

- [Ionicons](http://ionicons.com/) (Small thermometer icon)

- [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation)

- [Openweathermap](http://openweathermap.org/)

- [Icons](http://www.danvierich.de/weather/)

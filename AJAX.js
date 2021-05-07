


const api = {
   key: "0ee44bc0e6f29b9f0279439752b45cc9",
   base: "https://api.openweathermap.org/data/2.5/",
}

var Latitude;
var Longitude;
navigator.geolocation.getCurrentPosition(success);
function success(position) {
   Latitude = position.coords.latitude;
   Longitude = position.coords.longitude;
   console.log(Latitude);
   console.log(Longitude);
   fetch(`${api.base}weather?lat=${Latitude}&lon=${Longitude}&units=metric&appid=${api.key}`)
   .then(weather => {
      return weather.json();
   }).then(displayResults);
}

//function getResults(query) {
//   fetch(`${api.base}weather?lat=${Latitude}&lon=${Longitude}&units=metric&appid=${api.key}`)
//   .then(weather => {
//      return weather.json();
//   }).then(displayResults);
//}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
   if (evt.keyCode == 13) {
      getResults(searchbox.value);
   }
}


function getResults(query) {
      fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
      .then(weather => {
         return weather.json();
      }).then(displayResults);
}

function displayResults(weather) {
   console.log(weather);
   let city = document.querySelector('.city');
   city.innerText = `${weather.name}, ${weather.sys.country}`;

   let now = new Date();
   let date = document.querySelector('.date');
   date.innerText = dateBuilder(now);

   let temp = document.querySelector('.temp');
   temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

   let description = document.querySelector('.description');
   description.innerHTML = weather.weather[0]['description'];

   let pic = document.querySelector('.left__panel__wether__icon');
   pic.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather.weather[0]['icon']}@2x.png">`

}



function dateBuilder(d) {
   let months = ["January", "February", "March", "Aprile", "May", "June", "July", "August", "September", "October", "November", "December"];
   let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friaday", "Saturday"];

   let day = days[d.getDay()];
   let date = d.getDate();
   let month = months[d.getMonth()];
   let year = d.getFullYear();

   return `${day} ${date} ${month} ${year}`;
}


//var dt = new Date();
//document.getElementById("datetime").innerHTML = dt.toLocaleString();
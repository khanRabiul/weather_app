
// Selection
const formData = document.getElementById("form-data");
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temp');
const weahterIcon = document.getElementById('weather-icon');
const maxTemperature = document.getElementById('max-temp');
const minTemperature = document.getElementById('min-temp');
const humidity = document.getElementById('humidity');
const clouds = document.getElementById('clouds');
const wind = document.getElementById('wind');
const dateTime = document.getElementById('date-time');
const weatherTitle = document.getElementById('title');

const API_KEY = '642cdc262fa89f0450da745f8aabaa68';
const URL = 'https://api.openweathermap.org/data/2.5/weather';

const getWeather = async(lat, long) =>{
  const res = await fetch(`${URL}?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`);
  const data = await res.json();
  console.log(data);
  cityName.innerText = data?.name;
  temperature.innerText = `${Math.round(data?.main?.temp)} °C`;

  switch(data?.weather[0]?.main) {
    case "Haze":
      weahterIcon.src= "/assets/haze.svg";
      document.body.style.backgroundImage = `url('assets/backgrounds/haze.jpg')`;
      break;
    case "Drizzle":
      weahterIcon.src = "/assets/drizzle-svgrepo-com.svg";
      document.body.style.backgroundImage = `url('assets/backgrounds/drizzle.jpg')`;
      break;
    case "Rain":
      weahterIcon.src = "/assets/rainy.svg";
      document.body.style.backgroundImage = `url('assets/backgrounds/rainy-day.jpg')`;
      break;
    case "Snow":
      weahterIcon.src = "/assets/icons/snow.svg";
      document.body.style.backgroundImage = `url('assets/backgrounds/snow.jpg')`;
      break;
    case "Thunderstorm":
      weahterIcon.src = "/assets/thunder.svg";
      document.body.style.backgroundImage = `url('assets/backgrounds/thunderstorm.jpg')`;
      break;
    case "Clouds":
      weahterIcon.src = "/assets/cloud.svg";
      document.body.style.backgroundImage = `url('assets/backgrounds/clouds.png')`;
      break;
    default:
      weahterIcon.src = "/assets/sun.svg";
      document.body.style.backgroundImage = `url('assets/backgrounds/sunny.jpg')`;
  };

  maxTemperature.innerText = `${Math.round(data?.main?.temp_max)}`;
  minTemperature.innerText = `${Math.round(data?.main?.temp_min)}`;
  humidity.innerText = `${Math.round(data?.main?.humidity)}`;
  clouds.innerText = `${Math.round(data?.clouds?.all)}%`;
  wind.innerText = `${Math.round(data?.wind?.speed)}`;
  weatherTitle.innerHTML = `<p>THE WEATHER IS <u class= "text-orange-500">${data?.weather[0].main}</u></p>`

};

const getWeatherByCity = async (city) => {
  const res = await fetch(`${URL}?q=${city}&appid=${API_KEY}&units=metric`);
  const data = await res.json();
   cityName.innerText = data?.name;
   temperature.innerText = `${Math.round(data?.main?.temp)}°C`;
};

formData.addEventListener('submit',(e) => {
  e.preventDefault();
  const city = e.target["search-input"].value.trim();
  if(city){
      getWeatherByCity(city);
      e.target["search-input"].value = "";
}
});
navigator.geolocation.getCurrentPosition((position) =>{
  const {latitude, longitude} = position.coords;
  getWeather(latitude, longitude);
});




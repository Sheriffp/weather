const apiKey = "c5721ea5d4fcb6c0bfd84232364fbc32";

const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

const imgUrl = `https://openweathermap.org/img/wn/`;

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

async function checkWeather(city) {
	const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

	if (response.status === 404) {
		document.querySelector(".error").style.display = "block";
		document.querySelector(".weather").style.display = "none";
	} else {
		const data = await response.json();
		console.log(data);
		document.querySelector(".city").innerHTML = data.name;
		document.querySelector(".country").innerHTML = regionNames.of(
			data.sys.country
		);
		document.querySelector(".temp").innerHTML =
			Math.round(data.main.temp) + "°c";
		document.querySelector(".humidity").innerHTML =
			data.main.humidity + "%";
		document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
		document.querySelector(".description").innerHTML =
			data.weather[0].description;
		document.querySelector(".weather-icon").src =
			imgUrl + data.weather[0].icon + "@2x.png";

		document.querySelector(".weather").style.display = "block";
		document.querySelector(".error").style.display = "none";
	}
}

searchBtn.addEventListener("click", () => {
	checkWeather(searchBox.value);
});

checkWeather("lagos");

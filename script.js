function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const resultDiv = document.getElementById("weatherResult");

  if (!city) {
    resultDiv.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  resultDiv.innerHTML = "Loading...";

  fetch(`https://wttr.in/${city}?format=j1`)
    .then(res => res.json())
    .then(data => {
      const area = data.nearest_area[0].areaName[0].value;
      const country = data.nearest_area[0].country[0].value;
      const condition = data.current_condition[0].weatherDesc[0].value;
      const tempC = data.current_condition[0].temp_C;
      const feelsLike = data.current_condition[0].FeelsLikeC;

      resultDiv.innerHTML = `
        <h2>${area}, ${country}</h2>
        <p><strong>Temperature:</strong> ${tempC}°C</p>
        <p><strong>Feels Like:</strong> ${feelsLike}°C</p>
        <p><strong>Condition:</strong> ${condition}</p>
      `;
    })
    .catch(err => {
      resultDiv.innerHTML = "<p>Error fetching weather data. Please try again.</p>";
    });
}


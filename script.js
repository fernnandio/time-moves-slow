const API_KEY = "3fdb5ae496804e38829212438241712";

async function fetchWeather(location, tempId, descId, iconId) {
    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        const temp = `${data.current.temp_c}°C`;
        const description = data.current.condition.text;
        const icon = data.current.condition.icon;

        document.getElementById(tempId).textContent = temp;
        document.getElementById(descId).textContent = description;
        document.getElementById(iconId).src = `https:${icon}`;
        document.getElementById(iconId).style.display = "block";
    } catch (error) {
        console.error(`Error fetching weather for ${location}:`, error);
        document.getElementById(tempId).textContent = "Weather unavailable";
    }
}

function updateClocks() {
    const now = new Date();

    document.getElementById("porto-time").textContent = now.toLocaleTimeString("en-GB", {
        timeZone: "Europe/Lisbon",
    });

    document.getElementById("santa-tecla-time").textContent = now.toLocaleTimeString("en-GB", {
        timeZone: "America/El_Salvador",
    });
}

fetchWeather("Funchal, Portugal", "porto-temp", "porto-desc", "porto-icon");
fetchWeather("Santa Tecla", "santa-tecla-temp", "santa-tecla-desc", "santa-tecla-icon");

updateClocks();
setInterval(updateClocks, 1000);

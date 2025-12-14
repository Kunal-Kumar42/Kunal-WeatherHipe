
let baseTempC = null;     
let currentUnit = "cel"; 



let searchicon = document.querySelector(".searchicon");
let takeinput = document.querySelector(".takeinput");
let err = document.getElementById("error-msg");

function applyUnit(unit) {
    console.log("applyunit")
    if (baseTempC === null) return;

    let finalTemp;
    let symbol;

    if (unit === "cel") {
        finalTemp = baseTempC;
        symbol = "°C";
    }
    else if (unit === "fah") {
        finalTemp = (baseTempC * 9/5) + 32;
        symbol = "°F";
    }
    else if (unit === "kelvin") {
        finalTemp = baseTempC + 273.15;
        symbol = "K";
    }   else {
        console.error(`Unknown unit: ${unit}`);
        return;  
    }

    currentUnit = unit;

    document.getElementById("temp-box").innerText = `${finalTemp.toFixed(1)}${symbol}`;
}


function updateWeatherUI(data) {
    document.getElementById("city-title").innerText =
        data.location.name + " , " +
        data.location.region + " , " +
        data.location.country;

    document.getElementById("current-date").innerText = data.location.localtime;
    baseTempC = data.current.temp_c;
    applyUnit(currentUnit);

    document.getElementById("desc-box").innerText = "Weather: " + data.current.condition.text;
    document.getElementById("hum-box").innerText = "Humidity: " + data.current.humidity + "%";
    document.getElementById("wind-box").innerText = "Wind: " + data.current.wind_kph + " kmph";
    document.getElementById("press-box").innerText = "Pressure: " + data.current.pressure_mb + " mb";

    let cond = data.current.condition.text.toLowerCase();
    document.getElementById("icon-box").innerText =
        cond.includes("rain") ? "🌧️" :
        cond.includes("cloud") ? "☁️" :
        "☀️";
}


function getWeather(cityName) {
    err.innerText = "";

    fetch(`https://api.weatherapi.com/v1/current.json?key=37b3b768a71542dc8fe02325250811&q=${cityName}&aqi=yes`)
        .then(res => res.json())
        .then(data => {

            if (data.error) {
                err.innerText = "City not found. Please check the spelling.";
                return;
            }

            updateWeatherUI(data);
        });
}

getWeather("kharagpur");


searchicon.addEventListener("click", ()=> {
    let city = takeinput.value.trim();

    if (city === "") {
        err.innerText = "Please enter a city name.";
        return;
    }

    getWeather(city);
});

takeinput.addEventListener("keypress", (e)=>{
    if(e.key === "Enter"){
        searchicon.click();
    }
});


document.getElementById("unit-select").addEventListener("change", () => {
    let selectedUnit = document.getElementById("unit-select").value;
    applyUnit(selectedUnit);
});


let overlay = document.getElementById("overlay");
let loginPopup = document.getElementById("loginPopup");
let signupPopup = document.getElementById("signupPopup");

document.querySelector(".signin button").onclick = (e) => {
    e.preventDefault();
    overlay.style.display = "block";
    loginPopup.style.display = "block";
    setTimeout(() => {
        loginPopup.style.transform = "translate(-50%, -50%) scale(1)";
    }, 10);
};

document.getElementById("switchToSignup").onclick = () => {
    loginPopup.style.display = "none";
    signupPopup.style.display = "block";
};

document.getElementById("switchToLogin").onclick = () => {
    signupPopup.style.display = "none";
    loginPopup.style.display = "block";
};

overlay.onclick = () => {
    overlay.style.display = "none";
    loginPopup.style.display = "none";
    signupPopup.style.display = "none";
};

document.getElementById("loginBtn").onclick = () => {
    alert("Login Successful!");
    overlay.style.display = "none";
    loginPopup.style.display = "none";
};

document.getElementById("signupBtn").onclick = () => {
    alert("Signup Successful!");
    overlay.style.display = "none";
    signupPopup.style.display = "none";
};

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

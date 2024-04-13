// create an object for the html elmenets
const elements = {
  searchBox: document.getElementById("search-box"),
  searchButton: document.getElementById("search-button"),
  img: document.getElementById("img"),
  temp: document.getElementById("temp"),
  city: document.getElementById("city"),
  windSpeed: document.getElementById("wind-speed"),
  humidity: document.getElementById("humidity"),
};
// fetch data
async function getData(city) {
  try {
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=381724a045a15e043c448e73ef2175a6`
    );
    // get the json data
    const myData = await data.json();
    // start weather state image change in html
    const weatherState = myData["weather"][0]["main"];
    elements.img.src = "";
    switch (weatherState.toLowerCase()) {
      case "Clouds".toLowerCase():
        elements.img.src = "../images/clouds.png";
        break;
      case "clear".toLowerCase():
        elements.img.src = "../images/clear.png";
        break;
      case "drizzle".toLowerCase():
        elements.img.src = "../images/drizzle.png";
        break;
      case "snow".toLowerCase():
        elements.img.src = "../images/snow.png";
        break;
      case "rain".toLowerCase():
        elements.img.src = "../images/rain.png";
        break;
      case "mist".toLowerCase():
        elements.img.src = "../images/mist.png";
        break;
      default:
        elements.img.src = "";
        break;
    }
    // end

    // get temp
    const temp = Math.round(((myData["main"]["temp"] - 30) * 5) / 9); // converted from F to C
    elements.temp.innerHTML = `${temp}°C`;
    // end

    // get city
    const cityName = myData["name"];
    elements.city.innerHTML = cityName;
    // end

    // get wind speed
    const windSpeed = Math.round(myData["wind"]["speed"]);
    elements.windSpeed.innerHTML = `${windSpeed} Km/h`;
    // end

    // start humidity
    const humidity = myData["main"]["humidity"];
    elements.humidity.innerHTML = `${humidity}%`;
    // hundel the errors
  } catch (err) {
    // create a div and add a css class to it
    const showError = document.createElement("div");
    if (elements.searchBox.value === "") {
      showError.innerHTML = "you can't leave the search box empty";
    } else {
      showError.innerHTML =
        "you lost connection! or you typed a wronge city name";
    }
    // add the class to the error div
    showError.classList.add("error");
    document.body.append(showError);
    // reload the page after 1.5s
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  }
}
// search button click to show all info
elements.searchButton.addEventListener("click", () => {
  getData(elements.searchBox.value);
});
// click the button when click enter on the keyboard
document.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    elements.searchButton.click();
  }
});
// to focus on the search box on page load
window.onload = () => {
  elements.searchBox.focus();
};

// i made this script my own without any google help or any video on youtube except the disign

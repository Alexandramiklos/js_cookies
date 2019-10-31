var baseUrl =
  "https://api.apixu.com/v1/current.json?key=5945f5e3ffc044faa2e180009192005&q=Cluj-Napoca";

var radioButtons = document.querySelectorAll(".weatherCookie [type=radio]");
radioButtons.forEach(function(radioButton) {
  var currentScale = getCookie("scale");
  if (currentScale === radioButton.value) {
    radioButton.checked = true;
  }
  radioButton.addEventListener("change", displayWeather);
});

displayWeather();

function displayWeather() {
  fetch(baseUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var weather = document.querySelector(".weatherCookie span");
      var checkedRadio = document.querySelector(
        ".weatherCookie input[name=scale]:checked"
      );
      if (!checkedRadio) {
        return;
      }
      var valueRadio = checkedRadio.value;
      document.cookie = "scale=" + valueRadio + ";";
      if (valueRadio === "Celsius") {
        weather.innerHTML =
          data.current.temp_c + " " + data.current.condition.text;
      } else {
        weather.innerHTML =
          data.current.temp_f + " " + data.current.condition.text;
      }
    });
}

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length === 2) {
    return parts
      .pop()
      .split(";")
      .shift();
  }
  return "";
}

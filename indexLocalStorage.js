var baseUrl =
  "https://api.apixu.com/v1/current.json?key=5945f5e3ffc044faa2e180009192005&q=Cluj-Napoca";

var radioButtons = document.querySelectorAll(".weatherLocal [type=radio]");
radioButtons.forEach(function(radioButton) {
  var currentScale = localStorage.getItem("scale");
  if (currentScale === radioButton.value) {
    radioButton.checked = true;
  }
  radioButton.addEventListener("change", displayWeatherLocal);
});

displayWeatherLocal();

function displayWeatherLocal() {
  fetch(baseUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var weather = document.querySelector(".weatherLocal span");
      var checkedRadio = document.querySelector(
        ".weatherLocal input[name=scale_local]:checked"
      );
      if (!checkedRadio) {
        return;
      }
      var valueRadio = checkedRadio.value;
      localStorage.setItem("scale", valueRadio);
      if (valueRadio === "Celsius") {
        weather.innerHTML =
          data.current.temp_c + " " + data.current.condition.text;
      } else {
        weather.innerHTML =
          data.current.temp_f + " " + data.current.condition.text;
      }
    });
}

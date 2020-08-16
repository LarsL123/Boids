const avoidanceSlider = document.getElementById("avoidance");
const centerUrgeSlider = document.getElementById("centerUrge");
const matchVelocitySlider = document.getElementById("matchVelocity");

const sliderRange = 100;

initSlider(avoidanceSlider);
initSlider(centerUrgeSlider);
initSlider(matchVelocitySlider);

function initSlider(slider) {
  slider.min = 0;
  slider.max = sliderRange;
  slider.value = sliderRange / 2;
}

avoidanceSlider.oninput = function () {
  avoidance = this.value / sliderRange;
};

centerUrgeSlider.oninput = function () {
  centerUrge = this.value / sliderRange;
};

matchVelocitySlider.oninput = function () {
  matchingUrge = this.value / sliderRange;
};

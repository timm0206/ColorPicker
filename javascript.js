"use strict";
var colorWell;
var defaultColor = "#0000ff";
var primeColor;
let myHsl;

window.addEventListener("load", startup);

function startup() {
  colorWell = document.querySelector("#colorWell");
  colorWell.addEventListener("input", primeSelector);
}

function primeSelector(event) {
  var box = document.querySelector("#box0");
  box.style.backgroundColor = event.target.value;
  primeColor = event.target.value;

  hexToRgb();
}

function hexToRgb() {
  console.log(primeColor);
  let subPrime1 = primeColor.substring(1, 3);
  let subPrime2 = primeColor.substring(3, 5);
  let subPrime3 = primeColor.substring(5, 7);

  console.log(subPrime1, subPrime2, subPrime3);

  let r = parseInt(subPrime1, 16);
  let g = parseInt(subPrime2, 16);
  let b = parseInt(subPrime3, 16);
  console.log(r, g, b);
  rgbToHsl(r, g, b);
}

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  console.log("hsl(%f,%f%,%f%)", h, s, l); // just for testing

  palettePicker(h, s, l);
}

function palettePicker(h, s, l) {
  console.log("PalettePicker");
  document.querySelector(".analogButton").addEventListener("click", () => {
    analogPalette(h, s, l);
  });
  document.querySelector(".monochromatic").addEventListener("click", () => {
    monoPalette(h, s, l);
  });
  document.querySelector(".triad").addEventListener("click", () => {
    triadPallette(h, s, l);
  });
  document.querySelector(".complimentary").addEventListener("click", () => {
    compPallette(h, s, l);
  });
  document.querySelector(".compound").addEventListener("click", () => {
    compoundPalette(h, s, l);
  });
  document.querySelector(".shade").addEventListener("click", () => {
    shadePalette(h, s, l);
  });
}

function analogPalette(h, s, l) {
  console.log("Analog");

  let box1 = document.querySelector("#box1");
  let box2 = document.querySelector("#box2");
  let box3 = document.querySelector("#box3");
  let box4 = document.querySelector("#box4");
  box2.style.backgroundColor =
    "hsl(" + (h + 22.5) + ", " + s + "%, " + l + "%)";
  box1.style.backgroundColor =
    "hsl(" + (h - 22.5) + ", " + s + "%, " + l + "%)";
  box3.style.backgroundColor = "hsl(" + (h - 45) + ", " + s + "%, " + l + "%)";
  box4.style.backgroundColor = "hsl(" + (h + 45) + ", " + s + "%, " + l + "%)";

  visRgb();
}

function monoPalette(h, s, l) {
  console.log("Mono");

  let box1 = document.querySelector("#box1");
  let box2 = document.querySelector("#box2");
  let box3 = document.querySelector("#box3");
  let box4 = document.querySelector("#box4");
  box2.style.backgroundColor = "hsl(" + h + ", " + s + "%, " + (l - 10) + "%)";
  box1.style.backgroundColor = "hsl(" + h + ", " + s + "%, " + (l - 20) + "%)";
  box3.style.backgroundColor = "hsl(" + h + ", " + s + "%, " + (l - 30) + "%)";
  box4.style.backgroundColor = "hsl(" + h + ", " + s + "%, " + (l - 40) + "%)";

  visRgb();
}

function triadPallette(h, s, l) {
  console.log("Triad");

  let box1 = document.querySelector("#box1");
  let box2 = document.querySelector("#box2");
  let box3 = document.querySelector("#box3");
  let box4 = document.querySelector("#box4");
  box2.style.backgroundColor = "hsl(" + (h - 120) + ", " + s + "%, " + l + "%)";
  box1.style.backgroundColor = "hsl(" + (h + 120) + ", " + s + "%, " + l + "%)";
  box3.style.backgroundColor = "hsl(" + (h - 120) + ", " + s + "%, " + l + "%)";
  box4.style.backgroundColor = "hsl(" + (h + 120) + ", " + s + "%, " + l + "%)";

  visRgb();
}

function compPallette(h, s, l) {
  console.log("Comp");

  let box1 = document.querySelector("#box1");
  let box2 = document.querySelector("#box2");
  let box3 = document.querySelector("#box3");
  let box4 = document.querySelector("#box4");
  box2.style.backgroundColor = "hsl(" + (h - 180) + ", " + s + "%, " + l + "%)";
  box1.style.backgroundColor = "hsl(" + (h + 180) + ", " + s + "%, " + l + "%)";
  box3.style.backgroundColor = "hsl(" + h + ", " + s + "%, " + l + "%)";
  box4.style.backgroundColor = "hsl(" + h + ", " + s + "%, " + l + "%)";

  visRgb();
}
function compoundPalette(h, s, l) {
  console.log("Compound");

  let box1 = document.querySelector("#box1");
  let box2 = document.querySelector("#box2");
  let box3 = document.querySelector("#box3");
  let box4 = document.querySelector("#box4");
  box2.style.backgroundColor = "hsl(" + (h - 45) + ", " + s + "%, " + l + "%)";
  box1.style.backgroundColor = "hsl(" + (h + 45) + ", " + s + "%, " + l + "%)";
  box3.style.backgroundColor = "hsl(" + (h + 180) + ", " + s + "%, " + l + "%)";
  box4.style.backgroundColor = "hsl(" + (h - 180) + ", " + s + "%, " + l + "%)";

  visRgb();
}

function shadePalette(h, s, l) {
  console.log("Shade");
  let box1 = document.querySelector("#box1");
  let box2 = document.querySelector("#box2");
  let box3 = document.querySelector("#box3");
  let box4 = document.querySelector("#box4");
  box2.style.backgroundColor = "hsl(" + h + ", " + (s - 15) + "%, " + l + "%)";
  box1.style.backgroundColor = "hsl(" + h + ", " + (s - 30) + "%, " + l + "%)";
  box3.style.backgroundColor = "hsl(" + h + ", " + (s - 45) + "%, " + l + "%)";
  box4.style.backgroundColor = "hsl(" + h + ", " + (s - 60) + "%, " + l + "%)";

  visRgb();
}

function visRgb() {
  console.log("VisRGB");
  let box3P = document.querySelector("#p3");
  let box3C = document.querySelector("#box3").style.backgroundColor;
  box3P.textContent = box3C;

  let box1P = document.querySelector("#p1");
  let box1C = document.querySelector("#box1").style.backgroundColor;
  box1P.textContent = box1C;

  let box0P = document.querySelector("#p0");
  let box0C = document.querySelector("#box0").style.backgroundColor;
  box0P.textContent = box0C;

  let box2P = document.querySelector("#p2");
  let box2C = document.querySelector("#box2").style.backgroundColor;
  box2P.textContent = box2C;

  let box4P = document.querySelector("#p4");
  let box4C = document.querySelector("#box4").style.backgroundColor;
  box4P.textContent = box4C;

  startup();
}

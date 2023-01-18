"use strict";

// MODEL
let primaryNum = "";
let secondaryNum = "";
let operatorSelected = null;
let decimalPressed = false;

function calculate() {
  return 5;
}

// VIEW
let primaryDisplay = document.getElementById("primary-display");
let secondaryDisplay = document.getElementById("secondary-display");

function updatePrimary(string) {
  primaryDisplay.innerText = string;
}

function updateSecondary(string) {
  secondaryDisplay.innerText = string;
}

updatePrimary(String(primaryNum));
updateSecondary(String(secondaryNum));

let buttons = Array.from(document.querySelectorAll(".button"));
buttons.forEach((button) => {
  button.addEventListener("click", processInput);
});

// CONTROLLER
function processInput() {
  let button = this.innerText;
  switch (button) {
    case "AC":
    case "DEL":
      functionKey(button);
      break;
    case ".":
      decimalKey(button);
      break;
    case "+":
    case "-":
    case "⨉":
    case "÷":
    case "=":
      operatorKey(button);
      break;
    default:
      numberKey(button);
  }
  updatePrimary(primaryNum);
  updateSecondary(secondaryNum);
}

function functionKey(button) {
  if (button === "AC") {
    primaryNum = "";
    secondaryNum = "";
  } else {
    primaryNum = primaryNum.substring(0, primaryNum.length - 1);
  }
}

function operatorKey(button) {
  if (button === "=") {
    primaryNum = calculate();
    secondaryNum = "";
    operatorSelected == null;
  } else {
    secondaryNum = calculate();
    primaryNum = "";
    operatorSelected = button;
  }
}

function numberKey(button) {
  if (primaryNum.length < 14) {
    primaryNum = primaryNum + button;
  }
}

function decimalKey(button) {
  if (!decimalPressed) {
    primaryNum = primaryNum + button;
  }
  decimalPressed = true;
}

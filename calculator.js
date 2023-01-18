"use strict";

// MODEL
let primaryNum = "";
let secondaryNum = "";
let operatorSelected = "";
let decimalPressed = false;

function calculate() {
  switch (operatorSelected) {
    case "+":
      return String(round(parseFloat(primaryNum) + parseFloat(secondaryNum)));
    case "-":
      return String(round(parseFloat(secondaryNum) - parseFloat(primaryNum)));
    case "÷":
      if (primaryNum == "0") {
        prompt(
          "Impossible calculation!",
          "Press OK and try a different calculation"
        );
        primaryNum = "";
        secondaryNum = "";
        operatorSelected = "";
        return "";
      }
      return String(round(parseFloat(secondaryNum) / parseFloat(primaryNum)));
    case "⨉":
      return String(round(parseFloat(secondaryNum) * parseFloat(primaryNum)));
  }
  operatorSelected = "";
}

function round(number) {
  return Math.round(number * 1000000) / 1000000;
}

// VIEW
let primaryDisplay = document.getElementById("primary-display");
let secondaryDisplay = document.getElementById("secondary-display");

function updatePrimary(string) {
  primaryDisplay.innerText = string;
}

function updateSecondary(string) {
  secondaryDisplay.innerText = `${string} ${operatorSelected}`;
}

let buttons = Array.from(document.querySelectorAll(".button"));
buttons.forEach((button) => {
  button.addEventListener("click", processInput);
});

// CONTROLLER
function processInput() {
  if (!String(primaryNum).includes(".")) {
    decimalPressed = false;
  }
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
    operatorSelected = "";
  } else {
    primaryNum = primaryNum.substring(0, primaryNum.length - 1);
  }
}

function operatorKey(button) {
  if (button === "=") {
    if (operatorSelected !== "" && secondaryNum !== "" && primaryNum !== "") {
      primaryNum = calculate();
      secondaryNum = "";
      operatorSelected = "";
    }
  } else if (
    // All the other operators
    secondaryNum === "" &&
    operatorSelected === "" &&
    primaryNum !== ""
  ) {
    operatorSelected = button;
    secondaryNum = primaryNum;
    primaryNum = "";
  } else if (
    operatorSelected !== "" &&
    secondaryNum !== "" &&
    primaryNum !== ""
  ) {
    secondaryNum = calculate();
    primaryNum = "";
    operatorSelected = button;
  } else if (
    operatorSelected !== "" &&
    secondaryNum !== "" &&
    primaryNum === ""
  ) {
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

let x, y, operator, frac;

display = document.querySelector("#display");

function reset() {
  x = "0";
  y = "";
  operator = "";
  display.textContent = x;
  frac = false;
}

reset();

function operate(operation, x, y) {
  switch (operation) {
    case "+":
      return x + y;
    case "-":
      return x - y;
    case "x":
      return x * y;
    case "/":
      if (y === 0) {
        return "ERROR";
      }
      return x / y;
  }
}

function calculateAndDisplay() {
  if (operator === "" || y === "") {
    return;
  }
  display.textContent = parseFloat(operate(operator, parseFloat(x), parseFloat(y)).toFixed(7));
  x = display.textContent;
  operator = "";
  y = "";
  frac = false;
}

function interfacing(event) {
  let target = event.target;
  console.log(target);

  if (!target.dataset.key) return;
  switch (target.dataset.key) {
    case "Backspace":
      reset();
      break;
    case "+/-":
      if(display.textContent == "0"){
        break;
      }
      else if(display.textContent[0] == "-") {
        display.textContent = display.textContent.substring(1);
      } else {
        display.textContent = "-" + display.textContent;
      }
      break;
    case "+":
    case "-":
    case "x":
    case "/":
      if (y !== "") {
        calculateAndDisplay();
        frac = false;
      } else {
        frac = false;
      }
      operator = target.dataset.key;
      break;
    case "=":
      y = parseFloat(display.textContent);
      calculateAndDisplay();
      frac = false;
      break;
    case "%":
      display.textContent = parseFloat(display.textContent) / 100;
      if(operator === "") {
        x = display.textContent;
      } else {
        y = display.textContent;
      }
      frac = true;
      break;
    case ".":
      if (!frac) {
        display.textContent += ".";
        frac = true;
        if(operator === "") {
          x = display.textContent;
        } else {
          y = display.textContent;
        }
      }
      break;
    default:
      if(display.textContent.length > 9) {
        return;
      }
      display.textContent = ((display.textContent === "0" || (operator !== "" && y === "")) ? "" : display.textContent) + target.dataset.key;
      if(operator === "") {
        x = display.textContent;
      } else {
        y = display.textContent;
      }
  }
}

document.querySelector("#calculator").addEventListener("click", interfacing);

window.addEventListener("keydown", interfacing);

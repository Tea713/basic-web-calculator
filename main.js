let x, y, operator, frac, toY;

display = document.querySelector("#display");

function reset() {
  x = 0;
  y = null;
  operator = "";
  display.textContent = 0;
  frac = false;
  toY = false;
}

reset();

function operate(operation, x, y) {
  // if (typeof x != "number" || typeof y != "number") {
  //     return "ERROR";
  // }
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
  if (operator === "" || y === null) {
    return;
  }
  display.textContent = operate(operator, x, y).toFixed(7);
  x = parseFloat(display.textContent);
  operator = "";
  y = null;
  frac = false;
  toY = false;
}

function interfacing(event) {
  let target = event.target;
  console.log(target);

  if (!target.dataset.key) return;
  switch (target.dataset.key) {
    case "Backspace":
      reset();
      break;
    case "+":
    case "-":
    case "x":
    case "/":
      if (operator !== "" && !toY) {
        y = parseFloat(display.textContent);
        calculateAndDisplay();
        frac = false;
      } else {
        x = parseFloat(display.textContent);
        toY = true;
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
      if (y !== null) {
        y = y / 100;
      } else {
        x = x / 100;
      }
      frac = true;
      break;
    case ".":
      if (!frac) {
        display.textContent += ".";
        frac = true;
      }
      break;
    default:
      if (display.textContent === "0" || toY) {
        display.textContent = target.dataset.key;
        toY = false;
      } else {
        display.textContent += target.dataset.key;
      }
  }
}

document.querySelector("#calculator").addEventListener("click", interfacing);

window.addEventListener("keydown", interfacing);

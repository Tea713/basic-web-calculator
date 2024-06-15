let x = 0, y = 0;
let operator = "";

function operate(operation, x, y) {
    switch(operation) {
        case "add":
            return x + y;
        case "subtract":
            return x - y;
        case "multiply":
            return x * y;
        case "divide":
            return x / y;
    }
}
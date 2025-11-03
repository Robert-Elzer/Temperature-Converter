let inputNum = document.getElementById("input");
let inputUnit = document.getElementById("input-unit");
let outputUnit = document.getElementById("output-unit");
let convertbtn = document.getElementById("convert-btn");
let container = document.getElementById("container");

function toCelcius(value, fromUnit) {
    if (fromUnit === "Celsius (°C)") {
        return value;
    } else if (fromUnit === "Fahrenheit (°F)") {
        return (value - 32) * (5 / 9);
    } else if (fromUnit === "Kelvin (K)") {
        return value - 273.15;
    } else {
        return NaN;
    }
}

// Convert from Celcius to target unit
function fromCelcius(celsiusValue, toUnit) {
    if (toUnit === "Celsius (°C)") {
        return celsiusValue;
    } else if (toUnit === "Fahrenheit (°F)") {
        return (celsiusValue * 9 / 5) + 32;
    } else if (toUnit === "Kelvin (K)") {
        return celsiusValue + 273.15;
    } else {
        return NaN;
    }
}

//Main converting function
function convertTemperature() {
    //get values
    let value = parseFloat(inputNum.value);
    let fromUnit = inputUnit.value;
    let toUnit = outputUnit.value;

    //basic safety check
    if (isNaN(value)) {
        alert("Please enter a valid number");
        return;
    }
    // Convert to Celcius first, then to Target Unit
    let celciusValue = toCelcius(value, fromUnit);
    let result = fromCelcius(celciusValue, toUnit);
    //Display Result
    const roundedResult = result.toFixed(2);
    //check for result display element
    let resultDisplay = document.getElementById("result-display");
    if (!resultDisplay) {
        resultDisplay = document.createElement("p");
        resultDisplay.id = "result-display";
        container.parentNode.insertBefore(resultDisplay, container.nextSibling);
    }
    resultDisplay.textContent = `${value} ${fromUnit} is equal to ${roundedResult} ${toUnit}`;
}

//Form validation logic
function checkFormValidity() {
    //check if input field is not empty
    const isInputFilled = inputNum.value !== "" && !isNaN(parseFloat(inputNum.value));
    //check if units are different
    const unitsAreDifferent = inputUnit.value !== outputUnit.value;
    //Button gets enabled when both conditions are met
    if (isInputFilled && unitsAreDifferent) {
        convertbtn.disabled = false;
    } else {
        convertbtn.disabled = true;
    }
}

//Event listeners for input change
inputNum.addEventListener("input", checkFormValidity);
inputUnit.addEventListener("change", checkFormValidity);
outputUnit.addEventListener("change", checkFormValidity);

//Event listener for convert button
convertbtn.addEventListener("click", function(event) {
event.preventDefault();
convertTemperature();
});

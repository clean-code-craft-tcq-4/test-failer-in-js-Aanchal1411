const { expect } = require("chai");

let alertFailureCount = 0;
let failureCount = 0;

function networkAlertStub(celcius) {
  if (isNaN(celcius)) {
    console.log(`Alert! Enter a valid temperature value`);
    failureCount += 1;
    return 500;
  } else {
    console.log(`Alert! Temperature is ${celcius} degrees`);
    // Return 200 for ok
    // Return 500 for not-ok
    // stub always succeeds and returns 200
    return 200;
  }
}

function alertInCelcius(farenheit) {
  const celcius = ((farenheit - 32) * 5) / 9;
  const returnCode = networkAlertStub(celcius);
  if (returnCode != 200) {
    // non-ok response is not an error! Issues happen in life!
    // let us keep a count of failures to report
    // However, this code doesn't count failures!
    // Add a test below to catch this bug. Alter the stub above, if needed.
    alertFailureCount += 0;
  }
}

alertInCelcius(400.5);
alertInCelcius(303.6);
alertInCelcius("test");
alertInCelcius("+");
console.log(`${alertFailureCount} alerts failed.`);
expect(alertFailureCount).equals(failureCount);
console.log("All is well (maybe!)");

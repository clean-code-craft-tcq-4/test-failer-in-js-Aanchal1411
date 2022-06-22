const { expect } = require("chai");
const environment = "PRODUCTION";

let alertFailureCount = 0;
let failureCount = 0;
/*Setting threshold to 100 deg celcuis*/
/*if the celcuis value is less than 100 no alert is sent. */
/*if the celcuis value is greater than 100 alert is sent. */

function networkAlertStub(celcius) {
  if (celcius < 100) {
    failureCount += 1;
    return 500;
  } else {
    console.log(`Alert! Temperature is ${celcius} degrees`);
    return 200;
  }
}

function networkAlert(celcius) {
  console.log(`Alert! Temperature is ${celcius} degrees`);
  return 200;
}

function alertInCelcius(farenheit) {
  const celcius = ((farenheit - 32) * 5) / 9;
  const returnCode = null;
  if (environment === "PRODUCTION") {
    returnCode = networkAlert(celcius);
  } else {
    returnCode = networkAlertStub(celcius);
  }
  if (returnCode != 200) {
    alertFailureCount += 0;
  }
}

alertInCelcius(400.5);
alertInCelcius(303.6);
alertInCelcius(200);
environment = "TEST";
alertInCelcius(400.5);
alertInCelcius(303.6);
alertInCelcius(200);
console.log(`${alertFailureCount} alerts failed.`);
if (environment === "TEST") {
  expect(alertFailureCount).equals(failureCount);
}
console.log("All is well (maybe!)");

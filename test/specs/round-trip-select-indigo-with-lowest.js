const homePage = require("../pageobjects/home.page");
const SecurePage = require("../pageobjects/secure.page");
const flightsDisplayPage = require("../pageobjects/FlightsDisplay.page");

describe("select indigo round trip with lowest price  ", () => {

  it("select indigo round trip with lowest price", async () => {
    await homePage.open();
    await homePage.loginOrCreateAccountButton.waitForDisplayed();
    await homePage.loginOrCreateAccountButton.click();
    await homePage.roundtrip.click();
    await homePage.searchFlight("round","Banglore", "delhi");
    await flightsDisplayPage.selectFlightsAndAscendPrices("IndiGo");
    let flight_price_start = await flightsDisplayPage.firstFlightPriceRoundStart.getText();
    let flight_price_return = await flightsDisplayPage.firstFlightPriceRoundReturn.getText();
    //need to add assertions as per test case requirement
    await console.log("lowest indigo starting flight price is : ", flight_price_start);
    await console.log("lowest indigo return flight price is : ", flight_price_return);
  });
});
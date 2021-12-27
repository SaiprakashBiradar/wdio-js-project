const homePage = require("../pageobjects/home.page");
const SecurePage = require("../pageobjects/secure.page");
const flightsDisplayPage = require("../pageobjects/FlightsDisplay.page");

describe("select indigo one way trip with lowest price  ", () => {
  it("select indigo one way trip with lowest price", async () => {
    await homePage.open();
    await homePage.loginOrCreateAccountButton.waitForDisplayed();
    await homePage.loginOrCreateAccountButton.click();
    await homePage.searchFlight("oneway", "Banglore", "delhi");
    await flightsDisplayPage.selectFlightsAndAscendPrices("IndiGo");
    let flight_price =
      await flightsDisplayPage.firstFlightPriceOneWay.getText();
    //need to add assertions as per test case requirement
    await console.log("lowest indigo flight price is : ", flight_price);
  });
});

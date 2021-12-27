const Page = require("./page");
const googleLoginPage = require("./google-login.page");
const BrowserUtils = require("./../utils/browserUtils");

/**
 * sub page containing specific selectors and methods for a specific page
 */
class FlightsDisplayPage {
  /**
   * define selectors using getter methods
   */
  selectFlightVendor(flightCompany) {
    return $(`//span[@class="filterName" and @title="${flightCompany}"]/span`);
  }
  get sortingAscending() {
    return $(
      `//*[@class="pointer"]/span[text()="Price"]/following-sibling::span[@class=" appendLeft10 up sort-arrow"]`
    );
  }
  get sortingDescending() {
    return $(".appendLeft10.down.sort-arrow");
  }
  get moreFilterOption() {
    return $(`//div[@class="filtersOuter"]//p/span`);
  }
  get firstFlightPriceOneWay(){
      return $(`//div[@id='premEcon']//div[@class="priceSection"]//p`)
  }
  get firstFlightPriceRoundStart(){
    return $(`//div[@class="splitVw"]/div[1]//div[@class="listingCard "]//div[@class="makeFlex priceInfo gap-x-10 "]//p`)
}
get firstFlightPriceRoundReturn(){
    return $(`//div[@class="splitVw"]/div[2]//div[@class="listingCard "]//div[@class="makeFlex priceInfo gap-x-10 "]//p`)
}
  async selectFlightsAndAscendPrices(flightsName) {
    await this.moreFilterOption.waitForDisplayed({  timeoutMsg:"filter selection not displayed" });
    await this.moreFilterOption.click();
    await this.selectFlightVendor(flightsName).click();
    if (! await this.sortingAscending.isDisplayed()) {
      console.log("sort ascending");
      await this.sortingDescending.click();
    } else {
      console.log("already sorted ascending");
    }
    await BrowserUtils.waitUntilPageLoaded();
  }
}

module.exports = new FlightsDisplayPage();

const Page = require("./page");
const googleLoginPage = require("./google-login.page");
const BrowserUtils = require("./../utils/browserUtils")

/**
 * sub page containing specific selectors and methods for a specific page
 */
class HomePage extends Page {
  /**
   * define selectors using getter methods
   */
  get loginOrCreateAccountButton() {
    return $('//li[@data-cy="account"]');
  }
  get loginWithGoogleButton() {
    return $(`//*[@data-cy="googleLogin"]`);
  }
  
  get fromCity(){
    return $(`//label[@for="fromCity"]/span`)
  }
  get fromCityInput(){
    return $(`//input[@placeholder="From"]`)
  }
  get toCity(){
    return $(`//label[@for="toCity"]/span`)
  }
  get toCityInput(){
    return $(`//input[@placeholder="To"]`)
  }
  get firstSuggestion(){
    return $(`//li[@data-suggestion-index="0"]`)
  }
  get selectDateCurrentSelected(){
    return $(`//div[@class="DayPicker-Day DayPicker-Day--selected" ]`);
  }
  get searchButton(){
    return $(`//a[text()="Search"]`)
  }
  get roundtrip(){
    return $('//li[@data-cy="roundTrip"]')
  }
   selectCurrentDayStartDate(date){
    return $(`//div[@role="gridcell" and @aria-disabled="false"]//p[contains(text(),"${date}")]`)
  }
  get selectNextDayReturnDate(){
    return $(`//div[@role="gridcell" and @aria-selected="true"]/following-sibling::div`)
  }
  /**
   * overwrite specific options to adapt it to page object
   */
  open() {
    return super.open("login");
  }
  async loginWithGoogle(username, password) {
    await this.loginWithGoogleButton.click();
    var windowHandles = await browser.getWindowHandles();
    console.log("windowHandles : ", windowHandles);
    //switch to new window
    await browser.switchWindow("Sign in – Google accounts");
    await googleLoginPage.eneterGoogleCredentials(username, password);
  }
  async searchFlight(tripType,from, to){
    await this.fromCity.waitForDisplayed({  timeoutMsg:"failed to load from city selection" });
    await this.fromCity.waitForClickable();
    await this.fromCity.click();
    await this.fromCityInput.setValue(from);
    //press enter
    browser.keys("\uE007");
    await browser.pause(3000);
    await this.firstSuggestion.click();
    await this.toCity.click();
    await this.toCityInput.setValue(to);
    //press enter
    browser.keys("\uE007");
    await browser.pause(3000);
    await this.firstSuggestion.click();
    if(tripType=="round"){
      let date  = await new Date();
      let todayDate = await date.getDate();
      await date.setDate(todayDate + 1);
      let tomorrowDate = await date.getDate();
      console.log(" select flight starting on : "+todayDate+" and returning on : "+tomorrowDate)
       await this.selectCurrentDayStartDate(todayDate).waitForExist({  timeoutMsg:"date selection not displayed" });
      await this.selectCurrentDayStartDate(todayDate).click();
      await this.selectCurrentDayStartDate(tomorrowDate).click();
    }else{
      await this.selectDateCurrentSelected.waitForDisplayed({  timeoutMsg:"date selection not displayed" });
      await this.selectDateCurrentSelected.click();
    }
    await this.searchButton.click();
    await BrowserUtils.waitUntilPageLoaded();
  }
}

module.exports = new HomePage();

module.exports = class BrowserUtils {
  //wait for website loaded completely
  static async waitUntilPageLoaded() {
    await driver.waitUntil(
      async () => {
        return await driver.execute(() => document.readyState) == "complete";
      },
      {
        timeout: 45000,
        timeoutMsg: "wait for website to load",
        interval: 500,
      }
    );
  }
};

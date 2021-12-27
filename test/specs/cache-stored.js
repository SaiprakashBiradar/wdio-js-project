const homePage = require("../pageobjects/home.page");
const SecurePage = require("../pageobjects/secure.page");
const flightsDisplayPage = require("../pageobjects/FlightsDisplay.page");

let fs = require("fs");

describe("launch Makemy trip and console network logs", () => {
  xit("console log network Url's", async () => {
    let logs = await browser.mock("**/www.makemytrip.com/**");
    await homePage.open();
    //TODO implementation pending
    window.caches.keys().then(function (cacheNames) {
      cacheNames.forEach(function (cacheName) {
        window.caches
          .open(cacheName)
          .then(function (cache) {
            console.log("cache.keys() :", cache.keys());
            return cache.keys();
          })
          .then(function (requests) {
            requests.forEach(function (request) {
              console.log("request = ", cacheName, request);
            });
          });
      });
    });
  });
});

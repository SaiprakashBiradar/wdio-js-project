const homePage = require("../pageobjects/home.page");
const SecurePage = require("../pageobjects/secure.page");
const flightsDisplayPage = require("../pageobjects/FlightsDisplay.page");

let fs = require("fs");

describe("launch Makemy trip and console network logs", () => {
  it("console log network Url's", async () => {
    let logs = await browser.mock("**/www.makemytrip.com/**");
    await homePage.open();

    //captur network calls
    await Object.keys(logs.calls).forEach(async function (key) {
      console.log("network logs capture  : ", logs.calls[key].url);

      //write network calls to a JSON file
      // await fs.writeFile(key+".json",JSON.stringify(logs.calls[key]),function (err) {
      //     if(err) throw err;
      // })
    });

    //capture network messages
    let msgs = await browser.getLogs("browser");
    console.log("======================browser network logs : ", msgs);
  });
});



const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class GoogleLoginPage extends Page {
    /**
     * define selectors using getter methods
     */

    get googleUserName() {
        return $(`#identifierId`);
    }

    get googlePassword() {
        return $('//input[@type="password"]');
    }

    get nextButton() {
        return $('//button/span[text()="Next"]');
    }
    async eneterGoogleCredentials (username, password) {
        browser.pause(3000);
        this.googleUserName.setValue(username);
        browser.pause(3000);
        this.nextButton.click();
        browser.pause(3000);
        this.googlePassword.setValue(password);
        browser.pause(3000);
    }
}

module.exports = new GoogleLoginPage();

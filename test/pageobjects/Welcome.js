import BasePage from './BasePage.js'
import { verifyElementCopy } from '../utils/mochaw'
import { testFocusManagement, elementCanReceiveFocus } from '../utils/accessibility'
import { Key } from 'selenium-webdriver'

class Welcome extends BasePage {
  get text() { return this.$('.onfido-sdk-ui-hv-Welcome-text')}
  get footer() { return this.$('.onfido-sdk-ui-hv-Theme-footer')}
  async primaryBtn() { return this.waitAndFind('.onfido-sdk-ui-hv-Button-button')}
  get openModalButton() { return this.$('#button')}
  get closeModalButton() { return this.$('.onfido-sdk-ui-hv-Modal-closeButton')}
  get backArrow() { return this.$('.onfido-sdk-ui-hv-NavigationBar-iconBack')}

  async verifyTitle(copy) {
    const welcomeStrings = copy.welcome
    verifyElementCopy(this.title(), welcomeStrings.title)
  }

  async verifyFocusManagement() {
    testFocusManagement(this.title(), this.driver)
  }

  async verifySubtitle(copy) {
    const welcomeStrings = copy.welcome
    verifyElementCopy(this.text, welcomeStrings.description_p_1 + "\n" + welcomeStrings.description_p_2)
  }

  async verifyIdentityButton(copy) {
    const welcomeStrings = copy.welcome
    verifyElementCopy(this.primaryBtn(), welcomeStrings.next_button)
    elementCanReceiveFocus(this.primaryBtn(), this.driver)
  }

  async verifyFooter() {
    this.footer.isDisplayed()
  }

  async clickOnOpenModalButton() {
    this.openModalButton.click()
  }

  async clickOnCloseModalButton() {
    this.closeModalButton.click()
  }

  async pressEscapeButton() {
    this.title().sendKeys(Key.ESCAPE)
  }

  async checkBackArrowIsNotDisplayed() {
    try {
      this.backArrow.isDisplayed()
    } catch (e) {
      console.log("Arrow is present:", e)
      return false
    }
  }
}

export default Welcome

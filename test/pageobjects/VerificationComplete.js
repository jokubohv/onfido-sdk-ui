import BasePage from './BasePage.js'
import { verifyElementCopy } from '../utils/mochaw'

class VerificationComplete extends BasePage {
  async icon() { return this.waitAndFind('.onfido-sdk-ui-hv-Theme-icon')}
  async backArrow() { return this.waitAndFind('.onfido-sdk-ui-hv-NavigationBar-iconBack')}

  async verifyUIElements(copy) {
    const verificationCompleteStrings = copy.complete
    this.icon().isDisplayed()
    verifyElementCopy(this.title(), verificationCompleteStrings.message)
    verifyElementCopy(this.subtitle, verificationCompleteStrings.submessage)
  }

  async checkBackArrowIsNotDisplayed() {
    try {
      this.backArrow().isDisplayed()
    } catch (e) {
      console.log("Arrow is present:", e)
      return false
    }
  }
}

export default VerificationComplete

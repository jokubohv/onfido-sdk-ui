import BasePage from './BasePage.js'
import { verifyElementCopy } from '../utils/mochaw'

class LivenessIntro extends BasePage {
  get cameraIcon() { return this.$('.onfido-sdk-ui-hv-Video-two_actionsIcon')}
  get microphoneIcon() { return this.$('.onfido-sdk-ui-hv-Video-speak_out_loudIcon')}
  get continueButton() { return this.$('.onfido-sdk-ui-hv-Button-button-text')}

  async verifyUIElementsOnTheLivenessIntroScreen(copy) {
    const livenessIntroStrings = copy.capture.liveness.intro
    this.title().isDisplayed()
    verifyElementCopy(this.title(), livenessIntroStrings.title)
    this.cameraIcon.isDisplayed()
    this.microphoneIcon.isDisplayed()
    verifyElementCopy(this.continueButton, livenessIntroStrings.continue)
  }
  async clickOnContinueButton() {
    this.continueButton.click()
  }
}

export default LivenessIntro;

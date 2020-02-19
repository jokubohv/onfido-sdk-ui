import BasePage from './BasePage.js'

class Camera extends BasePage {
  async continueButton () { return this.waitAndFind('.onfido-sdk-ui-hv-Button-button-primary')}
  async shutterButton() { return this.waitAndFind('.onfido-sdk-ui-hv-Photo-btn')}
  async recordButton() { return this.waitAndFind('.onfido-sdk-ui-hv-Video-startRecording')}
  async stopButton() { return this.waitAndFind('.onfido-sdk-ui-hv-Video-stopRecording') }
  async warningMessage() { return this.waitAndFind('.onfido-sdk-ui-hv-Error-container-warning') }
  get faceOverlay() { return this.$('[data-onfido-qa="faceOverlay"]') }

  async takeSelfie() {
    const btn = this.shutterButton()
    // give some time for the stream to have a face
    this.driver.sleep(1000)
    this.clickWhenClickable(btn)
  }

  async isOverlayPresent() {
    const cameraClasses = this.faceOverlay.getAttribute("class").split(" ")
    return cameraClasses.includes('onfido-sdk-ui-hv-Overlay-isWithoutHole')
  }

  async recordVideo() {
    this.clickWhenClickable(this.continueButton())
    this.clickWhenClickable(this.recordButton())
  }

  async completeChallenges() {
    this.clickWhenClickable(this.continueButton())
    this.clickWhenClickable(this.stopButton())
  }
}

export default Camera

import BasePage from './BasePage.js'
import { verifyElementCopy } from '../utils/mochaw'

class Confirm extends BasePage {
  get message() { return this.$('.onfido-sdk-ui-hv-Confirm-message')}
  get redoBtn() { return this.$('.onfido-sdk-ui-hv-Confirm-btn-secondary')}
  async confirmBtn() { return this.waitAndFind('.onfido-sdk-ui-hv-Confirm-btn-primary')}
  get uploaderError() { return this.$('.onfido-sdk-ui-hv-Uploader-error')}
  get errorTitleText() { return this.$('.onfido-sdk-ui-hv-Error-title-text')}
  get errorTitleIcon() { return this.$('.onfido-sdk-ui-hv-Error-title-icon-error')}
  get warningTitleIcon() { return this.$('.onfido-sdk-ui-hv-Error-title-icon-warning')}
  get errorInstruction() { return this.$('.onfido-sdk-ui-hv-Error-instruction-text')}
  get uploadedVideo() { return this.$('.onfido-sdk-ui-hv-Confirm-CaptureViewer-video')}

  async verifyCheckReadabilityMessage(copy) {
    const confirmStrings = copy.confirm
    verifyElementCopy(this.title(), confirmStrings.document.title)
  }

  async verifyMakeSurePassportMessage(copy) {
    const confirmStrings = copy.confirm
    verifyElementCopy(this.message, confirmStrings.passport.message)
  }

  async verifyMakeSureDrivingLicenceMessage(copy) {
    const confirmStrings = copy.confirm
    verifyElementCopy(this.message, confirmStrings.driving_licence.message)
  }

  async verifyMakeSureIdentityCardMessage(copy) {
    const confirmStrings = copy.confirm
    verifyElementCopy(this.message, confirmStrings.national_identity_card.message)
  }

  async verifyNoDocumentError(copy) {
    const confirmErrorStrings = copy.errors
    verifyElementCopy(this.errorTitleText, confirmErrorStrings.invalid_capture.message)
    this.errorTitleIcon.isDisplayed()
    verifyElementCopy(this.errorInstruction, confirmErrorStrings.invalid_capture.instruction)
  }

  async verifyFileSizeTooLargeError(copy) {
    const documentUploadConfirmationErrorStrings = copy.errors
    verifyElementCopy(this.uploaderError, `${documentUploadConfirmationErrorStrings.invalid_size.message} ${documentUploadConfirmationErrorStrings.invalid_size.instruction}`)
  }

  async verifyUseAnotherFileError(copy) {
    const documentUploadConfirmationErrorStrings = copy.errors
    verifyElementCopy(this.uploaderError, `${documentUploadConfirmationErrorStrings.invalid_type.message} ${documentUploadConfirmationErrorStrings.invalid_type.instruction}`)
  }

  async verifyUnsuppoertedFileError(copy) {
    const confirmErrorStrings = copy.errors
    verifyElementCopy(this.errorTitleText, confirmErrorStrings.unsupported_file.message)
    this.errorTitleIcon.isDisplayed()
    verifyElementCopy(this.errorInstruction, confirmErrorStrings.unsupported_file.instruction)
  }

  async verifyNoFaceError(copy) {
    const confirmErrorStrings = copy.errors
    verifyElementCopy(this.errorTitleText, confirmErrorStrings.no_face.message)
    this.errorTitleIcon.isDisplayed()
    verifyElementCopy(this.errorInstruction, confirmErrorStrings.no_face.instruction)
  }

  async verifyMultipleFacesError(copy) {
    const confirmErrorStrings = copy.errors
    verifyElementCopy(this.errorTitleText, confirmErrorStrings.multiple_faces.message)
    this.errorTitleIcon.isDisplayed()
    verifyElementCopy(this.errorInstruction, confirmErrorStrings.multiple_faces.instruction)
  }

  async verifyGlareDetectedWarning(copy) {
    const confirmErrorStrings = copy.errors
    verifyElementCopy(this.errorTitleText, confirmErrorStrings.glare_detected.message)
    this.warningTitleIcon.isDisplayed()
    verifyElementCopy(this.errorInstruction, confirmErrorStrings.glare_detected.instruction)
  }

  async playVideoBeforeConfirm() {
    this.uploadedVideo.isDisplayed()
    this.driver.executeScript("arguments[0].play();", this.uploadedVideo)
  }
}

export default Confirm

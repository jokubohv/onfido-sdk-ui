import BasePage from './BasePage.js'
import { verifyElementCopy } from '../utils/mochaw'

class CrossDeviceClientSuccess extends BasePage {
  get icon() { return this.$('.onfido-sdk-ui-hv-Theme-icon')}
  get fewSecondsToUpdateMessage() { return this.$('.onfido-sdk-ui-hv-crossDevice-ClientSuccess-text')}

  async verifyUIElements(copy) {
    const crossDeviceClientSuccessStrings = copy.cross_device.client_success
    verifyElementCopy(this.title(), crossDeviceClientSuccessStrings.title)
    verifyElementCopy(this.subtitle, crossDeviceClientSuccessStrings.sub_title)
    this.icon.isDisplayed()
    verifyElementCopy(this.fewSecondsToUpdateMessage, crossDeviceClientSuccessStrings.body)
  }
}

export default CrossDeviceClientSuccess;

import BasePage from './BasePage.js'
import { verifyElementCopy } from '../utils/mochaw'
import { asyncForEach } from '../utils/async'

class CrossDeviceMobileConnected extends BasePage {
  get icon() { return this.$('.onfido-sdk-ui-hv-Theme-icon')}
  async tipsHeader() { return this.waitAndFind('.onfido-sdk-ui-hv-Theme-header')}
  get tips() { return this.$('.onfido-sdk-ui-hv-Theme-helpList li')}
  get cancel() { return this.$('.onfido-sdk-ui-hv-crossDevice-MobileConnected-cancel')}

  async verifyUIElements(copy) {
    const crossDeviceMobileConnectedStrings = copy.cross_device
    const connectedToMobileScreenCancelString = copy.cancel
    const elements = [this.tips]
    verifyElementCopy(this.title(), crossDeviceMobileConnectedStrings.mobile_connected.title.message)
    verifyElementCopy(this.subtitle, crossDeviceMobileConnectedStrings.mobile_connected.title.submessage)
    this.icon.isDisplayed()
    verifyElementCopy(this.tipsHeader(), crossDeviceMobileConnectedStrings.tips)
    asyncForEach(elements, async (item, index) => {
      const mobileNotificationSentStrings = copy.cross_device
      verifyElementCopy(
        item,
        mobileNotificationSentStrings.mobile_connected.tips[`item_${index + 1}`])
    })
    verifyElementCopy(this.cancel, connectedToMobileScreenCancelString)
  }
}

export default CrossDeviceMobileConnected;

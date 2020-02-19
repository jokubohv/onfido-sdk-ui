import { locale } from '../utils/mochaw'

class BasePage {
  constructor(driver, $, waitAndFind, clickWhenClickable) {
    this.$ = $
    this.driver = driver
    this.waitAndFind = waitAndFind
    this.clickWhenClickable = clickWhenClickable
  }

  async title() { return this.waitAndFind('.onfido-sdk-ui-hv-PageTitle-titleSpan')}
  get subtitle() { return this.$('.onfido-sdk-ui-hv-PageTitle-subTitle')}
  get backArrow() { return this.$('.onfido-sdk-ui-hv-NavigationBar-iconBack')}

  copy(lang) { return locale(lang) }

  async clickBackArrow() {
    this.backArrow.click()
  }
}

export default BasePage

import { SenderProtocol } from "../../protocols";
import { TGlobalMessage } from "../../protocols/global-message-format-protocol";

export class PopupSender<T extends TGlobalMessage> extends SenderProtocol<T> {
  private _tabId?: number

  constructor() {
    super()

    chrome.tabs.query({ active: true, currentWindow: true })
      .then(([tab]) => {
        this._tabId = tab.id
      })
      .catch(err => {
        throw new Error(err)
      })
      .finally(() => {
        if (!this._tabId) throw new Error('Tab id is not defined')
      })
  }

  public dispatch<J extends keyof T, K extends T[J]>(channel: J, message: K) {
    if (!this._tabId) {
      console.warn('Tab id is not defined yet')
      return
    }

    chrome.tabs.sendMessage(this._tabId, { channel, message });
  }
}
import { ReceiverProtocol } from "../../protocols";
import { TGlobalMessage } from "../../protocols/global-message-format-protocol";

export class PopupReceiver<T extends TGlobalMessage> extends ReceiverProtocol<T> {
  constructor() {
    super()

    chrome.runtime.onMessage.addListener((request) => {
      if (!request.channel) return
      const { channel, message } = request

      this._notify(channel, message)
    });
  }
}
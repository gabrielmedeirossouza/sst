import { ReceiverProtocol } from "../../protocols";

export class PopupReceiver<T> extends ReceiverProtocol<T> {
  constructor() {
    super()

    chrome.runtime.onMessage.addListener((request) => {
      if (!request.channel) return
      const { channel, message } = request as { channel: string, message: T }

      this._notify(channel, message)
    });
  }
}
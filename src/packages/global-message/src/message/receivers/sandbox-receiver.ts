import { ReceiverProtocol } from "../../protocols";
import { TGlobalMessage } from "../../protocols/global-message-format-protocol";

export class SandboxReceiver<T extends TGlobalMessage> extends ReceiverProtocol<T> {
  constructor() {
    super()

    window.addEventListener("message", this._subscribeMessageListeners.bind(this))
  }

  private _subscribeMessageListeners(event: MessageEvent) {
    if (!event.data.channel) return
    const { channel, message } = event.data

    this._notify(channel, message)
  }
}
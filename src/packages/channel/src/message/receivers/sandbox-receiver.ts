import { ReceiverProtocol } from "../../protocols";

export class SandboxReceiver<T> extends ReceiverProtocol<T> {
  constructor() {
    super()

    document.addEventListener("DOMContentLoaded", () => {
      window.addEventListener("message", this._subscribeMessageListeners.bind(this))

      const iframes = document.querySelectorAll("iframe")
      iframes.forEach(iframe => {
        iframe.contentWindow?.addEventListener("message", this._subscribeMessageListeners.bind(this))
      })
    })
  }

  private _subscribeMessageListeners(event: MessageEvent) {
    if (!event.data.channel) return
    const { channel, message } = event.data as { channel: string, message: T }

    this._notify(channel, message)
  }
}
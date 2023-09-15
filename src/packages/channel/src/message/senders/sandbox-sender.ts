import { SenderProtocol } from "../../protocols";

export class SandboxSender<T> extends SenderProtocol<T> {
  private _iframes: HTMLIFrameElement[] = []

  constructor() {
    super()

    document.addEventListener("DOMContentLoaded", () => {
      const iframes = document.querySelectorAll("iframe")

      iframes.forEach(iframe => {
        this._iframes.push(iframe as HTMLIFrameElement)
      })
    })
  }

  public dispatch(channel: string, message: T) {
    window.postMessage({ channel, message }, "*")

    this._iframes.forEach(iframe => {
      iframe.contentWindow?.postMessage({ channel, message }, "*")
    })
  }
}
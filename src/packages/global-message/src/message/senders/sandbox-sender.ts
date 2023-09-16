import { SenderProtocol } from "../../protocols";
import { TGlobalMessage } from "../../protocols/global-message-format-protocol";

export class SandboxSender<T extends TGlobalMessage> extends SenderProtocol<T> {
  public dispatch<J extends keyof T, K extends T[J]>(channel: J, message: K) {
    window.postMessage({ channel, message }, "*")

    if (window.parent && window.parent !== window)
      window.parent.postMessage({ channel, message }, "*")
  }
}
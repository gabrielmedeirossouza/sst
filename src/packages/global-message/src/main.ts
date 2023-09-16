import { PopupReceiver, SandboxReceiver } from './message/receivers'
import { PopupSender, SandboxSender } from './message/senders'
import { TGlobalMessage } from './protocols/global-message-format-protocol'
import { Message } from './message'

const mode = import.meta.env.MODE
if (mode !== "development" && mode !== "production")
  throw new Error("Invalid mode for message package, please use 'development' or 'production'")

export class GlobalMessage<T extends TGlobalMessage> extends Message<T> {
  constructor() {
    const receiver = mode === "development" ? new SandboxReceiver<T>() : new PopupReceiver<T>()
    const sender = mode === "development" ? new SandboxSender<T>() : new PopupSender<T>()

    super(receiver, sender)
  }
}

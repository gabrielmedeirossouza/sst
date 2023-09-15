import { PopupReceiver, SandboxReceiver } from './message/receivers'
import { PopupSender, SandboxSender } from './message/senders'
import { Message } from './message'

const mode = import.meta.env.MODE
if (mode !== "development" && mode !== "production")
  throw new Error("Invalid mode for channel package, please use 'development' or 'production'")

export class Channel<T> extends Message<T> {
  constructor(type: string) {
    const receiver = mode === "development" ? new SandboxReceiver<T>() : new PopupReceiver<T>()
    const sender = mode === "development" ? new SandboxSender<T>() : new PopupSender<T>()

    super(type, receiver, sender)
  }
}
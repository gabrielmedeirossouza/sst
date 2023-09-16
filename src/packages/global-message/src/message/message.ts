import { ReceiverProtocol, SenderProtocol } from "../protocols";
import { TGlobalMessage } from "../protocols/global-message-format-protocol";

export class Message<T extends TGlobalMessage> {
  constructor(
    private readonly _receiver: ReceiverProtocol<T>,
    private readonly _sender: SenderProtocol<T>
  ) {}

  public send<J extends keyof T, K extends T[J]>(channel: J, ...message: (K extends void ? [] : [K])) {
    this._sender.dispatch(channel, message[0])
  }

  public on<J extends keyof T, K extends T[J]>(channel: J, callback: (message: K) => void) {
    this._receiver.on(channel, callback)
  }

  public off<J extends keyof T, K extends T[J]>(channel: J, callback: (message: K) => void) {
    this._receiver.off(channel, callback)
  }
}
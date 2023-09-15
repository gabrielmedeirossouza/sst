import { ReceiverProtocol, SenderProtocol } from "../protocols";

export class Message<T> {
  constructor(
    public readonly type: string,
    private readonly _receiver: ReceiverProtocol<T>,
    private readonly _sender: SenderProtocol<T>
  ) {}

  public send(channel: string, message: T) {
    this._sender.dispatch(channel, message)
  }

  public on(callback: (channel: string, message: T) => void) {
    this._receiver.on(callback)
  }

  public off(callback: (channel: string, message: T) => void) {
    this._receiver.off(callback)
  }
}
export abstract class SenderProtocol<M> {
  abstract dispatch(channel: string, message: M): void
}
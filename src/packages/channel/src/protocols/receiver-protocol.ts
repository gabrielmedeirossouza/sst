export abstract class ReceiverProtocol<M> {
  private _callbacks: ((channel: string, message: M) => void)[] = []

  protected _notify(channel: string, message: M) {
    this._callbacks.forEach(callback => {
      callback(channel, message)
    })
  }

  public on(callback: (channel: string, message: M) => void) {
    this._callbacks.push(callback)
  }

  public off(callback: (channel: string, message: M) => void) {
    this._callbacks = this._callbacks.filter(cb => cb !== callback)
  }
}
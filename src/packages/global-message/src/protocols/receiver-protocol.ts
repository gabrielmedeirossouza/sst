import { TGlobalMessage } from "./global-message-format-protocol"

export abstract class ReceiverProtocol<T extends TGlobalMessage> {
  private _callbackMap: Map<keyof T, Array<(message: any) => void>> = new Map()

  protected _notify<J extends keyof T, K extends T[J]>(channel: J, message: K) {
    const callbacks = this._callbackMap.get(channel)
    if (!callbacks) return

    callbacks.forEach(callback => {
      callback(message)
    })
  }

  public on<J extends keyof T, K extends T[J]>(channel: J, callback: (message: K) => void) {
    const callbacks = [...this._callbackMap.get(channel) || [], callback]

    this._callbackMap.set(channel, callbacks)
  }

  public off<J extends keyof T, K extends T[J]>(channel: J, callback: (message: K) => void) {
    const callbacks = this._callbackMap.get(channel)
    if (!callbacks) return

    const filteredCallbacks = callbacks.filter(cb => cb !== callback)

    this._callbackMap.set(channel, filteredCallbacks)
  }
}
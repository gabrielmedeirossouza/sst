import { TGlobalMessage } from "./global-message-format-protocol";

export abstract class SenderProtocol<T extends TGlobalMessage> {
  abstract dispatch<J extends keyof T, K extends T[J]>(channel: J, message: K): void
}
import { Page } from '../../components/global'
import { GlobalMessage } from '@sst/global-message'
import { GlobalMessageProtocol } from '@sst/global-message-protocol'

const globalMessage = new GlobalMessage<GlobalMessageProtocol>()

export function Main() {
  return (
    <Page>
      Hello World!
      1 + 1 = 2
      <button type="button" onClick={() => {
        globalMessage.send("select-stream", "AMAZON_PRIME")
        globalMessage.send("script-loaded")
      }}>send message</button>
    </Page>
  )
}
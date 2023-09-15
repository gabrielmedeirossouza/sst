import { Page } from '../../components/global'
import { Channel } from '@sst/channel'

const channel = new Channel<string>('sst')

export function Main() {
  return (
    <Page>
      Hello World!
      1 + 1 = 2
      <button type="button" onClick={() => {
        channel.send("sst", 'hello world')
      }}>send message</button>
    </Page>
  )
}
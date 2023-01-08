import { send, startListener } from './telegram'
import { crawl } from './crawler'

startListener()

function task () {
  crawl().then(async ({ timestamp, filePath }) => {
    await send(timestamp, filePath)
    console.log('Sent!', { timestamp, filePath })
  })
}

setInterval(task, 1000 * 60 * 20)
task()

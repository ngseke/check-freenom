import { send, startListener } from './modules/telegram'
import { crawl } from './modules/crawler'

startListener()

function task () {
  crawl().then(async ({ timestamp, filePath }) => {
    await send(timestamp, filePath)
    console.log('Sent!', { timestamp, filePath })
  })
}

setInterval(task, 1000 * 60 * 60)
task()

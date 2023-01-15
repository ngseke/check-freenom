import TelegramBot from 'node-telegram-bot-api'
import * as dotenv from 'dotenv'

dotenv.config()

const token = process.env.TELEGRAM_BOT_TOKEN ?? ''
const receivers =
  process.env.TELEGRAM_BOT_RECEIVERS?.split(',') ?? []

const bot = new TelegramBot(token, { polling: true })

export async function send (caption: string, path: string) {
  return await Promise.all(
    receivers.map(async chatId => {
      await bot.sendPhoto(
        chatId,
        path,
        { caption },
        { filename: `${caption}.png` }
      )
    })
  )
}

export function startListener () {
  bot.on('message', (message) => {
    const chatId = message.chat.id
    bot.sendMessage(chatId, `Your chatId is ${chatId}`)
  })
}

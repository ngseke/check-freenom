import TelegramBot from 'node-telegram-bot-api'
import { TELEGRAM_BOT_RECEIVERS, TELEGRAM_BOT_TOKEN } from './constants'

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true })

export async function send (caption: string, path: string) {
  return await Promise.all(
    TELEGRAM_BOT_RECEIVERS.map(async chatId => {
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

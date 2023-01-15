import * as dotenv from 'dotenv'
dotenv.config()

export const DOMAIN = process.env.DOMAIN ?? ''
export const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN ?? ''
export const TELEGRAM_BOT_RECEIVERS =
  process.env.TELEGRAM_BOT_RECEIVERS?.split(',') ?? []

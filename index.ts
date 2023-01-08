import puppeteer from 'puppeteer'
import dayjs from 'dayjs'
import * as fs from 'fs/promises'
import path from 'path'

import * as dotenv from 'dotenv'
dotenv.config()

async function sleep (ms = 3000) {
  return await new Promise((resolve) => setTimeout(resolve, ms))
}

async function queryAndScreenshot () {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.setViewport({ width: 1000, height: 1000 })

  await page.goto('https://www.freenom.com/en/index.html')
  const input = await page.waitForSelector('#idn')

  const domain = process.env.DOMAIN ?? ''
  await input?.type(domain)

  const submitButton = await page.waitForSelector('#submitBtn')
  await submitButton?.click()

  await page.waitForSelector('.allResults.active .domainRegister')
  await sleep()
  const pathName = './screenshots'

  await fs.mkdir(pathName, { recursive: true })

  const now = dayjs().format('YYYYMMDDHHmmss')
  const fileName = `${now}.png`

  await page.screenshot({
    path: path.resolve(pathName, fileName),
    fullPage: true,
  })

  await browser.close()
}

queryAndScreenshot().catch(console.error)

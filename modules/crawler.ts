import puppeteer from 'puppeteer'
import dayjs from 'dayjs'
import * as fs from 'fs/promises'
import path from 'path'
import { DOMAIN } from './constants'

export async function sleep (ms = 3000) {
  return await new Promise((resolve) => setTimeout(resolve, ms))
}

export async function crawl () {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 1000 })

  await page.goto('https://www.freenom.com/en/index.html')
  const input = await page.waitForSelector('#idn')

  await input?.type(DOMAIN)

  const submitButton = await page.waitForSelector('#submitBtn')
  await submitButton?.click()

  await page.waitForSelector('.allResults.active .domainRegister')
  await sleep()
  const pathName = './screenshots'

  await fs.mkdir(pathName, { recursive: true })

  const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss')
  const fileName = `${timestamp}.png`

  const filePath = path.resolve(pathName, fileName)

  await page.screenshot({
    path: filePath,
    fullPage: true,
  })

  await browser.close()

  return {
    timestamp,
    fileName,
    filePath,
  }
}

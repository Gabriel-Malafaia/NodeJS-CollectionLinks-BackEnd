import chromium from "chrome-aws-lambda";
import { Request, Response } from "express";
import puppeteer from "puppeteer";

const testRoute = async (req: Request, res: Response) => {
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    ignoreHTTPSErrors: true,
  });

  const page = await browser.newPage();
  await page.goto("https://blog.betrybe.com/");

  const pageData = await page.evaluate(() => {
    const nodeList = document.querySelector("h2");
    const dataArray = [nodeList];
    const result = dataArray.map((elem) => {
      const name = elem.textContent;
      const url = (elem.firstChild as HTMLAnchorElement).href;

      return { name, url };
    });

    return result;
  });

  return res.status(200).json(pageData);
};

export default testRoute;

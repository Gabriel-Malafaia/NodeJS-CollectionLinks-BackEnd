import puppeteer from "puppeteer";
const webScraping = async (url: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  try {
    const pageData = await page.evaluate(() => {
      const nodeList = document.querySelectorAll(
        "h1, h2, h3, [class*='title'], p"
      );
      const dataArray = [...nodeList];

      let count = 0;

      const result = dataArray.filter((elem) => {
        if (count >= 3) {
          return false;
        }

        const title = elem.textContent;
        const url = (elem.firstChild as HTMLAnchorElement).href;

        if (title && url) {
          count++;
          return true;
        }
      });

      return result.map((elem) => {
        const name = elem.textContent;
        const url = (elem.firstChild as HTMLAnchorElement).href;

        return { name, url };
      });
    });

    return pageData;
  } catch (err) {}
};

export default webScraping;

const puppeteer = require('puppeteer');

describe('gapminder page', () => {
  beforeAll(async () => {
    let browser = await puppeteer.launch();
    let page = await browser.newPage();
    await page.goto('http://127.0.0.1:4444/');
  });
  // afterAll(async () => {
  //   await browser.close();
  // });
  it('should disaply some text', async () => {
    await expect(page).toMatch('gapminder');
  });
});


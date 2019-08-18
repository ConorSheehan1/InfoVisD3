const puppeteer = require('puppeteer');

describe('gapminder page', () => {
  beforeAll(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  });

  beforeEach(async () => {
    await page.goto('http://localhost:4444/');
  });

  describe('navbar', () => {
    ['Gapminder', 'World map', 'About'].forEach((text) => {
      it(`should link to the gapminder ${text}`, async () => {
        await expect(page).toMatchElement('nav a', {text});
      });
    });
  });
});


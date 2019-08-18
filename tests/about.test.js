const puppeteer = require('puppeteer');

describe('about page', () => {
  beforeAll(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  });

  beforeEach(async () => {
    await page.goto('http://localhost:4444/about', { waitUntil: 'networkidle0' });
  });

  describe('navbar', () => {
    ['Gapminder', 'World map', 'About'].forEach((text) => {
      it(`should link to the gapminder ${text}`, async () => {
        await expect(page).toMatchElement('nav a', {text});
        // let el = page.$x(`//nav/a[text()="${text}"]`);
        // expect(el.href).to.eq(link);
      });
    });
  });

  describe('text content', () => {
    it('should have text in the center of the page', async () => {
      let paragraphs = await page.$$('body div.center p');
      expect(paragraphs.length).toEqual(4);
    });
  });
});


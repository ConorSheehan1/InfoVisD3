const puppeteer = require('puppeteer');

describe('about page', () => {
  beforeAll(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // await page.goto('https://www.chromestatus.com', { waitUntil: 'networkidle0' });
    // // await page.goto('http://localhost:4444/about');
    // await page.waitFor(4000);
  });
  // afterAll(async () => {
  //   await browser.close();
  //   done();
  // });
  it('should disaply some text', async () => {
    await page.goto('http://localhost:4444/about', { waitUntil: 'networkidle0' });
    // Fails waiting for function failed: timeout 500ms exceeded
    // https://stackoverflow.com/questions/53187941/why-is-puppeteer-failing-simple-tests-with-waiting-for-function-failed-timeou
    // await expect(page).toMatch('about');

    // await expect(page).toMatchElement('//nav/a[text()="About"]');
    await expect(page).toMatchElement('nav a', {text: 'About'});
  });
});


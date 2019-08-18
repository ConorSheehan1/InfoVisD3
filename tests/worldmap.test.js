describe('world map page', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:4444/worldmap', { waitUntil: 'networkidle0' });
  });

  describe('navbar', () => {
    ['Gapminder', 'World map', 'About'].forEach((text) => {
      it(`should link to the gapminder ${text}`, async () => {
        await expect(page).toMatchElement('nav a', {text});
      });
    });
  });

  describe('barchart', () => {
    it('should have avg gdp on the x axis', async () => {
      // //div[@id='barchart']/*[local-name() = 'svg']/*[local-name() = 'g']/*[local-name() = 'text'][text()='Average GDP']
      let barchartSvg = await page.$('div#barchart svg');
      let textElements = await barchartSvg.$x('//*[local-name()="text"][text()="Average GDP"]');
      expect(textElements.length).toEqual(1);
      // TODO: better way to test xpath is on page, like expect(page).toMatchElement
      // https://github.com/GoogleChrome/puppeteer/issues/1341#issuecomment-343389141
      // const label = await (await textElements[0].getProperty('innerText')).jsonValue();
      // const label = await page.evaluate(el => el.innerText, textElements[0]);
      // expect(label).toEqual('Average GDP');
    });
    it('should have government type on the y axis', async () => {
      // //div[@id='barchart']/*[local-name() = 'svg']/*[local-name() = 'g']/*[local-name() = 'text'][text()='Average GDP']
      let barchartSvg = await page.$('div#barchart svg');
      let textElements = await barchartSvg.$x('//*[local-name() = "text"][text()="Government type"]');
      expect(textElements.length).toEqual(1);
      // TODO: assert transform=rotate(-90)
    });
    ['republic', 'monarchy', 'autonomous_region_of_Denmark', 'federation'].forEach((governmentType) => {
      it (`should have a bar for ${governmentType}`, async () => {
        let bars = await page.$x(`//*[local-name()='rect'][@gov='${governmentType}']`);
        expect(bars.length).toEqual(1);
      });
    });
  });
});


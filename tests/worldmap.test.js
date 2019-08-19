describe('world map page', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:4444/worldmap', { waitUntil: 'networkidle0' });
  });

  describe('navbar', () => {
    ['Gapminder', 'World map', 'About'].forEach((text) => {
      it(`should link to the gapminder ${text}`, async () => {
        return await expect(page).toMatchElement('nav a', {text});
      });
    });
  });

  describe('barchart', () => {
    it('should have avg gdp on the x axis', async () => {
      // //div[@id='barchart']/*[local-name() = 'svg']/*[local-name() = 'g']/*[local-name() = 'text'][text()='Average GDP']
      let barchartSvg = await page.$('div#barchart svg');
      let textElements = await barchartSvg.$x('//*[local-name()="text"][text()="Average GDP"]');
      return expect(textElements.length).toEqual(1);
      // TODO: better way to test xpath is on page, like expect(page).toMatchElement
    });
    it('should have government type on the y axis', async () => {
      let barchartSvg = await page.$('div#barchart svg');
      let textElements = await barchartSvg.$x('//*[local-name() = "text"][text()="Government type"]');
      return expect(textElements.length).toEqual(1);
      // TODO: assert transform=rotate(-90)
    });
    ['republic', 'monarchy', 'autonomous_region_of_Denmark', 'federation'].forEach((governmentType) => {
      it (`should have a bar for ${governmentType}`, async () => {
        let bars = await page.$x(`//*[local-name()='rect'][@gov='${governmentType}']`);
        return expect(bars.length).toEqual(1);
      });
    });
  });

  describe('world map', () => {
    it('should show the year', async () => {
      // let mapSvg = await page.$('div#map-container svg');
      return expect(page).toMatchElement('div#map-container svg text#year', {text: '1900'});
    });
  });

  describe('user controls', () => {
    it('should have a button to start the animation', async () => {
      return expect(page).toMatchElement('div.controls input[value=play]');
    });
    it('should have a slider to control the year', async () => {
      return expect(page).toMatchElement('div.controls input[type=range]');
    });
    it('should have a button to toggle the data grouping', async () => {
      return expect(page).toMatchElement('div.controls input[value="change data"]');
    });
  });
});


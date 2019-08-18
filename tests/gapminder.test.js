describe('gapminder page', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:4444/', { waitUntil: 'networkidle0' });
  });

  describe('navbar', () => {
    ['Gapminder', 'World map', 'About'].forEach((text) => {
      it(`should link to the gapminder ${text}`, async () => {
        return await expect(page).toMatchElement('nav a', {text});
      });
    });
  });

  describe('legend', () => {
    it('should contain a legend for 8 regions', async () => {
      const regionElements = await page.$$('div.legend text');
      expect(regionElements.length).toEqual(8);
      const regionLabels = await Promise.all(regionElements.map(async (regionElement) => {
        return await page.evaluate(el => el.innerHTML, regionElement);
      }));
      return expect(regionLabels).toEqual([" Asia", " Europe", " Africa", " North America", " South America", " Australia", " Central America", " Oceania"]);
    });
  });

  describe('user controls', () => {
    it('should have a button to start the animation', async () => {
      return expect(page).toMatchElement('div.vis input[value=play]');
    });
    it('should have a slider to control the year', async () => {
      return expect(page).toMatchElement('div.vis input[type=range]');
    });
    it('should have a button to toggle the legend', async () => {
      return expect(page).toMatchElement('div.vis input[value="hide controls"]');
    });
  });

  describe('bubble chart', () => {
    it.todo('should have $GDP per capita on the x axis');
    it.todo('should have life expectancy (years) on the y axis');
  });
});


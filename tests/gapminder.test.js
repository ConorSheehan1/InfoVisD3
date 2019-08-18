describe('gapminder page', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:4444/', { waitUntil: 'networkidle0' });
  });

  describe('navbar', () => {
    ['Gapminder', 'World map', 'About'].forEach((text) => {
      it(`should link to the gapminder ${text}`, async () => {
        await expect(page).toMatchElement('nav a', {text});
      });
    });
  });
});


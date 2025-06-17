describe('Amzon website', () => {
  it('should contain the word Amazon', () => {
    cy.visit('https://www.amazon.fr/ref=nav_logo');
    cy.contains('Amazon');
  });
});

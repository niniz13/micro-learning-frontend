describe('Test creating module', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/token').as('login');
    cy.visit('localhost:3000/login');
    cy.get('[data-cy="login-email"]').type('admin@example.com');
    cy.get('[data-cy="login-password"]').type('admin');
    cy.get('[data-cy="login-btn"]').click();
    cy.wait('@login');
  });

  it('should work well !', () => {
    cy.visit('localhost:3000/profile');
    cy.get('[data-cy="manage-modules"]').click();
    cy.get('[data-cy="create-module"]').click();
    cy.get('[data-cy="module-title"]').clear().type('Nouveau Module');
    cy.get('[data-cy="module-description"]')
      .clear()
      .type(
        'Ceci est un module pour apprendre à ne pas oublier de remodifier son mot de passe dans son test e2e si on veut que les tests suivants fonctionnent'
      );
    cy.get('[data-cy="edit-create-module"]').click();
    cy.url().should('include', '/admin/modules');
    cy.contains('Nouveau Module');
    cy.contains(
      'Ceci est un module pour apprendre à ne pas oublier de remodifier son mot de passe dans son test e2e si on veut que les tests suivants fonctionnent'
    );
  });

  it('should create a module with the category Art', () => {
    cy.visit('localhost:3000/profile');
    cy.get('[data-cy="manage-modules"]').click();
    cy.get('[data-cy="create-module"]').click();
    cy.get('[data-cy="module-title"]').clear().type('Nouveau Module');
    cy.get('[data-cy="module-description"]').clear().type('Description');
    cy.get('[data-cy="select-category"]').select('Art');
    cy.get('[data-cy="edit-create-module"]').click();
    cy.url().should('include', '/admin/modules');
    cy.contains('Nouveau Module');
  });

  it('should not create module without title or description', () => {
    cy.visit('localhost:3000/profile');
    cy.get('[data-cy="manage-modules"]').click();
    cy.get('[data-cy="create-module"]').click();
    cy.get('[data-cy="edit-create-module"]').click();
    cy.url().should('include', '/admin/modules/create');
  });
});

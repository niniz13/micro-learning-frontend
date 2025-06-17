describe('Test login and updating account email', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/token').as('login');
    cy.visit('localhost:3000/login');
    cy.get('[data-cy="login-email"]').type('admin@example.com');
    cy.get('[data-cy="login-password"]').type('admin');
    cy.get('[data-cy="login-btn"]').click();
    cy.wait('@login');
  });

  it('should update the account email', () => {
    cy.visit('localhost:3000/profile');
    cy.contains('Profile');
    cy.contains('admin@example.com');
    cy.get('[data-cy="edit-profile"]').click();
    cy.get('[data-cy="edit-first-name"]').clear().type('Admin');
    cy.get('[data-cy="edit-last-name"]').clear().type('user');
    cy.get('[data-cy="edit-email"]').clear().type('newemail@example.com');
    cy.get('[data-cy="save-edit-btn"]').click();
    cy.url().should('include', '/profile');
    cy.contains('newemail@example.com');
    cy.get('[data-cy="edit-profile"]').click();
    cy.get('[data-cy="edit-email"]').clear().type('admin@example.com');
    cy.get('[data-cy="save-edit-btn"]').click();
  });

  it('should show an error for using a email already in the database', () => {
    cy.visit('localhost:3000/profile');
    cy.contains('Profile');
    cy.contains('admin@example.com');
    cy.get('[data-cy="edit-profile"]').click();
    cy.get('[data-cy="edit-first-name"]').clear().type('Admin');
    cy.get('[data-cy="edit-last-name"]').clear().type('user');
    cy.get('[data-cy="edit-email"]').clear().type('user@example.com');
    cy.get('[data-cy="save-edit-btn"]').click();
    cy.url().should('include', '/profile/edit');
    cy.contains('user with this email address already exists.');
  });

  it('should not work because the email is not an good email', () => {
    cy.visit('localhost:3000/profile');
    cy.contains('Profile');
    cy.contains('admin@example.com');
    cy.get('[data-cy="edit-profile"]').click();
    cy.get('[data-cy="edit-first-name"]').clear().type('Admin');
    cy.get('[data-cy="edit-last-name"]').clear().type('user');
    cy.get('[data-cy="edit-email"]').clear().type('test');
    cy.get('[data-cy="save-edit-btn"]').click();
    cy.url().should('include', '/profile/edit');
  });
});

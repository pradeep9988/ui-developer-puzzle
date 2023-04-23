describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });

  it('Then: I should be able to add book to reading list and undo it', () => {
    cy.get('input[type="search"]').type('javascript');

    cy.get('form').submit();

    cy.get('[data-testing="read-button-1"]').then((btn) => {
      if (btn.is(':disabled')) {
        cy.get('[data-testing="toggle-reading-list"]').click();
        cy.get('[data-testing="remove-button"]').eq(0).click();
        cy.get('[data-testing="close-reading-list"]').click();
      }

      cy.get('[data-testing="read-button-1"]').click();
      cy.get('.mat-snack-bar-container').then((el) => {
        if (el.length > 0) {
          cy.get('.mat-simple-snackbar-action > .mat-focus-indicator')
            .last()
            .click();
        }
      });
      cy.get('[data-testing="read-button-1"]').should('not.be.disabled');
    });
  });

  it('Then: I should be able to remove book from reading list and undo it', () => {
    cy.get('input[type="search"]').type('javascript');

    cy.get('form').submit();

    cy.get('[data-testing="read-button-1"]').then((btn) => {
      if (btn.is(':disabled')) {
        cy.get('[data-testing="toggle-reading-list"]').click();
        cy.get('[data-testing="remove-button"]').eq(0).click();
        cy.get('[data-testing="close-reading-list"]').click();
      }

      cy.get('[data-testing="read-button-1"]').click();
      cy.get('[data-testing="toggle-reading-list"]').click();
      cy.get('[data-testing="remove-button"]').then(($selectedEl) => {
        cy.get('[data-testing="remove-button"]').click();
        cy.get('[data-testing="remove-button"]').should('not.exist');
        cy.get('.mat-snack-bar-container').then((el) => {
          if (el.length > 0) {
            cy.get('.mat-simple-snackbar-action > .mat-focus-indicator')
              .last()
              .click();
          }
        });
        cy.get('[data-testing="remove-button"]').should('exist');
      });
    });
  });
});

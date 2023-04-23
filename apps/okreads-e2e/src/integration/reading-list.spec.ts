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

  describe('Mark as finished', () => {
    beforeEach(() => {
      cy.get('input[type="search"]').type('javascript');
      cy.get('form').submit();

      cy.get('[data-testing="read-button-1"]').then((btn) => {
        if (btn.is(':disabled')) {
          cy.get('[data-testing="toggle-reading-list"]').click();
          cy.get('[data-testing="remove-button"]').click();
          cy.get('[data-testing="close-reading-list"]').click();
        }
      });
    });
    it('Then: I should be able to change the book to finished in reading list', () => {
      cy.get('[data-testing="read-button-1"]').click();
      cy.get('[data-testing="toggle-reading-list"]').click();
      cy.get('[data-testing="finished-action"]').click();
      cy.get('[data-testing="book-finished-date"]').should('exist');
    });
    it('Then: I should be able to see the "Want to read" button changes to "Finished" when book is set to finished', () => {
      cy.get('[data-testing="read-button-1"]').click();
      cy.get('[data-testing="toggle-reading-list"]').click();
      cy.get('[data-testing="finished-action"]').click();
      cy.get('[data-testing="close-reading-list"]').click();
      cy.get('[data-testing="read-button-1"]').should(
        'contain.text',
        'Finished'
      );
    });
    it('Then: I should be able to see the "Finished" button changes back to "Want to read" when the book is set as not finished', () => {
      cy.get('[data-testing="read-button-1"]').click();
      cy.get('[data-testing="toggle-reading-list"]').click();
      cy.get('[data-testing="finished-action"]').click();
      cy.get('[data-testing="close-reading-list"]').click();
      cy.get('[data-testing="read-button-1"]').should(
        'contain.text',
        'Finished'
      );
      cy.get('[data-testing="toggle-reading-list"]').click();
      cy.get('[data-testing="finished-action"]').click();
      cy.get('[data-testing="close-reading-list"]').click();
      cy.get('[data-testing="read-button-1"]').should(
        'contain.text',
        'Want to Read'
      );
    });
  });
});

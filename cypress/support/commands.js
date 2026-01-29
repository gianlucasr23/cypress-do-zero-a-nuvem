Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get("#firstName").type("Gian");
    cy.get("#lastName").type("Rodrigues Ferreira de Souza");
    cy.get("#email").type("lucas.gian@teste.com");
    cy.get("#open-text-area").type('Teste.');
    cy.get('.button[type="submit"]').click();
})
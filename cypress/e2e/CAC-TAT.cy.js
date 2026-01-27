describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit("./src/index.html");
  });

  it("verifica o título da aplicação", () => {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  it("preenche os campos obrigatórios e envia o formulário", () => {
    const longText = Cypress._.repeat("abcdefghijklmnopqrstuvwxyz", 10);

    cy.get("#firstName").type("Gian");
    cy.get("#lastName").type("Rodrigues Ferreira de Souza");
    cy.get("#email").type("lucas.gian@teste.com");
    cy.get("#open-text-area").type(longText, { delay: 0 });
    cy.get('.button[type="submit"]').click();

    cy.get(".success").should("be.visible");
  });

  /*teste para verificar email*/
  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
    cy.get("#firstName").type("Gian");
    cy.get("#lastName").type("Rodrigues Ferreira de Souza");
    cy.get("#email").type("lucas.gian@teste,com");
    cy.get("#open-text-area").type("teste");
    cy.get('.button[type="submit"]').click();

    cy.get(".error").should("be.visible");
  });

  it("campo telefone continua vazio quando preenchido com valor não númerico", () => {
    cy.get("#phone").type("abcde").should("have.value", "");
  });

  it.only("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    cy.get("#firstName").type("Gian");
    cy.get("#lastName").type("Rodrigues Ferreira de Souza");
    cy.get("#email").type("lucas.gian@teste,com");
    cy.get("#open-text-area").type("teste");
    cy.get('[for="phone-checkbox"]').click()
    cy.get('.button[type="submit"]').click();

    cy.get(".error").should("be.visible");
  });
});

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

  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    cy.get("#firstName").type("Gian");
    cy.get("#lastName").type("Rodrigues Ferreira de Souza");
    cy.get("#email").type("lucas.gian@teste,com");
    cy.get("#open-text-area").type("teste");
    cy.get('[for="phone-checkbox"]').click();
    cy.get('.button[type="submit"]').click();

    cy.get(".error").should("be.visible");
  });

  it("preenche e limpa os campos nome, sobrenome, email e telefone", () => {
    cy.get("#firstName")
      .type("Gian")
      .should("have.value", "Gian")
      .clear()

      .should("have.value", "");
    cy.get("#lastName")
      .type("Rodrigues Ferreira de Souza")
      .should("have.value", "Rodrigues Ferreira de Souza")
      .clear()

      .should("have.value", "");
    cy.get("#email")
      .type("lucasgian@teste.com")
      .should("have.value", "lucasgian@teste.com")
      .clear()

      .should("have.value", "");
    cy.get("#phone")
      .type("318766632")
      .should("have.value", "318766632")
      .clear()

      .should("have.value", "");
  });

  it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", () => {
    cy.get('.button[type="submit"]').click();

    cy.get(".error").should("be.visible");
  });


  it('envia o formuário com sucesso usando um comando customizado', () => {
    const data = {
      firstName: 'Gian',
      lastName: 'Rodrigues Ferreira de Souza',
      email: 'lucas.gian@teste.com',
      text: 'Teste',
    }
    
    cy.fillMandatoryFieldsAndSubmit (data)

    cy.get('.success').should('be.visible')
  })

});

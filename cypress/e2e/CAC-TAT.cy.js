describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit("./src/index.html");
  });

  it("verifica o título da aplicação", () => {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  it("preenche os campos obrigatórios e envia o formulário", () => {
    cy.clock();
    const longText = Cypress._.repeat("abcdefghijklmnopqrstuvwxyz", 10);

    cy.get("#firstName").type("Gian");
    cy.get("#lastName").type("Rodrigues Ferreira de Souza");
    cy.get("#email").type("lucas.gian@teste.com");
    cy.get("#open-text-area").type(longText, { delay: 0 });
    cy.contains("button", "Enviar").click();

    cy.get(".success").should("be.visible");

    cy.tick(3000);

    cy.get(".success").should("not.be.visible");
  });

  /*teste para verificar email*/
  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
    cy.clock();

    cy.get("#firstName").type("Gian");
    cy.get("#lastName").type("Rodrigues Ferreira de Souza");
    cy.get("#email").type("lucas.gian@teste,com");
    cy.get("#open-text-area").type("teste");
    cy.contains("button", "Enviar").click();

    cy.get(".error").should("be.visible");

    cy.tick(3000);

    cy.get(".error").should("not.be.visible");
  });

  it("campo telefone continua vazio quando preenchido com valor não númerico", () => {
    cy.get("#phone").type("abcde").should("have.value", "");
  });

  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    cy.clock();
    cy.get("#firstName").type("Gian");
    cy.get("#lastName").type("Rodrigues Ferreira de Souza");
    cy.get("#email").type("lucas.gian@teste,com");
    cy.get("#open-text-area").type("teste");
    cy.get("#phone-checkbox").check();
    cy.contains("button", "Enviar").click();

    cy.get(".error").should("be.visible");

    cy.tick(3000);

    cy.get(".error").should("not.be.visible");
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
    cy.clock();
    cy.contains("button", "Enviar").click();

    cy.get(".error").should("be.visible");

    cy.tick(3000);

    cy.get(".error").should("not.be.visible");
  });

  it("envia o formuário com sucesso usando um comando customizado", () => {
    cy.clock();
    const data = {
      firstName: "Gian",
      lastName: "Rodrigues Ferreira de Souza",
      email: "lucas.gian@teste.com",
      text: "Teste",
    };

    cy.fillMandatoryFieldsAndSubmit(data);

    cy.get(".success").should("be.visible");

    cy.tick(3000);

    cy.get(".error").should("not.be.visible");
  });

  it("seleciona um produto (YouTube) por seu texto", () => {
    cy.get("#product")
      .select("YouTube")

      .should("have.value", "youtube");
  });

  it("seleciona um produto (Mentoria) por seu valor (value)", () => {
    cy.get("#product")
      .select("mentoria")

      .should("have.value", "mentoria");
  });

  it("seleciona um produto (Blog) por seu índice", () => {
    cy.get("#product")
      .select(1)

      .should("have.value", "blog");
  });

  it("marca o tipo de atendimento 'Feedback'", () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()

      .should("be.checked", "feedback");
  });

  it("marca cada tipo de atendimento", () => {
    cy.get('input[type="radio"]').each((typeOfService) => {
      cy.wrap(typeOfService).check().should("be.checked");
    });
  });

  it("marca ambos checkboxes, depois desmarca o último", () => {
    cy.get('input[type="checkbox"]')
      .check()

      .should("be.checked")

      .last()
      .uncheck()

      .should("not.be.checked");
  });

  it("seleciona um arquivo da pasta fixtures", () => {
    cy.get("#file-upload")
      .selectFile("cypress/fixtures/example.json")
      .should((input) => {
        expect(input[0].files[0].name).to.equal("example.json");
      });
  });

  it("seleciona um arquivo simulando um drag-and-drop", () => {
    cy.get("#file-upload")
      .selectFile("cypress/fixtures/example.json", { artion: "drag-drop" })
      .should((input) => {
        expect(input[0].files[0].name).to.equal("example.json");
      });
  });

  it("seleciona um arquivo utilizando uma fixture para a qual foi dada um alias", () => {
    cy.fixture("example.json").as("sampleFile");
    cy.get("#file-upload")
      .selectFile("@sampleFile")

      .should((input) => {
        expect(input[0].files[0].name).to.equal("example.json");
      });
  });

  it("verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", () => {
    cy.contains("a", "Política de Privacidade")
      .should("have.attr", "href", "privacy.html")
      /*quero verificar que ele tem o atributo href = privacy.html  */
      .and("have.attr", "target", "_blank");
    /*também quero verificar que ele tem o atributo _blank, que abre em uma nova aba */
  });

  it("acessa a página da política de privacidade removendo o target e então clicando no link", () => {
    cy.contains("a", "Política de Privacidade")
      .invoke("removeAttr", "target")
      /* remove um atributo, o atributo target */
      .click();

    cy.contains("h1", "CAC TAT - Política de Privacidade").should("be.visible");
  });

  it("exibe e oculta as mensagens de sucesso e erro usando .invoke()", () => {
    cy.get(".success")
      .should("not.be.visible")
      .invoke("show")
      .should("be.visible")
      .and("contain", "Mensagem enviada com sucesso.")
      .invoke("hide")
      .should("not.be.visible");
    cy.get(".error")
      .should("not.be.visible")
      .invoke("show")
      .should("be.visible")
      .and("contain", "Valide os campos obrigatórios!")
      .invoke("hide")
      .should("not.be.visible");
  });

  it("preenche o campo da área de texto usando o comando invoke", () => {
    cy.get("#open-text-area")
      .invoke("val", "Um texto qualquer")
      .should("have.value", "Um texto qualquer");
  });

  it("faz uma requisição HTTP", () => {
    cy.request("https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html")
      .as("getRequest")
      .its("status")
      .should("be.equal", 200);
    cy.get("@getRequest").its("statusText").should("be.equal", "OK");
    cy.get("@getRequest").its("body").should("include", "CAC TAT");
  });
});

/// <reference types="Cypress" />

describe("Central de Atendimento ao Cliente TAT", function () {
  beforeEach(() => {
    cy.visit("./src/index.html");
    cy.get("button[type=submit]").as("submitBtn");
  });

  it("verifica o título da aplicação", function () {
    cy.title().should("be.eq", "Central de Atendimento ao Cliente TAT");
  });

  it("preenche os campos obrigatórios e envia o formulário", function () {
    cy.fillMandatoryFieldsAndSubmit();
    cy.get(".success")
      .should("be.visible")
      .and("contain", "Mensagem enviada com sucesso.");
  });

  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", function () {
    cy.get("#email").type("teste");
    cy.contains("button", "Enviar").click();
    cy.get(".error")
      .should("be.visible")
      .and("contain", "Valide os campos obrigatórios!", {
        delay: 0,
      });
  });

  it("deve manter o campo de telefone em branco ao digitar valor não numérico", function () {
    cy.get("#phone").type("teste").should("have.value", "");
  });

  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", function () {
    cy.get("#phone-checkbox").click();
    cy.get("@submitBtn").click();
    cy.get(".error")
      .should("be.visible")
      .and("contain", "Valide os campos obrigatórios!", { delay: 0 });
  });

  it("preenche e limpa os campos nome, sobrenome, email e telefone", function () {
    cy.get("#firstName")
      .type("Fulano de Tal", { delay: 0 })
      .should("have.value", "Fulano de Tal")
      .clear()
      .should("have.value", "");
    cy.get("#lastName")
      .type("da Silva", { delay: 0 })
      .should("have.value", "da Silva")
      .clear()
      .should("have.value", "");
    cy.get("#email")
      .type("teste@teste.com.br")
      .should("have.value", "teste@teste.com.br")
      .clear()
      .should("have.value", "");
    cy.get("#open-text-area")
      .type("Teste de mensagem")
      .should("have.value", "Teste de mensagem")
      .clear()
      .should("have.value", "");
  });

  it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", function () {
    cy.get("@submitBtn").click();
    cy.get(".error")
      .should("be.visible")
      .and("contain", "Valide os campos obrigatórios!", { delay: 0 });
  });

  it("seleciona um produto (YouTube) por seu texto", function () {
    cy.get("select").select("YouTube").should("have.value", "youtube");
  });

  it("seleciona um produto (Mentoria) por seu valor (value)", function () {
    cy.get("select").select("mentoria").should("have.value", "mentoria");
  });

  it("seleciona um produto (Blog) por seu índice", function () {
    cy.get("select").select(1).should("have.value", "blog");
  });

  it("marca o tipo de atendimento 'Feedback'", function () {
    cy.get('[type="radio"').check("feedback").should("be.checked");
  });

  it("marca cada tipo de atendimento", function () {
    cy.get('[type="radio"')
      .should("have.length", 3)
      .each((radio) => {
        cy.wrap(radio).check().should("be.checked");
      });
  });

  it("marca ambos checkboxes, depois desmarca o último", function () {
    cy.get('input[type="checkbox"]')
      .check(["phone", "email"])
      .should("be.checked")
      .last()
      .uncheck()
      .should("not.be.checked");
  });

  it("seleciona um arquivo da pasta fixtures", function () {
    cy.get('input[type="file"]')
      .should("not.have.value")
      .selectFile("./cypress/fixtures/example.json")
      .should(($option) => {
        expect($option[0].files[0].name).to.eq("example.json");
      });
  });

  it("seleciona um arquivo simulando um drag-and-drop", function () {
    cy.get('input[type="file"]')
      .should("not.have.value")
      .selectFile("./cypress/fixtures/example.json", {
        action: "drag-drop",
      })
      .should(($option) => {
        expect($option[0].files[0].name).to.eq("example.json");
      });
  });

  it("seleciona um arquivo utilizando uma fixture para a qual foi dada um alias", function () {
    cy.fixture("example.json").as("exampleData");

    cy.get('input[type="file"]')
      .should("not.have.value")
      .selectFile("@exampleData")
      .should(($option) => {
        expect($option[0].files[0].name).to.eq("example.json");
      });
  });

  it("verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", function () {
    cy.get("a").should("have.attr", "target", "_blank");
  });

  it("acessa a página da política de privacidade removendo o target e então clicando no link", function () {
    cy.get("a")
      .invoke("removeAttr", "target")
      .click()
      .title()
      .should(
        "be.eq",
        "Central de Atendimento ao Cliente TAT - Política de privacidade"
      );
  });

  it("testa a página da política de privacidade de forma independente", function () {
    cy.get("a")
      .invoke("removeAttr", "target")
      .click()
      .title()
      .should(
        "be.eq",
        "Central de Atendimento ao Cliente TAT - Política de privacidade"
      );

    cy.get("h1").should("contain", "CAC TAT - Política de privacidade");
    cy.get("#white-background").should("be.visible");
  });
});

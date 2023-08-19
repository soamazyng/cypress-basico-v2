/// <reference types="Cypress" />

describe("Central de Atendimento ao Cliente TAT Políticas", function () {
    beforeEach(() => {
      cy.visit("./src/index.html");
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
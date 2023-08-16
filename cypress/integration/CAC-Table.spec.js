/// <reference types="Cypress" />

describe("Table", function () {
  beforeEach(() => {
    cy.visit("./src/table.html");
  });

  it("verifica o título da aplicação", function () {
    cy.title().should("be.eq", "Table");
  });

  it("Verifica se o status da tabela está como aprovado em todas as linhas", function () {
    cy.get("tbody tr td:nth-child(3)").each((element) => {
      expect(element.text()).to.be.eq("Aprovado");
    });
  });
});

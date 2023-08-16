// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// -- This will fill all mandatory fields and submit
Cypress.Commands.add("fillMandatoryFieldsAndSubmit", () => {
  const longText =
    "Veniam enim eu consectetur velit excepteur anim. Commodo incididunt ex sit et labore quis aliquip voluptate dolor ad. Consectetur dolore exercitation non labore aliqua qui laboris culpa est tempor pariatur.";

  cy.get("#firstName").type("Fulano de Tal 123");
  cy.get("#lastName").type("da Silva");
  cy.get("#email").type("teste@teste.com.br");
  cy.get("#open-text-area").type(longText, { delay: 0 });
  cy.get("@submitBtn").click();
});

/// <reference types="Cypress" />

describe("Request API", function () {
    beforeEach(() => {
      
    });
    it("faz uma requisição HTTP para api do Star Wars", function () {

        cy.request("https://swapi.dev/api/people/1").should((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property("name", "Luke Skywalker");  
        });
    
      });

});
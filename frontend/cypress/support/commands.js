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


Cypress.Commands.add('preencherFormularioContrato', (contrato) => {
    cy.get('input[name="nome"]').clear().type(contrato.nome);
    cy.get('input[name="orcamento"]').clear().type(contrato.orcamento);
    cy.get('input[name="data_inicio"]').click();
    cy.get('.el-date-table').contains('.available', '4').click();
    cy.get('input[name="data_fim"]').clear().type(contrato.data_fim);
});

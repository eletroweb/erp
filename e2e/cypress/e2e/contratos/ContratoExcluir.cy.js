describe('Contrato', () => {
    it('Cadastrar contrato', () => {
        cy.fixture('contrato.json').then((contrato) => {
            cy.visit('http://localhost:5173/');
            cy.contains('Contratos').click();
            cy.get('.btnCadastrar').click();
            cy.preencherFormularioContrato({
                nome: 'Contrato 1',
                orcamento: '20000',
                data_fim: '21/03/2024'
              });
            cy.contains("Situação").click();
            cy.contains("Salvar").click();
        });
    });

    it('Excluir contrato', () => {
        cy.visit('http://localhost:5173/');
        cy.contains('Contratos').click();
        cy.contains('Editar').click()
        cy.contains('Excluir').click()
        cy.contains('Confirmar').click()
        cy.contains('Contratos').click()
    })
})
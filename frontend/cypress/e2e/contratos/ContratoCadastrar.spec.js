describe('Contratos', () => {
    it('Cadastrar contrato', () => {
        cy.fixture('contrato.json').then((contrato) => {
            cy.visit('http://localhost:5173/');
            cy.contains('Contratos').click();
            cy.get('.btnCadastrar').click();
            cy.get('input[name="nome"]').type(contrato.nome);
            cy.get('input[name="orcamento"]').type(contrato.orcamento);
            cy.get('input[name="data_inicio"]').click();
            cy.get('.el-date-table').contains('.available', '4').click();
            cy.get('input[name="data_fim"]').type(contrato.data_fim);
            cy.contains("Situação").click();
            cy.contains("Salvar").click();
        });
    });
});
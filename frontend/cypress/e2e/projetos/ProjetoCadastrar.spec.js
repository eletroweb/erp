describe('Projetos', () => {
    it('Cadastrar projeto', () => {
        cy.fixture('projeto.json').then((projeto) => {
            cy.visit('http://localhost:5173/');
            cy.contains('Projetos').click();
            cy.get('.btnCadastrar').click();
            cy.contains('Cliente').click();
            cy.get('input[name="nome"]').type(projeto.contrato);
            /*cy.get('input[name="orcamento"]').type(projeto.orcamento);
            cy.get('input[name="data_inicio"]').click();
            cy.get('.el-date-table').contains('.available', '4').click();
            cy.get('input[name="data_fim"]').type(projeto.data_fim);
            cy.contains("Situação").click();
            cy.contains("Salvar").click();*/
        });
    });
});
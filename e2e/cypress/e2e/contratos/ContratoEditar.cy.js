describe('Contratos', () => {

    beforeEach(() => {
        cy.visit('http://localhost:5173/')
        cy.contains('Contratos').click()
    })

    it('Cadastrar contrato', () => {
        cy.fixture('contrato.json').then((contrato) => {
            cy.get('.btnCadastrar').click();
            cy.preencherFormularioContrato({
                nome: contrato.nome,
                orcamento: contrato.orcamento,
                data_fim: contrato.data_fim
              });
            cy.contains("Situação").click();
            cy.contains("Salvar").click();
        });
    });

    it('Editar contrato', () => {
        cy.fixture('contrato_editar.json').then((contrato) => {
            cy.visit('http://localhost:5173/');
            cy.contains('Contratos').click();
            cy.contains('Editar').click()
            cy.preencherFormularioContrato({
                nome: contrato.nome,
                orcamento: contrato.orcamento,
                data_fim: contrato.data_fim
              });
            cy.contains("Situação").click();
            cy.contains("Situação").click()
            cy.contains("Salvar alterações").click()
        })
    });
})

describe('Setores', () => {
    it('RF1.1 Cadastrar Setor', () => {
        cy.fixture('setor_cadastrar.json').then((setor_cadastrar) => {
            cy.visit('http://localhost:5173/');
            cy.get('input[type="email"]').type(setor_cadastrar.email);
            cy.get('input[type="password"]').type(setor_cadastrar.password);
            cy.contains('Entrar').click();
            cy.contains('Setores').click();
            cy.contains('Cadastrar').click();
            cy.get('input[name="nome"]').type(setor_cadastrar.nome);
            cy.contains('Situação').click();
            cy.contains('Salvar').click();
        })
    })
})
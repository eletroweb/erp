describe('Setores', () => {

    beforeEach(() => {
        cy.visit('http://localhost:5173/');
    })
    it('RF1.4 Listar Setor', () => {
        cy.fixture('setor_cadastrar.json').then((setor_cadastrar) => {
            cy.get('input[type="email"]').type(setor_cadastrar.email);
            cy.get('input[type="password"]').type(setor_cadastrar.password);
            cy.contains('Entrar').click();
            cy.contains('Setores').click();
        })
    })
})


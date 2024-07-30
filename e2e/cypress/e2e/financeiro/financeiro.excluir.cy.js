describe('RF14 Financeiro: Gerenciar receita', () => {

  beforeEach(() => {
    cy.fixture('login.json').then((login) => {
      cy.visit('http://localhost:5173/');
      cy.get('input[type="email"]').type(login.email)
      cy.get('input[type="password"]').type(login.password)
      cy.contains('Entrar').click();
    })
  })

  it('RF14.2.4 Excluir receita', () => {
    cy.contains('Financeiro').click()
    cy.get('table.p-datatable-table').within(() => {
      cy.get('tbody.p-datatable-tbody tr').last().within(() => {
        cy.get('td').last().find('button:contains("Editar")').click();
      });
    });

    cy.contains('Excluir').click();
    cy.contains('Registro financeiro exclúido com sucesso');
  })
})

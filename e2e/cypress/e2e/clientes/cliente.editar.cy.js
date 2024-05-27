describe('Validar editar cliente', () => {

  beforeEach(() => {
    cy.fixture('login.json').then((login) => {
      cy.visit('http://localhost:5173/');
      cy.get('input[type="email"]').type(login.email)
      cy.get('input[type="password"]').type(login.password)
      cy.contains('Entrar').click();
    })
  })

  it('RF2.2 Editar Cliente', () => {
    cy.contains('Clientes').click();
    cy.fixture('cliente_editar.json').then((cliente_editar) => {
    cy.get('.el-table__row').contains('td.el-table_1_column_6', 'Editar').click()
    cy.contains('Editar Cliente')
    cy.get('input[name="nome"').clear().type(cliente_editar.editado.nome)
    cy.get('input[name="documento"').clear().type(cliente_editar.editado.documento)
    cy.contains(cliente_editar.editado.estado).click()
    cy.get('input[name="cidade"').clear().type(cliente_editar.editado.cidade)
    cy.get('input[name="email"').clear().type(cliente_editar.editado.email)
    cy.get('input[name="telefone"').clear().type(cliente_editar.editado.telefone)
    cy.contains(cliente_editar.editado.setor).click()
    cy.get('#endereco').clear().clear().type(cliente_editar.editado.endereco)
    cy.get('#complemento').clear().type(cliente_editar.editado.complemento)
    cy.contains("Situação").click()
    cy.contains("Salvar").click()
    cy.contains("Cliente atualizado com sucesso")
    })
  })
})
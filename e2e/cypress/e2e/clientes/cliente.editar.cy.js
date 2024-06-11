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
    cy.fixture('EDITAR_CLIENTE.json').then((EDITAR_CLIENTE) => {
    cy.get('.el-table__row').contains('td.el-table_1_column_6', 'Editar').click()
    cy.contains('Editar Cliente')
    cy.get('input[name="nome"').clear().type(EDITAR_CLIENTE.editado.nome)
    cy.get('input[name="documento"').clear().type(EDITAR_CLIENTE.editado.documento)
    cy.contains(EDITAR_CLIENTE.editado.estado).click()
    cy.get('input[name="cidade"').clear().type(EDITAR_CLIENTE.editado.cidade)
    cy.get('input[name="email"').clear().type(EDITAR_CLIENTE.editado.email)
    cy.get('input[name="telefone"').clear().type(EDITAR_CLIENTE.editado.telefone)
    cy.contains(EDITAR_CLIENTE.editado.setor).click()
    cy.get('#endereco').clear().clear().type(EDITAR_CLIENTE.editado.endereco)
    cy.get('#complemento').clear().type(EDITAR_CLIENTE.editado.complemento)
    cy.contains("Situação").click()
    cy.contains("Salvar").click()
    cy.contains("Cliente atualizado com sucesso")
    })
  })
})
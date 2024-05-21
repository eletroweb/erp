describe('Editar Fornecedor', () => {

    beforeEach(() => {
      cy.fixture('login.json').then((login) => {
        cy.visit('http://localhost:5173/');
        cy.get('input[type="email"]').type(login.email)
        cy.get('input[type="password"]').type(login.password)
        cy.contains('Entrar').click();
      })
    })
  
    it('RF13.2 Editar Fornecedor', () => {
      cy.fixture('fornecedor_editar.json').then((fornecedor_editar) => {
      cy.contains('Fornecedores').click();
      cy.get('.el-table__row').contains('td.el-table_1_column_5', 'Editar').click()
      cy.contains('Editar Fornecedor')
      cy.get('input[name="nome"').clear().type(fornecedor_editar.editado.nome)
      cy.get('input[name="documento"').clear().type(fornecedor_editar.editado.documento)
      cy.contains(fornecedor_editar.editado.estado).click()
      cy.get('input[name="cidade"').clear().type(fornecedor_editar.editado.cidade)
      cy.get('input[name="email"').clear().type(fornecedor_editar.editado.email)
      cy.get('input[name="telefone"').clear().type(fornecedor_editar.editado.telefone)
      cy.get('#endereco').clear().clear().type(fornecedor_editar.editado.endereco)
      cy.get('#complemento').clear().type(fornecedor_editar.editado.complemento)
      cy.contains("Situação").click()
      cy.contains("Salvar").click()
      cy.contains("Fornecedor atualizado com sucesso")
      })
    })
  })
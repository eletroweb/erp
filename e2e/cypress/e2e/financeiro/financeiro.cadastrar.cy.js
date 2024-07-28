describe('Cadastrar Financeiro', () => {

  beforeEach(() => {
    cy.fixture('login.json').then((login) => {
      cy.visit('http://localhost:5173/');
      cy.get('input[type="email"]').type(login.email)
      cy.get('input[type="password"]').type(login.password)
      cy.contains('Entrar').click();
    })
  })

  it('Cadastrar Receita', () => {
    cy.contains('Financeiro').click()
    cy.contains('Novo registro financeiro').click()

    cy.fixture('financeiro.json').then((item) => {
      cy.contains('Receita').click()
      cy.get('#centroDeCusto').click()
      cy.get('#centroDeCusto_0').click()
      cy.contains("Selecione o Setor...").click()
      cy.contains(item.setor).click()
      cy.get('input[name="descricao"').type(item.descricao)
      cy.get('input[name="fornecedor"').type(item.fornecedor)
      cy.get('input#data_vencimento').click({ force: true })
      cy.get('.p-datepicker-today > .p-datepicker-day').click({ force: true })
      cy.get('#valor_nominal').click({ force: true }).type(item.valor_nominal)
      cy.get('span#parcelas').click()
      cy.get('#pv_id_7_0').click()
      //cy.get('#valor_total').type(item.valor_total)
      cy.get('.p-textarea').type(item.observacao)

      cy.get('table.p-datatable-table').each(($table) => {
        cy.wrap($table).within(() => {

          // Coluna Parcelas
          cy.get('tbody.p-datatable-tbody tr.p-row-even')
            .find('td')
            .eq(0)
            .contains('1/1');

          // Coluna Vencimento
          cy.get('tbody.p-datatable-tbody tr.p-row-even')
            .find('td')
            .eq(1)
            .contains('28/07/2024');

          // Coluna Valor
          cy.get('tbody.p-datatable-tbody tr.p-row-even')
            .first()
            .find('td')
            .eq(3)
            .within(() => {
              cy.get('input#valor_parcela')
                .should('be.visible')
                .then(($input) => {
                  const inputValue = $input.val();
                  cy.log('Valor do input:', inputValue)
                  cy.wrap(inputValue).should('equal', 'R$ 100,00')
                });
            });

          // Coluna Situação
          cy.get('tbody.p-datatable-tbody tr.p-row-even')
            .find('td')
            .eq(4)
            .contains('PENDENTE');
        });
      });
    })
  })
})

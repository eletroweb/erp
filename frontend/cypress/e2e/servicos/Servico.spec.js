import multiReporters from 'cypress-multi-reporters';

multiReporters({
  specs: [
    'ServicoCadastrar.spec.js',
    'ServicoEditar.spec.js',
    'ServicoExcluir.spec.js',
    'ServicoListar.spec.js'
  ],
});
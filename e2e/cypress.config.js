const { defineConfig } = require("cypress");

module.exports = {
  e2e: {
    projectId: "",
    pageLoadTimeout: 120000,
    chromeWebSecurity: false,
    // viewportWidth: 1920,
    //viewportHeight: 1080,
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/results',
      overwrite: true,
      html: true,
      json: true,
    },
    setupNodeEvents(on, config) {
      /* on('before:browser:launch', (browser, launchOptions) => {
        if (browser.name === 'chrome' && browser.isHeadless) {
          const version = parseInt(browser.majorVersion)
          if (version >= 123) {
            launchOptions.args.push('--headless=new')
          }
        }
    
        return launchOptions
      })*/

      // on('task', {
      //   async 'teste'() {
      //     console.log("Criando massa de dados para Agendamento de Carga");
      //     const { data } = await axios.get(`http://localhost:3000/loadSchedule/`)
      //     return data
      //   },
      // })
    },

    
  },
};
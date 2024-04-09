import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: "r5q6j8",
  viewportWidth: 1200,
  viewportHeight: 768,
  video: false,
  videoCompression: false,
  e2e: {
    specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:4173'
  },
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/results',
    overwrite: false,
    html: true,
    json: true,
  },
  component: {
    specPattern: 'src/**/__tests__/*.{cy,spec}.{js,ts,jsx,tsx}',
    devServer: {
      framework: 'vue',
      bundler: 'vite'
    }
  },
  screenshotsFolder:"TestResults/assets",
  reporter: "cypress-multi-reporters",
  reporterOptions: {
    configFile: "reporter-config.json"
  }
})

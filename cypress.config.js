const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportHeight: 880,
  viewportWidth: 1280,
  e2e: {},
  projectId: b6h4in,
  // Não é necessário, apenas em testes headless video: true,
})

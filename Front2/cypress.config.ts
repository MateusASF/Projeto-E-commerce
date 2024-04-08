import { defineConfig } from "cypress";

export default defineConfig({
  projectId: '2btte8',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:4200',
    port: 4202,
  },
  viewportWidth: 1920,
  viewportHeight: 1080,
  port: 4202,
  component: {
    devServer: {
      framework: "angular",
      bundler: "webpack",
    },
    specPattern: "**/*.cy.ts",
  },
});

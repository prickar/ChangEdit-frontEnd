import { defineConfig } from 'vite'
import vitePrettier from 'vite-plugin-prettier'

export default defineConfig({
  // Other configurations...
  plugins: [
    vitePrettier({
      semi: false,
      singleQuote: true,
      tabWidth: 2,
      trailingComma: 'none',
      printWidth: 80
      // Other Prettier options...
    })
  ]
})

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Umożliwia używanie describe, it, expect bez importu
    environment: 'jsdom', // Wymagane dla React Testing Library
    setupFiles: './src/tests/setup.ts', // Opcjonalny plik inicjalizacyjny
  },
});

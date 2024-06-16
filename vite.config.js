import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      // S'assurer qu'il n'y a pas de fichiers dupliqués
      input: {
        main: "./src/main.js", // point d'entrée principal
      },
      output: {
        // Options de sortie, si nécessaire
      },
    },
  },
  // Ajoutez des configurations spécifiques si nécessaire
});

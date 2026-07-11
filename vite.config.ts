import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        index: resolve(process.cwd(), "index.html"),
        bank: resolve(process.cwd(), "bank.html"),
        ecommerce: resolve(process.cwd(), "ecommerce.html"),
        novel: resolve(process.cwd(), "novel.html")
      }
    }
  }
});

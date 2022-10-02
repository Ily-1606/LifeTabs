import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import CustomHmr from "./plugins/hmr";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  plugins: [vue(), CustomHmr()],
});

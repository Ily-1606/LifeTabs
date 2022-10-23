import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import { resolve } from "path";
import CustomHmr from "./plugins/hmr";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig((cfg) => {
  const config = {
    ...cfg,
    resolve: {
      alias: {
        "~": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, "index.html"),
        },
      },
      outDir: "dist",
    },
  };
  const plugins = [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => ["lottie-player"].includes(tag),
        },
      },
    }),
    CustomHmr(config),
  ];
  config.plugins = plugins;
  return config;
});

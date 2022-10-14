import fg from "fast-glob";
import fs from "fs";
export default function CustomHmr(config) {
  return {
    name: "custom-hmr",
    enforce: "post",
    apply: "build",
    // HMR
    async buildStart() {
      const files = await fg("public/**/*");
      for (let file of files) {
        this.addWatchFile(file);
      }
      const envs = await fg("./.env.*");
      for (let file of envs) {
        /**
         * //TODO Copy env file to output build folder
         */
        fs.copyFile(file, `${config.build.outDir}/${file}`, () => {});
        /**
         * //TODO Add .env.json to extension
         * //TODO Copy file to dist directory
         */
        this.addWatchFile(file);
      }
    },
  };
}

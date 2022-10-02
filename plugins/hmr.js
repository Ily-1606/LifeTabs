import fg from "fast-glob";
export default function CustomHmr() {
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
    },
  };
}

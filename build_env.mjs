import fs from "fs";
// File env will convert to json
const ENV_FILE = ".env.local";
const env_content = fs.readFileSync(process.cwd() + "/" + ENV_FILE).toString();
const build = (env_string) => {
  const configs = {};
  const lines = env_string.split("\n");
  lines.forEach((line) => {
    const regex = /(.*)=(.*)/m;
    if (regex.test(line)) {
      const matched = line.match(regex);
      const key = matched[1];
      const value = matched[2];
      configs[key] = value;
    }
  });

  return configs;
};
const env_json = build(env_content);
const writeFile = (env_json) => {
  fs.writeFileSync(`${ENV_FILE}.json`, JSON.stringify(env_json, null, 4));
};
writeFile(env_json);

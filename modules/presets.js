import fs from "fs";
import * as yaml from "js-yaml";

const presets = yaml.load(fs.readFileSync("./data/presets.yaml", "utf8"));

export default presets;

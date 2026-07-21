import fs from "fs";
import * as yaml from "js-yaml";

const characters = yaml.load(fs.readFileSync("./data/characters.yaml", "utf8"));

export default characters;

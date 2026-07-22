import fs from "fs";
import * as yaml from "js-yaml";

const weapons = yaml.load(fs.readFileSync("./data/weapons.yaml", "utf8"));

export default weapons;

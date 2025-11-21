import { TokenList } from "@tokenlist-builder/core";
import fs from "node:fs";

export default function output(output: string, tokenList: TokenList) {
  const dir = output.split("/");
  dir.pop();
  fs.mkdirSync(dir.join("/"), { recursive: true });
  fs.writeFileSync(output, JSON.stringify(tokenList, null, 2), {
    encoding: "utf8",
  });
}

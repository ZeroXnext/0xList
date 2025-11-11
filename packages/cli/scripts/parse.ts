import {TokenList} from "@tokenlist-builder/core"
import * as fs from 'node:fs';
import path from 'node:path';

function main(outputDir: string) {
  const mapped = new Map<string, Map<string, TokenList>>();

  // Read all chain types (e.g., 'evm', 'solana', etc.)
  const chainTypes = fs.readdirSync(outputDir, {withFileTypes: true})
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name);

  for (const chainType of chainTypes) {
    const chainTypePath = path.join(outputDir, chainType);
    const chains = fs.readdirSync(chainTypePath, {withFileTypes: true})
        .filter(entry => entry.isDirectory())
        .map(entry => entry.name);

    for (const chainName of chains) {
      const chainPath = path.join(chainTypePath, chainName);
      const listFiles = fs.readdirSync(chainPath, {withFileTypes: true})
          .filter(entry => entry.isFile() && entry.name.endsWith('.json'))
          .map(entry => entry.name);

      for (const listFile of listFiles) {
        const listPath = path.join(chainPath, listFile);
        const raw = fs.readFileSync(listPath, 'utf-8');
        const tokenList: TokenList = JSON.parse(raw);
        const listName = path.basename(listFile, '.json');

        if (!mapped.has(chainType)) {
          mapped.set(chainType, new Map());
        }

        const chainMap = mapped.get(chainType)!;
        const key = `${chainName}/${listName}`;
        chainMap.set(key, tokenList);
      }
    }
  }

  return mapped;
}

export default main;

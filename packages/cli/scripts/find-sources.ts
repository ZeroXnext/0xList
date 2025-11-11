import type {TokenList} from "@tokenlist-builder/core";
import {LIST_SOURCES} from '../constants';

async function main() {
  return Promise.all(Object.keys(LIST_SOURCES).map<Promise<TokenList[]>>(async (item) => {
    const res = await fetch(LIST_SOURCES[item]);
    return res.json() as Promise<TokenList[]>;
  }));
}

export default main;

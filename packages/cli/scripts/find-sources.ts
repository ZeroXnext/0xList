import {TokenList, tokenListSchema} from "@tokenlist-builder/core";
import {LIST_SOURCES} from '../constants';
import Ajv from 'ajv';


const ajv = new Ajv();
const validator = ajv.addSchema(tokenListSchema);

async function main(sources: string[]) {
  return Promise.all(sources.map<Promise<TokenList>>(async (item) => {
    const res = await fetch(LIST_SOURCES[item]);
    const data = await res.json() as TokenList;
    if (!validator.validate(tokenListSchema, data)) {
      throw new Error(`The list ${item} from ${LIST_SOURCES[item]} is invalid.`);
    }
    return data;
  }));
}

export default main;

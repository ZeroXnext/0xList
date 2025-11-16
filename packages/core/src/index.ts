import configSchema from "../schemas/config.schema.json";
import tokenListIndexSchema from "../schemas/tokenlist-index.schema.json";

export type {TokenList} from "@uniswap/token-lists";
export * from "./types";
export {schema as tokenListSchema} from "@uniswap/token-lists";
export {configSchema, tokenListIndexSchema};

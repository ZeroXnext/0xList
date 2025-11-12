import {TokenList, tokenListSchema} from "@tokenlist-builder/core";
import {DEFAULT_LIST_LOGO_URI, DEFAULT_LIST_VERSION, DEFAULT_TOKEN_LIST_NAME} from './constants';

export function partitionArray<T>(array: T[], maxItems: number): T[][] {
  if (maxItems <= 0) throw new Error("maxItems must be greater than 0");

  const result: T[][] = [];
  for (let i = 0; i < array.length; i += maxItems) {
    result.push(array.slice(i, i + maxItems));
  }
  return result;
}

export function partitionTokenList(tokenList: Omit<TokenList, "version" | "timestamp">,
                                   version: TokenList['version'] = DEFAULT_LIST_VERSION,
                                   timestamp = new Date().toLocaleTimeString(),
                                   defaultTokenListName = DEFAULT_TOKEN_LIST_NAME): TokenList[] {
  // Copy metadata from the list and the partitioned tokens
  const tokens = partitionArray(tokenList.tokens, tokenListSchema.properties.tokens.maxItems);
  let tokenLists: TokenList[] = [];

  let i = 0;
  for (const _tokens of tokens) {
    const name = `${tokenList.name}${i}`;
    i++;
    tokenLists.push(initializeTokenList({
      ...tokenList,
      name: name.length > tokenListSchema.properties.name.maxLength ? `${defaultTokenListName} ${i}` : name,
      tokens: _tokens
    }, version, timestamp));
  }

  return tokenLists;
}

export function initializeTokenList({
                                      name,
                                      logoURI,
                                      tags,
                                      keywords,
                                      tokens
                                    }: Omit<TokenList, "version" | "timestamp"> = {
  name: DEFAULT_TOKEN_LIST_NAME,
  logoURI: DEFAULT_LIST_LOGO_URI,
  tags: {},
  keywords: [],
  tokens: [],
}, version: TokenList['version'] = DEFAULT_LIST_VERSION, timestamp = new Date().toLocaleTimeString()): TokenList {
  return {
    name,
    logoURI,
    tags,
    version,
    keywords,
    timestamp,
    tokens,
  };
}

export function createDefaultList(chainName: string): TokenList {
  return {
    name: "Default token list",
    logoURI: "",
    tags: {},
    version: {
      major: 1,
      patch: 0,
      minor: 0,
    },
    keywords: [],
    timestamp: new Date().toISOString(),
    tokens: [],
  };
}

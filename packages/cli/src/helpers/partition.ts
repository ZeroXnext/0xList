import {TokenList, tokenListSchema} from '@tokenlist-builder/core';
import {DEFAULT_LIST_VERSION, DEFAULT_TOKEN_LIST_NAME} from '@constants';
import {MutableTokenList} from '@types';
import {partitionArray} from '@utils';
import {initializeTokenList} from './index';

function partition(tokenList: Omit<TokenList, "version" | "timestamp">,
                                   version: TokenList['version'] = DEFAULT_LIST_VERSION,
                                   defaultTokenListName = DEFAULT_TOKEN_LIST_NAME): MutableTokenList[] {
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
    }, version));
  }

  return tokenLists;
}

export default partition

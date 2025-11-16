import {TokenList} from '@uniswap/token-lists';

export interface TokenListIndex {
  timestamp: string;
  version: TokenList['version'],
  lists: (Omit<TokenList, "tokens"> & Record<"contents", string>)[],
}

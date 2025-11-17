import allNetworkTypes from './all-network-types';
import {CHAINS_MAPPING} from '@tokenlist-builder/core';

export default function allChainNames(networkTypes = allNetworkTypes()) {
  return Array.from(new Set(Object.values(CHAINS_MAPPING).filter(item => networkTypes.includes(item.type)).map(item => item.name)));
}

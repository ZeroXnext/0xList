import {CHAINS_MAPPING} from '@tokenlist-builder/core';

export default function allNetworkTypes() {
  return Array.from(new Set(Object.values(CHAINS_MAPPING).map(item => item.type)));
}

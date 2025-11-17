import {ListIndex, timestamp} from '@tokenlist-builder/core';

/**
 *
 * @param indexes
 * @param basePath
 */
export default function mergeIndexes(indexes: ListIndex[], basePath: string) {
  const mapping = new Map<string, ListIndex>();
  for (const {lists} of indexes) {
    for (const list of lists) {
      const [, network_type] = list.contents.trim().replaceAll(basePath, '').trim().split('/');
      let cached = mapping.get(network_type);
      if (!cached) {
        mapping.set(network_type, {timestamp: timestamp(), lists: []});
        cached = mapping.get(network_type);
      }
      cached?.lists.push(list);
    }
  }
  return mapping;
}

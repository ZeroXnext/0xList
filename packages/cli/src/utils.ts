
export function partitionArray<T>(array: T[], maxItems: number): T[][] {
  if (maxItems <= 0) throw new Error("maxItems must be greater than 0");

  const result: T[][] = [];
  for (let i = 0; i < array.length; i += maxItems) {
    result.push(array.slice(i, i + maxItems));
  }
  return result;
}

export function slugify(str: string): string {
  return str
      .normalize("NFD")                 // decompose accents/diacritics
      .replace(/[\u0300-\u036f]/g, '')  // remove the accents
      .toLowerCase()
      .trim()
      .replace(/[\s_]+/g, '-')          // spaces/underscores → hyphens
      .replace(/[^\w-]+/g, '')          // remove non-alphanumeric except hyphen
      .replace(/--+/g, '-')             // collapse multiple hyphens
      .replace(/^-+|-+$/g, '');         // remove leading/trailing hyphens
}

export function getOrCreateMap<K, V>(
    target: Partial<Record<string, any>>,
    targetKey: keyof typeof target,
    initialKey?: K,
    initialValue?: V,
): [Map<K, V>, V | undefined] {
  let map = target[targetKey] as Map<K, V> | undefined;

  if (!map) {
    map = new Map<K, V>();
    target[targetKey] = map as any;
  }
  if (initialKey && initialValue && !map.has(initialKey)) {
    map.set(initialKey, initialValue);
  }
  return [map, initialKey ? map.get(initialKey) : undefined];
}

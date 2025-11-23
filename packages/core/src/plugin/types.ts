import { Key, TokenList } from '@types';
import { Logger } from '../utils/logger';
import { Config } from '@config';
import { slugify } from '@utils';

export interface PluginMetadata {
  name: string;
  description: string;
  publicKey: Key;
  url: string;
}

export interface Plugin {
  metadata: PluginMetadata;

  setup(ctx: ExecutionContext): void;

  execute(ctx: ExecutionContext): void;
}

export interface Utils {
  slugify: typeof slugify;
  logger: Logger;
}

export type DefaultExecutionContext = Omit<Config, 'plugins'>;

export interface ExecutionContext<T = DefaultExecutionContext> {
  context: T;
  utils: Utils;
}

export interface PluginLoaderType {
  role: 'loader';
  isInternal: boolean;

  load(ctx: ExecutionContext<Omit<Config, 'plugins'>>): [string, string];
}

// 1. Load state
export type StateSource = 'local' | 'external';

export interface StateLoader {
  name: string;
  source: StateSource;
  mode: 'state' | 'peer-state';
  load: () => Promise<TokenList>;
}

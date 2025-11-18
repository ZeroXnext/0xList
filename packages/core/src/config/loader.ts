import {Config} from '@types';
import defaultConfig from './default';

async function loader(configName = "0xlist.config"): Promise<Config> {
  let config: Partial<Config>;
  try {
    config = {...defaultConfig, ...(await import(configName) ?? {}).default as Config};
  } catch (error) {
    config = defaultConfig;
  }

  return config as Config;
}

export default loader;

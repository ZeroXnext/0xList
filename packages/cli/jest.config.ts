import {Config} from "jest";
import {createDefaultPreset, pathsToModuleNameMapper} from "ts-jest";

const tsJestTransformCfg = createDefaultPreset().transform;

export default {
  testEnvironment: "node",
  testMatch: ["<rootDir>/**/**/.test.ts", "<rootDir>/**/*.test.ts"],
  transform: {
    ...tsJestTransformCfg,
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
      },
    ],
  },
  moduleNameMapper: pathsToModuleNameMapper({
    "@utils": ["src/utils.ts"],
    "@types": ["src/types.ts"],
    "@constants": ["src/constants.ts"],
    "@helpers": ["src/helpers/index.ts"]
  }, {
    prefix: '<rootDir>/',
  }),
} as Config;

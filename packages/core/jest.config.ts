import {Config} from "jest";
import {createDefaultPreset} from "ts-jest";

const tsJestTransformCfg = createDefaultPreset().transform;

export default {
  testEnvironment: "node",
  testMatch: ["<rootDir>/**/*.test.ts"],
  transform: {
    ...tsJestTransformCfg,
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.jest.json',
      },
    ],
  },
} as Config;

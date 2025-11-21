import {nodeResolve} from '@rollup/plugin-node-resolve';
import alias from '@rollup/plugin-alias';
import path from 'path';
import {fileURLToPath} from "url"
import esbuild from 'rollup-plugin-esbuild'
import json from '@rollup/plugin-json';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  input: "src/index.ts",
  output: [
    {
      file: 'dist/index.esm.js',
      format: 'esm'
    }
  ],
  plugins: [
    json(),
    alias({
      entries: [
        {find: '@utils', replacement: path.resolve(__dirname, 'src/utils/index.ts')},
        {find: '@helpers', replacement: path.resolve(__dirname, 'src/helpers/index.ts')},
        {find: '@constants', replacement: path.resolve(__dirname, 'src/constants.ts')},
      ]
    }),
    esbuild({
      // All options are optional
      include: /\.[jt]sx?$/, // default, inferred from `loaders` option
      exclude: /node_modules/, // default
      sourceMap: true, // default
      minify: import.meta.env?.NODE_ENV === 'production',
      target: 'esnext', // default, or 'es20XX', 'esnext'
      jsx: 'transform', // default, or 'preserve'
      define: {
        __VERSION__: '"x.y.z"',
      },
      tsconfig: 'tsconfig.json', // default
      // Add extra loaders
      loaders: {
        // Add .json files support
        // require @rollup/plugin-commonjs
        '.json': 'json',
        // Enable JSX in .js files too
        '.js': 'jsx',
      },
    }),
    nodeResolve({browser: true}),

  ],
  ignore: ["src/**/*.test.ts"],
  external: ['ajv'] // don't bundle AJV;
};

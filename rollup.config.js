import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import flow from 'rollup-plugin-flow';
import uglify from 'rollup-plugin-uglify';

export default {
  dest: 'dist/index.js',
  entry: 'src/index.js',
  format: 'cjs',
  plugins: [
    flow(),
    babel(),
    commonjs({
      sourceMap: false,
    }),
    resolve(),
    uglify(),
  ],
};

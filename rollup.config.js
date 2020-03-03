import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy'
import {terser} from 'rollup-plugin-terser';
import replace from 'rollup-plugin-replace';
import sass from 'rollup-plugin-sass';
import react from 'react';
import reactDom from 'react-dom';

export default {
  input: 'src/index.ts',
  watch: {
    include: 'src/**'
  },
  output: {
    dir: 'dist',
    format: 'iife',
    globals: {
      'object-assign': 'Object.assign'
    }
  },
  plugins: [
    copy({
      targets: [
        { src: 'src/manifest.json', dest: 'dist'},
        { src: 'src/app.html', dest: 'dist'},
        { src: 'src/resources', dest: 'dist'}
      ]
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    terser(),
    resolve({
      extensions: ['js', 'ts', 'tsx'],
    }),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        react: Object.keys(react),
        'react-dom': Object.keys(reactDom),
      }
    }),
    typescript(),
    sass({
      output: 'dist/bundle.css',
    })
  ],
}

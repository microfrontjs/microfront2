import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

process.env.NODE_ENV

const e2eConfig = {
	input: 'src/index.ts',
	output: [{
		file: './e2e/microfront.umd.js',
		format: 'umd',
		name: 'microfront'
	}],
	plugins: [
		typescript(),
		resolve(),
		commonjs()
	],
};

const buildConfig = {
	input: 'src/index.ts',
	output: [{
		file: pkg.browser,
		format: 'umd',
		name: 'microfront'
	}, {
		file: pkg.main,
		format: 'cjs'
	}, {
		file: pkg.module,
		format: 'es'
	}],
	plugins: [
		typescript(),
		resolve(),
		commonjs()
	],
};

export default buildConfig;

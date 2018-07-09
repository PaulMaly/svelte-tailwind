import svelte from 'rollup-plugin-svelte';
import getPreprocessor from 'svelte-preprocess';
import resolve from 'rollup-plugin-node-resolve';
import importResolver from 'rollup-plugin-import-resolver';
import commonjs from 'rollup-plugin-commonjs';
import buble from 'rollup-plugin-buble';
import { uglify } from 'rollup-plugin-uglify';
import json from 'rollup-plugin-json';

const production = !process.env.ROLLUP_WATCH;
const preprocess = getPreprocessor({
	transformers: {
        postcss: true
    }
});

export default {
	input: 'src/index.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'dist/main.js'
	},
	plugins: [
		importResolver({ 
			extensions: ['.js', '.html', '.svelte'] 
		}),
		svelte({
			dev: !production,
			skipIntroByDefault: true,
			nestedTransitions: true,
			immutable: true,
			store: true,
			cascade: true,
			preprocess,
			css: css => {
				css.write('dist/main.css');
			},
		}),
		resolve(),
		commonjs(),
		json(),
		production && buble({ include: ['src/**', 'node_modules/svelte/shared.js'] }),
		production && uglify()
	]
};
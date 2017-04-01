import nodeResolve from 'rollup-plugin-node-resolve';
import convertCJS from 'rollup-plugin-commonjs';

export default {
	entry: './src/scripts/index.js',
	format: 'umd',
	moduleName: 'xmlTraverse',
	external: [ 'jsdom', 'fs', 'util', 'path', 'net', 'url' ],
	plugins: [ convertCJS(), nodeResolve({
		jsnext: true,
		main: true,
		preferBuiltins: false
	}) ],
	dest: './src/scripts/bundle.js'
};

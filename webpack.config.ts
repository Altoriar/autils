import path from 'path';
import { fileURLToPath } from 'url';
import type { Configuration } from 'webpack';

// 还原 __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: Configuration = {
	mode: 'development',
	entry: './src/index.ts',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index.js',
		library: {
			name: 'autils',
			type: 'umd',
		},
		clean: true,
	},
	resolve: {
		extensions: ['.ts', '.js', '.tsx'],
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},

	externals: {
		react: 'react',
		'react-dom': 'react-dom',
	},

	devtool: 'source-map',
};

export default config;

const getPreprocessor = require('svelte-preprocess');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const preprocess = getPreprocessor({
	transformers: { 
        postcss: true,
    },
});

module.exports = (env, argv) => {

    const production = argv.mode === 'production';
    
    return {
        output: {
            library: 'app',
            libraryExport: 'default',
        },
        resolve: {
            mainFields: ['svelte', 'browser', 'module', 'main'],
            extensions: ['.js', '.html', '.svelte'],
        },
        devtool: 'source-map',
        module: {
            rules: [{
                test: /\.(html|svelte)$/,
                use: {
                    loader: 'svelte-loader',
                    options: {
                        dev: !production,
                        hotReload: !production,
                        skipIntroByDefault: true,
                        nestedTransitions: true,
                        immutable: true,
                        store: true,
                        cascade: true,
                        preprocess,
                        emitCss: true,
                    },
                },
            }, {
                test: /\.(js|html)$/,
                include: ['src/**', 'node_modules/svelte/shared.js'],
                use: {
                    loader: 'babel-loader',
                },
            }, {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, 
                    'css-loader',
                ],
            },],
        },
        plugins: [
            new MiniCssExtractPlugin('main.css')
        ],
    };
};
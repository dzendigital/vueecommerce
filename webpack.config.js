const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
	mode: 'development',
	entry: { // входные файлы приложения
		user: './src/user/user.js',
		admin: './src/admin/admin.js',
	},
	output: {
		filename: './[name]/[name].bundle.js',  
		path: path.resolve(__dirname, '')
	},
	resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
			},
			{
				test: /\.css$/,
				use: [ 'vue-style-loader', 'css-loader' ]
			}
		],
	},
	plugins:[
		new VueLoaderPlugin()
	],
}

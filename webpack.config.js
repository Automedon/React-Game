const path = require('path');
const webpack= require('webpack');



let buildEntryPoint = function(entryPoint){
	return [
		'webpack-dev-server/client?http://localhost:8080',
		entryPoint
	]
};

module.exports = {
    mode: "development",
	watch: true,
	watchOptions: {
		aggregateTimeout: 300,
		poll: 300
	},
	entry: {
		file1: buildEntryPoint('./src/index.js'),

	},
    plugins: [

		/*	new HtmlWebpackPlugin({
				inject: false,
				template: path.join(__dirname, '/public/index.html')
			}),*/
   ],
    output: {
        filename: '[name].js',

        path: path.resolve(__dirname, './public/dist'),
			library: "[name]"
		},


    module: {

        rules: [
            {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader", options: {
                    presets: ['react','env']
                }, include: path.join(__dirname, 'src')},
						{ test: /\.(gif|png|jpe?g|svg)$/i,
						use: [
							'file-loader',
									{
								loader: 'image-webpack-loader',
								options: {
									bypassOnDebug: true, // webpack@1.x
									disable: true, // webpack@2.x and newer
													},
									},
								 ],
					},
					{
						test: /\.css$/,
						use: [ 'style-loader', 'css-loader' ]
					}
        ]

    },
    devServer: {
			proxy: {
				'/api': 'http://localhost:63342'
			},
        host:'localhost',
        port:8080,
				compress: true,
        hot: true,
        inline: true
    }

};
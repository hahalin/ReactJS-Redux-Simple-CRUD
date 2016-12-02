var webpack = require('webpack');
var path = require('path');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
    entry: {
     	index:__dirname+'/app/App.js'
    },
    output: {
        path: __dirname + "/dist",
        filename: "[name].bundle.js"
    },
    module: {
	    loaders:
	    [
	   		{
    			test: /\.jsx$/,
    			loader: 'babel-loader',
    			exclude: [/node_modules/,/css/],
    			query: {
    				"presets": ['es2015', 'react']
    			}
	   		},
	   		{
    			test: /\.js/,
    			loader: 'babel-loader',
    			exclude: [/node_modules/,/css/],
    			query: {
    				"presets": ['es2015', 'react']
					,"plugins": ["transform-object-rest-spread"]
    			}
	   		},
			{
		      test: /\.css$/, 
		      loader: 'style!css' 
		    },
		    { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
		    { test: /\.jpg$/, loader: "file-loader" }

	   	]
	},
    resolve: {
	    extensions: ['', '.js','jsx','.json', '.coffee','.css'] 
    }
    //,"plugins": ["transform-runtime"]
    ,plugins: [commonsPlugin]
}
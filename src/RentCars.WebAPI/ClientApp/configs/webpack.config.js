const path = require('path');

module.exports = env => {
    return {
        mode: 'development',
        entry: './src/apps/app.tsx',
        output: {
            filename: '[name].js',
            path: path.join(__dirname, '/../../wwwroot/dist'),
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.css', '.json', '.scss'],
        },
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.(png|jpe?g)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                outputPath: 'images',
                            },
                        },
                    ],
                }
            ],
        }
    };
} 
const path = require("path");

module.exports = {
    devtool: "source-map",
    watch: true,

    entry: {
        theme: path.resolve("src/theme.jsx")
    },

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js"
    },

    resolve: {
        modules: [
            path.resolve(__dirname, "src"),
            path.resolve(__dirname, "node_modules")
        ],

        extensions: ["*", ".js", ".jsx"],

        alias: {
            theme: path.resolve(__dirname, "src/"),
            "core-js/es6": "core-js/es"
        }
    },

    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "mobro": "mobro"
    },

    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /(node_modules)/,
            use: {
                loader: "babel-loader",
                options: {
                    plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-proposal-class-properties'],
                    presets: ["@babel/preset-env", "@babel/react"]
                }
            }
        }, {
            test: /\.scss$/,
            use: ["style-loader", "css-loader", "sass-loader"]
        }]
    }
};

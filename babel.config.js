module.exports = {
    presets: [
        ["@babel/preset-env", { targets: { esmodules: true } }],
        "@babel/preset-typescript",
        "@babel/preset-react",
    ],
    env: {
        test: {
            presets: [
                ["@babel/preset-env", { modules: "commonjs" }],
                "@babel/preset-react",
            ],
            plugins: [
                "@babel/plugin-proposal-class-properties",
                "transform-es2015-modules-commonjs",
                "babel-plugin-dynamic-import-node",
                "@babel/plugin-transform-runtime",
            ],
        },
    },
};

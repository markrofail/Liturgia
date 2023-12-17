module.exports = function (api) {
    api.cache(true);
    return {
        presets: ["babel-preset-expo"],
        plugins: [
            "react-native-reanimated/plugin",
            [
                "module-resolver",
                {
                    alias: {
                        "@assets": "./assets",
                    },
                    extensions: [".js", ".jsx", ".ts", ".tsx"],
                },
            ],
        ],
        env: {
            production: {
                plugins: ["react-native-paper/babel"],
            },
        },
    };
};

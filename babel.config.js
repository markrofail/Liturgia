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
                        "@resources": "./resources",
                        "@components": "./src/components",
                        "@": "./src",
                    },
                    extensions: [".js", ".jsx", ".ts", ".tsx"],
                },
            ],
        ],
    };
};

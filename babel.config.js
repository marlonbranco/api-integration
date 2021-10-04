module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                targets: {
                    node: "current",
                },
            },
        ],
        "@babel/preset-typescript",
    ],
    plugins: [
        [
            "module-resolver",
            {
                alias: {
                    "@modules": "./src/modules",
                    "@errors": "./src/shared/errors",
                    "@shared": "./src/shared",
                    "@utils": "./src/shared/utils",
                },
            },
        ],
        "babel-plugin-transform-typescript-metadata",
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        ["@babel/plugin-proposal-class-properties", { loose: true }],
    ],
    ignore: ["**/*.spec.ts", "coverage/", "**/fakes/"],
};

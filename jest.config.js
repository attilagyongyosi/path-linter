module.exports = {
    rootDir: ".",
    moduleDirectories: [
        "node_modules",
        "lib"
    ],
    transform: {
        "^.+\\.ts$": "ts-jest"
    },
    collectCoverage: true,
    coverageDirectory: "./generated/jest-coverage",
    coverageReporters: [ "html", "text-summary" ]
};

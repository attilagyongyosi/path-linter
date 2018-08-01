module.exports = {
    "moduleFileExtensions": [
        "ts",
        "js"
    ],
    "moduleDirectories": [
        "node_modules",
        "lib"
    ],
    "globals": {
        "ts-jest": {
            "tsConfigFile": "./tsconfig.json"
        }
    },
    "testMatch": [
        "**/__tests__/**/*.ispec.ts",
        "**/+(*.)+ispec.+ts"
    ],
    "transform": { "^.+\\.ts$": "ts-jest" },
    "transformIgnorePatterns": [
        "node_modules/(?!@ngrx)"
    ],
    "collectCoverage": true,
    "coverageDirectory": "./generated/jest-coverage",
    "coverageReporters": [ "html" ]
}

const COVERAGE_THRESHOLD = 80;

module.exports = {
    rootDir: '.',
    verbose: true,
    testEnvironment: 'node',
    moduleDirectories: [
        'node_modules',
        'lib'
    ],
    testMatch: [
        '**/__tests__/**/*.spec.ts',
        '**/+(*.)+spec.+ts'
    ],
    transform: { '^.+\\.ts$': 'ts-jest' },
    collectCoverage: true,
    coverageThreshold: {
        global: {
            branches: COVERAGE_THRESHOLD,
            functions: COVERAGE_THRESHOLD,
            lines: COVERAGE_THRESHOLD,
            statements: COVERAGE_THRESHOLD
        }
    },
    collectCoverageFrom: [ 'src/**/*.ts', '!**/cli/**/*.*', '!**/*.ispec.ts', '!src/index.ts' ],
    coverageDirectory: './generated/jest-coverage/unit',
    coverageReporters: [ 'html', 'text-summary', 'json-summary' ]
};

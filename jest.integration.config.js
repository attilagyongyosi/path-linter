const COVERAGE_THRESHOLD = 60;

module.exports = {
    testEnvironment: 'node',
    verbose: true,
    moduleDirectories: [
        'node_modules',
        'lib'
    ],
    testMatch: [
        '**/__tests__/**/*.ispec.ts',
        '**/+(*.)+ispec.+ts'
    ],
    transform: { '^.+\\.ts$': 'ts-jest' },
    collectCoverage: true,
    coverageDirectory: './generated/jest-coverage/integration',
    coverageReporters: [ 'html', 'text-summary', 'json-summary' ],
    coverageThreshold: {
        global: {
            branches: COVERAGE_THRESHOLD,
            functions: COVERAGE_THRESHOLD,
            lines: COVERAGE_THRESHOLD,
            statements: COVERAGE_THRESHOLD
        }
    }
};

module.exports = {
    rootDir: '.',
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
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80
        }
    },
    collectCoverageFrom: [ 'src/**/*.ts', '!**/cli/**/*.*', '!src/index.ts' ],
    coverageDirectory: './generated/jest-coverage/unit',
    coverageReporters: [ 'html', 'text-summary' ]
};

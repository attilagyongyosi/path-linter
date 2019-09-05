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
    collectCoverageFrom: [ 'src/**/*.ts', '!**/__tests__/**/*.ispec.ts' ],
    coverageDirectory: './generated/jest-coverage',
    coverageReporters: [ 'html', 'text-summary' ]
};

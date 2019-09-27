module.exports = {
    testEnvironment: 'node',
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
    coverageReporters: [ 'html', 'text-summary' ]
};

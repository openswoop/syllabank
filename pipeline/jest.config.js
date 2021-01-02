module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      packageJson: 'package.json',
    },
  },
  modulePathIgnorePatterns: ["<rootDir>/lib/"],
  setupFiles: [
    'dotenv/config'
  ]
};
import { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['./dist'],
  testMatch: ['**/tests/**/+([a-zA-Z0-9_-]).@(test|spec).@(js|ts|tsx)'],
};

export default config;

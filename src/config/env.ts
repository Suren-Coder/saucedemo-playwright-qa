// src/config/env.ts
// Environment configuration for test execution

export const ENV = {
  BASE_URL: process.env.BASE_URL || 'https://www.saucedemo.com',
  TIMEOUT: parseInt(process.env.TIMEOUT || '10000'),
};

export const getBaseUrl = (): string => ENV.BASE_URL;
export const getTimeout = (): number => ENV.TIMEOUT;
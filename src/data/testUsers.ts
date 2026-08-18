// src/data/testUsers.ts
// Centralized test user data - data layer

export const TEST_USERS = {
  STANDARD_USER: {
    username: 'standard_user',
    password: 'secret_sauce',
    description: 'Standard user with normal experience',
  },
  LOCKED_OUT_USER: {
    username: 'locked_out_user',
    password: 'secret_sauce',
    description: 'User account that is locked out',
  },
  PROBLEM_USER: {
    username: 'problem_user',
    password: 'secret_sauce',
    description: 'User that experiences issues',
  },
  PERFORMANCE_GLITCH_USER: {
    username: 'performance_glitch_user',
    password: 'secret_sauce',
    description: 'User with performance issues',
  },
};

export const INVALID_CREDENTIALS = {
  VALID_USERNAME_WRONG_PASSWORD: {
    username: 'standard_user',
    password: 'wrong_password',
    description: 'Valid username with wrong password',
  },
  WRONG_USERNAME_VALID_PASSWORD: {
    username: 'wrong_user',
    password: 'secret_sauce',
    description: 'Wrong username with valid password',
  },
};
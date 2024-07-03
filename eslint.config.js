import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    rules: {
      // Stylistic Rules
      'semi': ['error', 'always'], 
      'quotes': ['error', 'single'], 
      'indent': ['error', 2],
      'linebreak-style': ['error', 'unix'], 

      // Best Practices
      'eqeqeq': ['error', 'always'], 
      'no-console': 'off', 

      // Possible Errors
      'no-unused-vars': 'off', 
      'no-undef': 'off', 

      // ES6
      'prefer-const': 'error', 
      'no-var': 'error', 
    }
  }
];

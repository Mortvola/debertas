module.exports = {
  root: true,
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json", "./client-src/tsconfig.json"],
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
  },
  plugins: [
    'react',
    '@typescript-eslint'
  ],
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    // 'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  rules: {
    "react/require-default-props": "off",
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
    "brace-style": ["error", "stroustrup"],
    "react/jsx-props-no-spreading": ["off"],
    "jsx-a11y/click-events-have-key-events": ["off"],
    "jsx-a11y/no-static-element-interactions": ["off"],
    "no-param-reassign": ["error", { "props": false }],
    "jsx-a11y/label-has-associated-control": ["off"],
    "react/jsx-filename-extension": [1, { "extensions": [".tsx", ".jsx"] }],
    'import/extensions': [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: [
          "./tsconfig.json",
          "./client-src/tsconfig.json"
        ],
      },
   }
  },
  // "overrides": [{
  //   "files": ["**/*.ts", "**/*.tsx"],
  //   "extends": [
  //     "airbnb",
  //     "plugin:react/recommended",
  //     "plugin:@typescript-eslint/eslint-recommended",
  //     "plugin:@typescript-eslint/recommended"
  //   ],
  //   "parser": "@typescript-eslint/parser",
  //   // "parserOptions": {
  //   //   "ecmaFeatures": {
  //   //     "jsx": true
  //   //   },
  //   //   "ecmaVersion": 2018,
  //   //   "sourceType": "module",
  //   //   "project": "./tsconfig.json"
  //   // },
  //   "plugins": [
  //     "react",
  //     "@typescript-eslint",
  //     "import"
  //   ],
  //   "rules": {
  //     "brace-style": ["error", "stroustrup"],
  //     "no-param-reassign": ["error", { "props": false }]
  //   }
  // }]
};

module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "airbnb-typescript",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript"
    ],
    "parser": '@typescript-eslint/parser',
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        "react/react-in-jsx-scope": "off",
    },
    "settings": {
        "import/extensions": [".js", ".mjs", ".jsx", ".ts", ".tsx"],
    },
    overrides: [
        {
            files: ['*.ts', '*.tsx'],

            extends: [
                'plugin:@typescript-eslint/recommended',
            ],

            parserOptions: {
                project: ['./tsconfig.json'],
            },
        },
    ],
}

import globals from 'globals';
export default [
 {ignores:['node_modules/**','tests/artifacts/**']},
 {files:['dist/**/*.js','tests/**/*.mjs','scripts/**/*.mjs','server.mjs'],languageOptions:{ecmaVersion:'latest',sourceType:'module',globals:{...globals.browser,...globals.node,...globals.serviceworker}},rules:{'no-undef':'error','no-dupe-args':'error','no-dupe-keys':'error','no-duplicate-case':'error','no-unreachable':'error','valid-typeof':'error','no-constant-condition':'error','no-cond-assign':'error','no-debugger':'error'}}
];

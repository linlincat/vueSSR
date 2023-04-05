module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard'
    // Adjacent JSX elements must be wrapped in an enclosing tag 添加 下方注释代码报错
    // 'standard-with-typescript'
  ],
  overrides: [
  ],
  // parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  plugins: [
    'vue'
  ],
  rules: {
    // 去掉函数()前面的空格
    'space-before-function-paren': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 关闭驼峰命名规则
    'vue/multi-word-component-names': 0
  }
}

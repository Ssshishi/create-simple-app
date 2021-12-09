const vueDeps = {
  deps: [
    'vue@next',
    'vue-router@next',
    'pinia@next',
    'ant-design-vue@next',
    '@vueuse/core',
  ],
  devDeps: [
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint/parser',
    '@vitejs/plugin-vue',
    '@vue/compiler-sfc',
    '@vue/eslint-config-standard',
    '@vue/eslint-config-typescript',
    'eslint-plugin-vue',
    'vue-tsc',
    '@vitejs/plugin-vue-jsx',
  ],
}

const reactDeps = {
  deps: [
    'ahooks',
    'antd',
    'react',
    'react-dom',
    'react-redux',
    'react-router-dom',
    'mobx',
    'mobx-react',
  ],
  devDeps: [
    '@types/react',
    '@types/react-dom',
    '@types/react-router-dom',
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint/parser',
    '@vitejs/plugin-react-refresh',
    'eslint-plugin-react',
    'eslint-plugin-react-hooks',
    'vite-react-jsx',
    '@types/react-redux',
  ],
}

const commonDeps = {
  dep: ['lodash-es', 'axios', 'js-cookie', 'nprogress', 'js-base64'],
  devDep: [
    '@babel/eslint-parser',
    '@types/lodash-es',
    '@types/node',
    '@types/js-cookie',
    '@types/nprogress',
    'prettier',
    'eslint',
    'less',
    'typescript',
    'vite',
    'husky',
    'vite-plugin-compression',
    'vite-plugin-style-import',
    'eslint-plugin-import',
    'eslint-plugin-node',
    'eslint-plugin-promise',
  ],
}

export { commonDeps, reactDeps, vueDeps }

import path from 'path'
import { defineConfig } from 'vite'
import viteCompression from 'vite-plugin-compression'
import styleImport from 'vite-plugin-style-import'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

const url = ''
const isProduction = process.env.NODE_ENV === 'production'

// https://vitejs.dev/config/
export default defineConfig({
  base: isProduction ? './' : '',
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {},
        javascriptEnabled: true,
      },
    },
  },
  server: {
    open: true,
    proxy: {
      '/api': {
        target: url,
        changeOrigin: true,
      },
    },
  },
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'build',
    brotliSize: false,
  },
  plugins: [
    vue(),
    vueJsx(),
    viteCompression(),
    styleImport({
      libs: [
        {
          libraryName: 'ant-design-vue',
          esModule: true,
          resolveStyle: (name) => {
            return `ant-design-vue/es/${name}/style/index`
          },
        },
      ],
    }),
  ],
})

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';
import { resolve } from 'path';
import { viteSingleFile } from "vite-plugin-singlefile"
import legacy from '@vitejs/plugin-legacy'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  build: {
    minify: 'terser', // 使用Terser进行代码压缩
    terserOptions: {
      compress: {
        ecma: 2015 // 使用ES2015压缩选项
      }
    }
  },
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
    legacy({
      targets: ["Android >= 7"],
      modernPolyfills: true
    }),
    viteSingleFile()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 4200,
  },
});

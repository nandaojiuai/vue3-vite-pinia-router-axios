import { defineConfig } from 'vite'
//vue单文件组件识别
import vue from '@vitejs/plugin-vue'
//node文件组件
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
        hmr: true, //vue3 vite配置热更新不用手动刷新
        port: 8080,
        proxy: {
            '/apis': {
                target: 'https://xxxx',
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/apis/, ''),
            },
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@import "@/assets/style/main.scss";'
            }
        }
    },
})

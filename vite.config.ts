import { defineConfig } from 'vite'
//vue单文件组件识别
import vue from '@vitejs/plugin-vue'
//node文件组件
import path from 'path'
//element-plus 按需自动导入配置
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
    ],
    server: {
        hmr: true, //vue3 vite配置热更新不用手动刷新
        port: 8080,
        proxy: {
            '/apis': {
                target: 'https://xxxxx',
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/apis/, ''),
            },
        },
    },
    resolve: {
        //可以使用@来代表src目录
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@import "@/assets/style/main.scss";',
            },
        },
    },
})

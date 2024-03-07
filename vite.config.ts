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
            resolvers:[ElementPlusResolver()],
        }),
        Components({
            resolvers:[ElementPlusResolver()],
        }),
    ],
    resolve: {
        //可以使用@来代表src目录
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

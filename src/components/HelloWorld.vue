<template>
  <div>
    <el-button type="primary">Primary</el-button>
    <h1>{{ mainStore.name }}</h1>
    <h1>{{ mainStore.nameLength }}</h1>
    <p>
      Recommended IDE setup:
      <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
      +
      <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    </p>

    <p>
      See
      <code>README.md</code> for more information.
    </p>

    <p>
      <a href="https://vitejs.dev/guide/features.html" target="_blank">Vite Docs</a>
      |
      <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
    </p>

    <button type="button" @click="count++">count is: {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test hot module replacement.
    </p>
    <p class="test" @click="log">test</p>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useMainStore } from '@/store/main'

defineProps<{ msg: string }>()

const count = ref(0)

const mainStore = useMainStore()

const log = () => {
  console.log(import.meta.env.VITE_APP_WEB_URL)
  // updateName()
}
const updateName = () => {
  // $patch 修改 store 中的数据
  // mainStore.$patch({
  //     name: '名称被修改了,nameLength也随之改变了'
  // })
  mainStore.name = '23'
  mainStore.updataUser('111111ad')
}
</script>
<style lang="scss" scoped>
.test {
  color: $test-color;
}

a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>

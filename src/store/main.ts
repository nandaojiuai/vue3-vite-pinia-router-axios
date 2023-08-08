import { defineStore } from 'pinia'

export const useMainStore = defineStore({
    id: 'mian',
    state: () => ({
        name: '超级管理员'
    }),
    getters: {
        nameLength: (state) => state.name.length,
    },
    actions: {
        updataUser(data: any) {
            console.log(data)
        }
    }
})
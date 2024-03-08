import http from '@/service/api/http'
import * as T from './types'

export const loginApi: T.ILoginApi = {
    login(params) {
        return http.post('/login', params)
    }

}

//http.ts
import axios, { AxiosRequestConfig } from 'axios'
import NProgress from 'nprogress'

// 设置请求头和请求路径
// @ts-ignore
axios.defaults.baseURL = import.meta.env.VITE_APP_WEB_URL
axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.interceptors.request.use(
    (config): AxiosRequestConfig<any> => {
        const token = window.sessionStorage.getItem('token')
        if (token) {
            //@ts-ignore
            config.headers.token = token
        }
        // 打印请求信息
        console.log('请求地址:', config.url)
        console.log('请求方法:', config.method)
        console.log('请求数据:', config.data)
        return config
    },
    (error) => {
        return error
    }
)
// 响应拦截器
axios.interceptors.response.use(
    (response) => {
        // 打印响应信息
        console.log('响应数据:', response.data)
        console.log('响应状态码:', response.status)
        console.log('响应头:', response.headers)

        if (response.data.code === 111) {
            sessionStorage.setItem('token', '')
            // token过期操作
        }
        return response
    },
    (error) => {
        console.error('响应出错:', error)
        return Promise.reject(error)
    }
)

interface ResType<T> {
    code: number
    data?: T
    msg: string
    err?: string
}
interface Http {
    get<T>(url: string, params?: unknown): Promise<ResType<T>>
    post<T>(url: string, params?: unknown): Promise<ResType<T>>
    upload<T>(url: string, params: unknown): Promise<ResType<T>>
    download(url: string): void
}

const http: Http = {
    get(url, params) {
        return new Promise((resolve, reject) => {
            NProgress.start()
            axios
                .get(url, { params })
                .then((res) => {
                    NProgress.done()
                    resolve(res.data)
                })
                .catch((err) => {
                    NProgress.done()
                    reject(err.data)
                })
        })
    },
    post(url, params) {
        return new Promise((resolve, reject) => {
            NProgress.start()
            axios
                .post(url, JSON.stringify(params))
                .then((res) => {
                    NProgress.done()
                    resolve(res.data)
                })
                .catch((err) => {
                    NProgress.done()
                    reject(err.data)
                })
        })
    },
    upload(url, file) {
        return new Promise((resolve, reject) => {
            NProgress.start()
            axios
                .post(url, file, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                })
                .then((res) => {
                    NProgress.done()
                    resolve(res.data)
                })
                .catch((err) => {
                    NProgress.done()
                    reject(err.data)
                })
        })
    },
    download(url) {
        const iframe = document.createElement('iframe')
        iframe.style.display = 'none'
        iframe.src = url
        iframe.onload = function () {
            document.body.removeChild(iframe)
        }
        document.body.appendChild(iframe)
    },
}
export default http

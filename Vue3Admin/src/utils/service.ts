import axios, {type AxiosInstance, type AxiosRequestConfig} from 'axios'
import {getReFlushToken, getToken, setToken} from "@/utils/cache/cookies";
import {merge} from "lodash-es";
import {useUserStoreHook} from "@/stores/modules/users";
import router from "@/router";
/**
 * @description 退出登录 并删除token
 * @author MuYuan
 */
const logout = () => {
    return useUserStoreHook().logout()
}
/**
 * @description 此处创建一个axios实例，在这里进行业务逻辑所需的中间件配置
 * @author MuYuan
 */
const createService = () => {
    const app = axios.create()
    app.interceptors.response.use(response => {
        // 成功响应，正常处理
        return response;
    }, async error => {
        if (error.response) {
            // 有响应，但返回了错误状态码
            switch (error.response.status) {
                case 401:
                    setToken(error.response.data.token)
                    useUserStoreHook().token = <string>getToken()
                    const result = await request({
                        method: error.config.method, url: error.config.url, data: error.config.data
                    })
                    return Promise.resolve(result)
                // 其他错误状态码处理
                default:
                    logout()
                   await router.replace('/login')
            }
            return Promise.reject(error);
        } else if (error.request) {
            // 请求发送，但没有收到响应
            if (error.message.includes('net::ERR_CONNECTION_REFUSED')) {
                // 处理连接被拒绝的情况，如重新连接、提示用户检查网络等
            }
            return Promise.reject(error);
        } else {
            // 请求配置错误或其他未知错误
            console.error('Request configuration error:', error.message);
            return Promise.reject(error);
        }
    });
    return app
}
/**
 * @description 创建请求实例 返回一个axios请求实例
 * @param service 一个AxiosInstance实例
 * @author MuYuan
 */
const createRequest = (service: AxiosInstance) => {
    return (config: AxiosRequestConfig) => {
        const token = getToken()
        const defaultConfig = {
            headers: {
                Authorization: token ? `Bearer ${token}` : undefined, 'x-refresh-token': getReFlushToken()
            }, timeout: 5000, baseURL: 'http://localhost:3000/', data: {}
        }
        const mergeConfig = merge(defaultConfig, config)
        return service(mergeConfig)
    }
}
/**
 * @description 创建axios实例常量
 * @param service AxiosInstance实例
 * @author MuYuan
 */
const service = createService()
/**
 * @description 导出可用的请求方法
 * @param config 需要发起请求的config
 * @author MuYuan
 */
export const request = createRequest(service)
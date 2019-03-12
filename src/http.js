import axios from 'axios'
import Vue from 'vue'
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if (config.url.indexOf('/login') == -1) {
        config.headers.Authorization = sessionStorage.token
    }
    return config
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    Vue.prototype.$message(response.data.meta.msg)
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
}); 
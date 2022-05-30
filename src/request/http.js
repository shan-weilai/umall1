import axios from "axios"
import qs from "qs"
import Vue from "vue"
import { errorAlert } from "@/utils/alert"

//开发环境
if(process.env.NODE_ENV =='development'){
    Vue.prototype.$pre="http://localhost:3000"
}
//生产环境
if(process.env.NODE_ENV == 'production'){
    Vue.prototype.$pre=""
}

//请求拦截
axios.interceptors.request.use(config=>{
    return config
})

//响应拦截
axios.interceptors.response.use(res=>{
    console.log("请求地址：" + res.config.url)
    console.log(res)

    //统一处理失败
    if(res.data.code!=200){
        errorAlert(res.data.msg)
    }
    return res
})


//get
export let get=(url,params={})=>{
    return new Promise((resolve,reject)=>{
      axios.get(url,{
          params
      }).then(res=>{
          resolve(res)
      })  
    })
}

//post
export let post =(url,params,isFile=false)=>{
    let data=null;
    if(isFile){
        data = new FormData()
        for(let i in params){
            data.append(i,params[i])
        }
    }else{
        data= qs.stringify(params)
    }

    return new Promise((resolve,reject)=>{
        axios.post(url,data).then(res=>{
            resolve(res)
        })
    })
}
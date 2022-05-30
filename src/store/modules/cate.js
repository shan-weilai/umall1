import {reqCatelist} from "../../request/app" 
let state={
    list:[]
}
let mutations={
    changeList(state,arr){
        state.list=arr;
    }
}

let actions={
    reqList(context){
        reqCatelist({istree:true}).then(res=>{
           if(res.data.code==200){
               context.commit("changeList",res.data.list)
           }
        })
    }
}

let getters={
        list(state){
            return state.list
        }
}


export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}
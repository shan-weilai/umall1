import Vue from "vue"

import delBtn from "./delBtn.vue"
let components={
    delBtn
}

for (let key in components){
    Vue.component(key,components[key])
}
import Vue from "vue"


let filters = {

}

for(let key in filters){
    Vue.filter(key,filters[key])
}
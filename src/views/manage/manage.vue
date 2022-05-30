<template>
  <div>
    <el-button type="primary" @click="willAdd">添加 </el-button>

    <!-- 列表 -->
    <v-list :list="list" @willdie="willdie" @init="init"></v-list>
    <!-- 表单 -->
    <v-from :info="info" ref="from" :list="list" @init="init"></v-from>

    <el-pagination layout="prev, pager, next" 
    :total="this.total"
     @current-change="changePage"
    :page-size="pageSize"
    >
     </el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import vList from "./components/vlist.vue";
import vFrom from "./components/vfrom.vue";
import {  reqManagecount, reqManagelist, reqMenulist } from "@/request/app";
export default {
  components: {
    vList,
    vFrom,
  },
  props: [],
  data() {
    return {
      info: {
        isshow: false,
        isAdd: true, //判断弹框是添加还是编辑
      },
      //  列表数据初始值
      list: [],
      //总数
       total:0,
      //每页展示条数
      pageSize:2,
      //当前页数
      page:1
      
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapActions({}),

    willAdd() {
      this.info.isshow = true;
      this.info.isAdd = true;
    },
    //改变页码
    changePage(e){
        this.page=e
        this.liebiao()
    },
    //获取总数
    zong(){
        reqManagecount().then(res=>{
            if(res.data.code==200){
                this.total = res.data.list[0].total
                console.log('获取总数')
                console.log( res)
            }
        })
    },
    // 列表
    liebiao(){
           reqManagelist({ size:this.pageSize , page:this.page }).then((res) => {
        if (res.data.code == 200) {
            if(res.data.list==null &&res.page!==1){
                this.page--
                this.liebiao()
                return
            }

          this.list = res.data.list ? res.data.list : [];
          //如果有数据就获取到数据，没有数据就赋值一个空数组
        }
      });
    },

    //请求列表数据方法
    init() {
        this.zong()
        this.liebiao()
    },

    willdie(uid) {
      this.info.isshow = true;
      this.info.isAdd = false;
      //操作vForm
      this.$refs.from.getOne(uid);
    },
  },

  computed: {
    ...mapGetters({}),
  },
};
</script>
<style scoped lang='less'>
@import "../../less/index.less";
</style>
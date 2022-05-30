<template>
  <div>
    <el-button type="primary" @click="willAdd">添加 </el-button>

    <!-- 列表 -->
    <v-list :list="list" @willdie="willdie" @init="init"></v-list>
    <!-- 表单 -->
    <v-from :info="info" ref="from" :list="list" @init="init" ></v-from>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import vList from "./components/vlist.vue";
import vFrom from "./components/vfrom.vue";
import { reqMenulist } from "@/request/app";
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
        isAdd:true,//判断弹框是添加还是编辑
      },
      //  列表数据初始值
      list: [],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapActions({}),

    willAdd() {
      this.info.isshow = true;
      this.info.isAdd=true;
    },
    //请求列表数据方法
    init() {
      //请求列表数据
      reqMenulist({ istree: true }).then((res) => {
        if (res.data.code == 200) {
          this.list = res.data.list ? res.data.list : [];
          //如果有数据就获取到数据，没有数据就赋值一个空数组
        }
      });
    },
    willdie(id){
      this.info.isshow=true;
      this.info.isAdd=false;
    //操作vForm
    this.$refs.from.getOne(id)
    }
  },
  computed: {
    ...mapGetters({}),
  },
};
</script>
<style scoped lang='less'>
@import "../../less/index.less";
</style>
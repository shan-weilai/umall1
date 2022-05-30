<template>
  <div>
      <!-- 弹框 -->

    <el-dialog :title="info.isAdd?'菜单添加' : '菜单编辑'" :visible.sync="info.isshow" @closed="closed">
  <el-form :model="form">

          {{form}}
    <el-form-item label="菜单名称" label-width="120px">
      <el-input v-model="form.title" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="上级菜单" label-width="120px">
     <el-select v-model="form.pid" @change="changePid" >
        <el-option label="请选择"  disabled value=""> </el-option>
         <el-option label="顶级菜单" :value="0"> </el-option>        
         <el-option v-for="item in list" :key="item.id" :label="item.title" :value="item.id"> </el-option>            
     </el-select> 
    </el-form-item>
    <el-form-item label="菜单类型" label-width="120px">
        <el-radio v-model="form.type" disabled :label="1">目录</el-radio>
        <el-radio v-model="form.type" disabled :label="2">菜单</el-radio>
    </el-form-item>  
     <el-form-item label="菜单图标" label-width="120px" v-if="form.type==1">
     <el-select v-model="form.icon" >
         <el-option label="请选择"  disabled value=""> </el-option>
         <el-option :value="item" v-for="item in icons" :key="item"   >
             <i :class="item"></i>
         </el-option>   
     </el-select>  
    </el-form-item>

    <el-form-item label="菜单地址" label-width="120px" v-else>
     <el-select v-model="form.url" >
         <el-option   disabled value="">请选择 </el-option>
         <el-option v-for="item in IndexRoutes" :key="item.path" :label="item.meta.title" :value="'/' +item.path"> </el-option>   
     </el-select> 
    </el-form-item>
     <el-form-item label="状态" label-width="120px">
         <el-switch v-model="form.status" 
          :active-value="1" :inactive-value="2" 
         > 
         </el-switch>

    </el-form-item>


  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="cancel()">取 消</el-button>
    <el-button type="primary" @click="add" v-if="info.isAdd">添加</el-button>
    <el-button type="primary" v-else @click="update">修改</el-button>
  </div>
</el-dialog>

  </div>
</template>
<script>
import { reqMenuadd, reqMenuedit, reqMenuinfo } from '@/request/app';
import { mapGetters, mapActions } from "vuex";
import {IndexRoutes} from "../../../router/index";
import { successAlert } from '@/utils/alert';
export default {
  props: ["info","list"],
  data() {
    return {    
        form:{
           pid:'',
           title:'',
           icon:'',
           type:"",
           url:'',
           status:1
        },
        //图标集合
        icons:[
           "el-icon-eleme",
            "el-icon-s-tools",
            "el-icon-delete-solid",
            "el-icon-user",
            "el-icon-star-off",
            "el-icon-phone"
        ],
        //生命二级路由集合
        IndexRoutes,
        
    };
  },
  mounted() {},
  methods: {
    ...mapActions({}),
    concel(){
        this.info.isshow=false
    },

    //清空
    empty(){
      this.form={
        pid:'',
           title:'',
           icon:'',
           type:"",
           url:'',
           status:1
      }
    },


    //添加
    add(){
      reqMenuadd(this.form).then(res=>{
        if(res.data.code==200){
          //弹成功的弹框
          successAlert(res.data.msg)
          //清空数据
          this.empty()
          //弹框消失
          this.info.isshow=false
          //列表重新请求
          this.$emit("init")
        }
      })
    },

    //目录或是菜单
    changePid(){
     this.form.type = this.form.pid==0?1:2;
    },

      //获取一条数据
    getOne(id){
      // console.log('我要获取一条数据')
      reqMenuinfo({id:id}).then(res=>{
        if(res.data.code==200){
          this.form = res.data.list
          //此时数据中没有id,根据需求添加id
          this.form.id = id;
        }
      })
    },
    //修改
    update(){
      reqMenuedit(this.form).then(res=>{
        if(res.data.code==200){
         //弹成功的弹框
          successAlert(res.data.msg)
          //清空数据
          this.empty()
          //弹框消失
          this.info.isshow=false
          //列表重新请求
          this.$emit("init")

        }
      })
    }, 

    //如果是编辑的话，关闭弹框时应把弹框里的数据清楚
    closed(){
      if(!this.isAdd){
        this.empty()
      }
    }
  },
  computed: {
    ...mapGetters({}),
  },
};
</script>
<style scoped lang='less'>
@import "../../../less/index.less";
</style>
<template>
  <div>
    <!-- 表格 -->
    <el-table
    :data="list"
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"
    border
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
    <el-table-column prop="id" label="角色编号" sortable  width="180">  </el-table-column>
    <el-table-column  prop="rolename"  label="角色名称"  sortable   width="180"> </el-table-column>
   
    <el-table-column prop="status" label="状态"> 
         <template slot-scope="scope">
        <el-button v-if="scope.row.status==1" type="primary">编辑</el-button>
        <el-button v-else type="info">删除</el-button>
      </template>
    </el-table-column>
    <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
        <el-button type="primary" @click="willdie(scope.row.id)">编辑</el-button>
        <del-btn @delete="del(scope.row.id)" ></del-btn>
      </template>
    </el-table-column>
    
  </el-table>
  </div>
</template>

<script>
import {  reqRoledelete } from '@/request/app';
import {mapGetters,mapActions } from "vuex";
import { successAlert } from '@/utils/alert';
export default {
  props:["list"],
  data(){
    return {
       
    };
  },
  mounted(){

  },
  methods:{
    ...mapActions({

    }),
    willdie(id){
      this.$emit("willdie",id)
    },
    // 删除
    del(id){
        reqRoledelete({id:id}).then(res=>{
            if(res.data.code==200){
                successAlert('删除成功')
                this.$emit('init')
            }
        })
    }
   
  },
  computed:{
    ...mapGetters({

    })
  }
}
</script>

<style scoped lang="less">
// @import "../../../less/index.less"
@import '../../../less/index.less';
</style>
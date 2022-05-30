<template>
  <div>
    <!-- 表格 -->
    <el-table
    :data="list"
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"
    border
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
    <el-table-column prop="id" label="分类编号" sortable  width="180">  </el-table-column>
    <el-table-column  prop="catename"  label="分类名称"  sortable   width="180"> </el-table-column>
    <el-table-column   label="图片"  sortable   width="180"> 
        <template slot-scope="scope">
            <img v-if="scope.row.img!=='null'" :src="$pre+scope.row.img" alt="">
        </template>
    </el-table-column>

   
    <el-table-column prop="status" label="状态"> 
         <template slot-scope="scope">
        <el-button v-if="scope.row.status==1" type="primary">是</el-button>
        <el-button v-else type="info">否</el-button>
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
import {  reqCatedelete } from '@/request/app';
import {mapGetters,mapActions } from "vuex";
import { successAlert } from '@/utils/alert';
export default {
  props:["list"],
  data(){
    return {
       
    };
  },
  mounted(){
    this.reqList()
  },
  methods:{
    ...mapActions({
      "reqList":"cate/reqList"
    }),
    //编辑
    willdie(id){
      this.$emit("willdie",id)
    },
    // 删除
    del(id){
        reqCatedelete({id:id}).then(res=>{
            if(res.data.code==200){
                successAlert('删除成功')
                // this.$emit('init')
                this.reqList()
            }
        })
    }
   
  },
  computed:{
    ...mapGetters({
       "list":"cate/list"
    })
  }
}
</script>

<style scoped lang="less">
// @import "../../../less/index.less"
@import '../../../less/index.less';
img{
    width: 80px;
    height: 80px;
}
</style>
<template>
<div>
    <el-button type="danger" @click="del">删除 </el-button>
</div>
</template>
<script>

export default {
props: [],
data(){
 return {};
},

 methods: {
      del(){
      this.$confirm('你确定要删除吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        //通知父组件，执行删除方法，指定删除哪一条信息
        this.$emit('delete')
      
        
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }
},

}
</script>
<style scoped>

</style>
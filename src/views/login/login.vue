<template>
  <div class="tan">
    <div class="cen">
      <h3>登录</h3>
      <div class="input">
        <el-input></el-input>
      </div>
      <div class="input">
        <el-input></el-input>
      </div>
      <div class="deng">
        <el-button type="primary" @click="deng">登录 </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    deng(){
      this.$router.push('/home')
    }
  }
};
</script>

<style scoped lang="less">
@import "../../less/index.less";
.tan {
  width: 100vw;
  height: 100vh;
  position: relative;
  background: linear-gradient(@primary, @primary2);
}
.tan .cen {
  width: 200px;
  height: 200px;
  background: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  padding: 20px;
}
.cen h3 {
  text-align: center;
}

.cen .input {
  text-align: center;
  padding-top: 10px;
}
.deng {
  text-align: center;
  padding-top: 10px;
}
</style>
<template>
  <div>
    <!-- 弹框 -->

    <el-dialog
      :title="info.isAdd ? '管理员添加' : '管理员编辑'"
      :visible.sync="info.isshow"
      @closed="closed"
    >
      <el-form :model="form">
        {{ form }}

        <el-form-item label="所属角色" label-width="120px">
          <el-select v-model="form.roleid" >
            <el-option label="请选择" disabled value=""> </el-option>
            <el-option v-for="item in roleList" :key="item.id" :label="item.rolename" :value="item.id"> </el-option>
            <!-- <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            >
            </el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" label-width="120px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="状态" label-width="120px">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd"
          >添加</el-button
        >
        <el-button type="primary" v-else @click="update">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  reqManageadd,
  reqManagedit,
  reqManageinfo,
  reqRolelist,
  reqSpecsadd,
  reqSpecsedit,
  reqSpecsinfo,
} from "@/request/app";
import { mapGetters, mapActions } from "vuex";
import { successAlert } from "@/utils/alert";
export default {
  props: ["info", "list"],
  data() {
    return {
      roleList: [],
      form: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
     
    };
  },
  mounted() {
    //请菜单管理的数据
    reqRolelist().then((res) => {
      if (res.data.code == 200) {
        this.roleList = res.data.list;
      }
    });
  },
  methods: {
    ...mapActions({}),
    concel() {
      this.info.isshow = false;
    },

    //清空
    empty() {
      this.form = {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      };
      
    },

    //添加
    add() {
      reqSpecsadd(this.form).then((res) => {
        if (res.data.code == 200) {
          //弹成功的弹框
          successAlert(res.data.msg);
          //清空数据
          this.empty();
          //弹框消失
          this.info.isshow = false;
          //列表重新请求
          this.$emit("init");
        }
      });
    },

 

    //获取一条数据
    getOne(uid) {
      // console.log('我要获取一条数据')
      reqSpecsinfo({ uid: uid }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.password = ""
        }
      });
    },
    //修改
    update() {
      reqSpecsedit(this.form).then((res) => {
        if (res.data.code == 200) {
          //弹成功的弹框
          successAlert(res.data.msg);
          //清空数据
          this.empty();
          //弹框消失
          this.info.isshow = false;
          //列表重新请求
          this.$emit("init");
        }
      });
    },

    //如果是编辑的话，关闭弹框时应把弹框里的数据清楚
    closed() {
      if (!this.isAdd) {
        this.empty();
      }
    },
  },
  computed: {
    ...mapGetters({}),
  },
};
</script>
<style scoped lang='less'>
@import "../../../less/index.less";
</style>
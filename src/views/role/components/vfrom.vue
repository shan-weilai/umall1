<template>
  <div>
    <!-- 弹框 -->

    <el-dialog
      :title="info.isAdd ? '菜单角色' : '角色编辑'"
      :visible.sync="info.isshow"
      @closed="closed"
    >
      <el-form :model="form">
        {{ form }}
        <el-form-item label="角色名称" label-width="120px">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="角色权限" label-width="120px">
          <!-- 树形控件 -->
          <el-tree
            :data="menuList"
            show-checkbox
            node-key="id"
            ref="tree"
            :props="defaultProps"
          >
          </el-tree>
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
import {  reqMenulist, reqRoleadd, reqRoleedit, reqRoleinfo } from "@/request/app";
import { mapGetters, mapActions } from "vuex";
import { successAlert } from "@/utils/alert";
export default {
  props: ["info", "list"],
  data() {
    return {
   
      menuList:[],
      form: {
          rolename: "",
          menus: "",
          status: 1,
        },
         defaultProps: {
          children: 'children',
          label: 'title'
        },
    };
  },
  mounted(){
    //请菜单管理的数据
    reqMenulist().then(res=>{
      if(res.data.code==200){
        this.menuList = res.data.list
      }
    })
  },
  methods: {
    ...mapActions({}),
    concel() {
      this.info.isshow = false;
    },

    //清空
    empty() {
      this.form = {
        rolename: "",
          menus: "",
          status: 1,
      };
      //因为树形控件没有双向数据绑定，所以需要单独操作清空数据
     this.$refs.tree.setCheckedKeys([]);
    },

    //添加
    add() {
      /*
      树形控件没有v-model双向数据绑定，所以需要提前将数据处理好，在统一发请求
      */
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys())

      reqRoleadd(this.form).then((res) => {
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
    getOne(id) {
      // console.log('我要获取一条数据')
      reqRoleinfo({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          //此时数据中没有id,根据需求添加id
          this.form.id = id;
          //为树形控件赋值
          this.$refs.tree.setCheckedKeys(JSON.parse(this.form.menus))
        }
      });
    },
    //修改
    update() {
      /*
      先取出树形控件的数据，然后重新赋值，之后再点击修改
      */
     this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys())
      reqRoleedit(this.form).then((res) => {
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
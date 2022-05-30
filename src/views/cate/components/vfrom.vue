<template>
  <div>
    <!-- 弹框 -->

    <el-dialog
      :title="info.isAdd ? '商品分类添加' : '商品分类编辑'"
      :visible.sync="info.isshow"
      @closed="closed"
    >
      <el-form :model="form">
        {{ form }}

        <el-form-item label="上级分类" label-width="120px">
          <el-select v-model="form.pid">
            <el-option label="请选择" disabled value=""> </el-option>
            <el-option label="顶级分类" :value="0"> </el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" label-width="120px">
          <el-input v-model="form.catename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="120px" v-if="form.pid !== 0">
          <!-- 原生js上传图片 -->
          <!-- <div class="my-upload">
                <div class="add"> +</div>              
                <img v-if="imgUrl" :src="imgUrl" alt="">
                 <input v-if="info.isshow" type="file" class="ipt" @click="changeImg">
            </div> -->

          <!-- element-ui -->
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg2"
            
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
import { reqCateadd, reqCatedit, reqCateinfo } from "@/request/app";
import { mapGetters, mapActions } from "vuex";
import { successAlert } from "@/utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      imgUrl: "", //图片地址
      form: {
        pid: "",
        catename: "",
        img: null,
        status: 1
      },
    };
  },
  mounted() {},
  methods: {
    ...mapActions({
      reqList:"reqList"
    }),
    concel() {
      this.info.isshow = false;
    },

    // changeImg(e) {
    //   //图片文件放在事件对象的target.files上面
    //   //取出图片文件，赋值给file
    //   let file = e.target.files[0];
    //   //同时将文件从input放到img上，将选中的图片展示出来
    //   //原生js上的方法，将图片转为地址
    //   var binaryData = [];
    //   binaryData.push(file);
    //   this.imgUrl = window.URL.createObjectURL(
    //     new Blob(binaryData, { type: "application/zip" })
    //   );

    //   //将图片文件赋值给数据中的img,传给后端
    //   this.form.img = file;
    // },


    // element-ui上传文件
    changeImg2(e){
        console.log(e)
        let file = e.raw;
        this.imgUrl=URL.createObjectURL(file);
        this.form.img=file;
    },

    //清空
    empty() {
      this.imgUrl = "";
      this.form = {
        pid: "",
        catename: "",
        img: null,
        status: 1
      };
    },

    //添加
    add() {
        console.log(1)
      reqCateadd(this.form).then((res) => {
          console.log(2)
        if (res.data.code == 200) {
            console.log(3)
          //弹成功的弹框
          successAlert(res.data.msg);
          //清空数据
          this.empty();
          //弹框消失
          this.info.isshow = false;
          //列表重新请求
          // this.$emit("init");
          this.reqList()
        }
      });
    console.log(4)
    },

    //获取一条数据
    getOne(id) {
      // console.log('我要获取一条数据')
      reqCateinfo({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          
          this.imgUrl = this.$pre + this.form.img;
          this.form.id=id;
        }
      });
    },
    //修改
    update() {
      reqCatedit(this.form).then((res) => {
        if (res.data.code == 200) {
          //弹成功的弹框
          successAlert(res.data.msg);
          //清空数据
          this.empty();
          //弹框消失
          this.info.isshow = false;
          //列表重新请求
          // this.$emit("init");
          this.reqList()
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
    ...mapGetters({
       "list":"cate/list"
    }),
  },
};
</script>
<style scoped lang='less'>
@import "../../../less/index.less";
.my-upload {
  width: 100px;
  height: 100px;
  border: dashed 1px #666;
  position: relative;
}
.my-upload .add {
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  font-size: 30px;
  color: #666;
  z-index: 1;
}
.my-upload .ipt {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0; //透明度
  cursor: pointer; //改变鼠标形状
}

.my-upload img {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 0;
  left: 0;
}


 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
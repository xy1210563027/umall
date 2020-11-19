<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form :model="form" :rules="rules">
        <el-form-item label="手机号" label-width="120px" prop="phone">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" label-width="120px" prop="nickname">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px" prop="password">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="120px" porp="status">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { reqMenuInfo, reqEdit, reqViplist } from "../../../utils/http";
import { successAlert } from "../../../utils/alert";

export default {
  props: ["info"],

  data() {
    return {
      rules:{
        phone:[
          {required: true, message: "请输入手机号", trigger: "change"}
        ],
        nickname:[
          {required: true, message: "请输入昵称", trigger: "change"}
        ],
        password:[
          {required: true, message: "留空则不修改", trigger: "change"}
        ]
        
      },
      // from 初始值
      form: {
        phone: "",
        nickname: "",
        password: "",
        status: 2
      }
    };
  },
  methods: {
    // 获取一条
    getOne(uid) {
      reqMenuInfo(uid).then(res => {
        //此时form上是没有id的
        this.form = res.data.list;
        //补id
        this.form.uid = uid;
      });
    },
    // 数据清空
    empty(){
      this.form={
         phone: "",
        nickname: "",
        password: "",
        status: 2
      }
    },
     //6.点了取消
    cancel() {
      this.info.isshow = false;
    },
    // 点击修改按钮
    update(){
      reqEdit(this.form).then(res=>{
         if (res.data.code == 200) {
          //弹成功
          successAlert("修改成功");
          //弹框消失
          this.cancel();
            //数据清空
          this.empty();
        }
      })
    }
  },
  check() {
      return new Promise((resolve, reject) => {
        //验证
        if (this.user.first_cateid === "") {
          errorAlert("请输入手机号");
          return;
        }
        if (this.user.second_cateid === "") {
          errorAlert("请输入昵称");
          return;
        }
        if (this.user.goodsname === "") {
          errorAlert("留空则不修改");
          return;
        }
        resolve();
        
      });
      
    },
};
</script>

<style>
</style>
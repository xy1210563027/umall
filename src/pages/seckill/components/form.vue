<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="seck">
        <el-form-item label="活动名称" label-width="150px">
          <el-input v-model="seck.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动期限" label-width="150px">
          <el-date-picker
            v-model="timevalue"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="timestamp"
          ></el-date-picker>
        </el-form-item>
        <!-- 1.渲染一级分类 -->
        <el-form-item label="一级分类" label-width="120px">
          <el-select placeholder="请选择一级分类" v-model="seck.first_cateid" @change="changeFirst">
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="120px">
          <el-select placeholder="请选择二级分类" v-model="seck.second_cateid" @change="changeSecond">
            <!-- 渲染二级分类 -->
            <el-option
              v-for="item in secondList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 商品需要一级限制二级，二级限制商品 -->
        <el-form-item label="商品" label-width="120px">
          <el-select v-model="seck.goodsid" placeholder="请选择">
            <el-option
              v-for="item in goodsArr"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" label-width="150px">
          <el-switch v-model="seck.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="info.title=='秒杀添加'" @click="add">添 加</el-button>
        <el-button type="primary" v-else @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {
  reqSecksAdd,
  //分类渲染列表
  reqcateList,
  reqSecksDetail,
  reqgoodsList,
  reqSecksUpdate,
} from "../../../utils/http";
import { successAlert, errorAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      seck: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: "1",
      },
      //用来放时间的
      timevalue: [],
      //放二级分类的
      secondList: [],
      //用来存放商品
      goodsArr: [],
    };
  },

  computed: {
    ...mapGetters({
      //分类的
      cateList: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      //分类的请求
      reqCateList: "cate/reqList",
      //秒杀的请求
      reqList: "seckill/reqList",
    }),
    empty() {
      this.seck = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: "1",
      };
      (this.timevalue = []), (this.secondList = []);
      this.goodsArr = [];
    },
    getOne(id) {
      this.timevalue = [];
      reqSecksDetail(id).then((res) => {
        if (res.data.code == 200) {
          this.seck = res.data.list;
          this.seck.id = id;
          this.timevalue.push(this.seck.begintime, this.seck.endtime);
          //渲染分类,要不分类为空
          reqcateList({ pid: this.seck.first_cateid }).then((res) => {
            if (res.data.code === 200) {
              this.secondList = res.data.list;
            }
          });
          //渲染商品
          reqgoodsList({
            //接口说明中有
            fid: this.seck.first_cateid,
            sid: this.seck.second_cateid,
          }).then((res) => {
            this.goodsArr = res.data.list;
          });
        }
      });
    },
    cancel() {
      this.info.isshow = false;
    },
    //一级分类选中以后渲染二级分类
    changeFirst() {
      this.seck.second_cateid = "";
      this.seck.goodsid = "";
      this.getSecondList();
    },
    //请求二级分类
    getSecondList() {
      //7.获取二级分类list，需要传一个pid过去，来获取当前选中的二级分类，注意这里的reqcateList用的是引入进来的http.js中没用仓库中的，因为仓库中是一下子都请求完毕
      reqcateList({ pid: this.seck.first_cateid }).then((res) => {
        this.secondList = res.data.list;
      });
    },
    changeSecond() {
      //二级分类发生改变的时候请求商品
      this.seck.goodsid = "";
      reqgoodsList({
        //接口说明中有
        fid: this.seck.first_cateid,
        sid: this.seck.second_cateid,
      }).then((res) => {
        this.goodsArr = res.data.list;
      });
    },
    add() {
      this.seck.begintime = this.timevalue[0];
      this.seck.endtime = this.timevalue[1];
      reqSecksAdd(this.seck).then((res) => {
        //添加成功以后应该
        successAlert("添加成功");
        this.cancel();
        this.empty();
        this.reqList();
      });
    },
    update() {
      //点了更新以后
      this.seck.begintime = this.timevalue[0];
      this.seck.endtime = this.timevalue[1];
      reqSecksUpdate(this.seck).then((res) => {
        if (res.data.code == 200) {
          successAlert("更新成功");
          this.cancel();
          this.empty();
          this.reqList();
        }
      });
    },
    closed() {
      if (this.info.title === "编辑商品") {
        this.empty();
      }
    },
  },
  mounted() {
    //一进来先把一级分类给请求了
    this.reqCateList();
  },
};
</script>
<style>
</style>
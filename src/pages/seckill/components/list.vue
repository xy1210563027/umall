<template>
  <div>
    <el-table
      :data="list?list:[]"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="title" label="活动名称"></el-table-column>

      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
            <el-button type="info" v-else>禁用</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
            <del-btn @confirm="del(scope.row.id)"></del-btn>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqSecksDel } from "../../../utils/http";
import { successAlert, errorAlert } from "../../../utils/alert";
export default {
  computed: {
    ...mapGetters({
      list: "seckill/list",
    }),
  },
  methods: {
    ...mapActions({
      reqList: "seckill/reqList",
    }),
    del(id) {
      reqSecksDel(id).then((res) => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          this.reqList();
        }
      });
    },
    edit(id) {
      this.$emit("edit", id);
    },
  },
  mounted() {
      //引进来就刷新
      this.reqList()
  },
};
</script>
<style>
</style>
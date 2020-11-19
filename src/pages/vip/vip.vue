<template>
  <div>
    <v-list :list="list" :init="init" @edit="edit"></v-list>
    <v-form :info="info" @init="init" ref="form"></v-form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import vList from "./components/list.vue";
import vForm from "./components/form.vue";
import { reqViplist } from "../../utils/http";
export default {
  components: {
    vList,
    vForm
  },
  data() {
    return {
      // 弹框默认隐藏
      info: {
        isshow: false,
        title: ""
      },
      //列表数据初始值
      list: []
    };
  },
  methods: {
    ...mapActions({}),
    //获取列表数据发请求
    init() {
      //获取列表数据
      reqViplist().then(res => {
        this.list = res.data.list;
      });
    },
    // 处理编辑
    edit(uid) {
      this.info = {
        isshow: true,
        title: "添加会员"
      };
      this.$refs.form.getOne(uid);
    }
  },
  mounted() {
    //20.一进来发请求
    this.init();
  }
};
</script>
<style scoped>
</style>
<template>
  <div>
    
    <v-list :list="list" :init="init" ></v-list>
    <v-form ></v-form>
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
 
      //列表数据初始值
      list: [],
    };
  },
  computed: {
    ...mapGetters({})
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
  },
  mounted() {
    //20.一进来发请求
    this.init();
  }
};
</script>
<style scoped>
</style>
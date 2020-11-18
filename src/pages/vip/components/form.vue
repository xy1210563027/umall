<template>
  <div>
       <el-dialog   :visible.sync="dialogTableVisible">
      <el-form :model="form">
        <el-form-item label="手机号" label-width="120px">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" label-width="120px">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
     <el-form-item label="密码" label-width="120px">
          <el-input v-model="form.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="update" >修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
 data(){
   return{
     form:{
       title:233,
       name:"小明",
        pass:1234,
        status:1
     }
   }
 }
}
</script>

<style>

</style>
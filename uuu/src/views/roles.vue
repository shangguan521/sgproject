<template>
 <div>
     <!-- 面包屑 -->
    <el-bread></el-bread>
    <!-- 添加按钮 -->
    <div>
      <el-button @click="dialogShow = true" type="primary" size="mini" plain>添加</el-button>

    </div>
 </div>
</template>

<script>
import elBread from '../components/elBread'
export default {
 data() {
 return {

 };
 },
 components:{
     elBread
 }
};
</script>

<style lang="" scoped>

</style>

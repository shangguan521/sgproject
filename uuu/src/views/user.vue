<template>
  <div>
    <!-- 面包屑 -->
    <el-bread></el-bread>
    <!-- 添加按钮 -->
    <div>
      <el-button type="primary" size="mini" plain>添加</el-button>
    </div>
    <!-- table表格 -->
    <el-table :data="tableDeta" style="width: 100%">
      <el-table-column prop="prop" label="label" width="width"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import elBread from "../components/elBread";
export default {
  data() {
    return {
     
    };
  },
  components: {
    elBread,
  },
};
</script>

<style lang="stylus" scoped>
 
</style>

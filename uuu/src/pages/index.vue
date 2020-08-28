<template>
  <div>
    <el-container>
      <el-header>小u后台管理项目</el-header>
      <el-container>
        <el-aside width="200px">
            <v-nav></v-nav>
        </el-aside>
        <el-main>
          <!-- 二级路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import vNav from '../components/nav'
import elBread from '../components/elBread'
export default {
  data() {
    return {};
  },
  components:{
    vNav,
    elBread
  }
};
</script>

<style lang="stylus" scoped>
@import '../stylus/index.styl'
.el-header
    background  $thirdColor
    color white
    
</style>

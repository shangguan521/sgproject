<template>
  <div>
    <!-- el-menu的属性
                default-active 默认选中 取决于子标签的index
                background-color    背景色
                active-text-color 点击的文本颜色
                unique-opened	是否只保持一个子菜单的展开
                router	是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转
    -->
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
          :default-active="defaultActive"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          router
        >
          <el-menu-item index="/home">
            <i class="el-icon-s-grid"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu :index="item.id.toString()" v-for="item in get_MenuList" :key="item.id">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item
              v-for="itemList in item.children"
              :key="itemList.id"
              :index="itemList.url"
            >{{itemList.title}}</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { getMenuList } from "../util/axios";
export default {
  data() {
    return {
      defaultActive: "/home",
      navList: [],
    };
    console.log(navList);
  },
  
  computed: {
    ...mapGetters(['get_MenuList'])
  },
  mounted() {
    // this.defaultActive = this.$route.path;
    // this.navList=sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')).menus : []
    
    this.getMenuListAction()
    // console.log(navList);
  },
  methods: {
    ...mapActions(['getMenuListAction'])
  },
};
</script>
<style lang="stylus" scoped>
@import url '../stylus/index.styl';
.el-menu {
  min-height: 600px;
}
</style>

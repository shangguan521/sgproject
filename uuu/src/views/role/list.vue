<template>
  <div>
    <el-table
      :data="get_MenuList"
      border
      row-key="id"   
      default-expand-all
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="角色编号" width="180"></el-table-column>
      <el-table-column prop="title" label="角色名称" width="180"></el-table-column>
     
      
      <el-table-column prop="status" label="状态">
        <template slot-scope="item">
          <el-tag v-if="item.row.status ==1" type="success">正常</el-tag>
          <el-tag v-else type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="item">
          <el-button type="primary" @click="edit(item.row.id)" icon="el-icon-edit" circle></el-button>
          <el-button type="danger" @click="del(item.row.id)" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {  getMenuDel } from "../../util/axios";
export default {
  data() {
    return {};
  },
  mounted() {
    //页面一加载就获取菜单列表
    this.getMenuListAction();
  },
  computed: {
    ...mapGetters(["get_MenuList"]),
  },
  methods: {
    //封装获取菜单列表
    ...mapActions(["getMenuListAction"]),
    //获取当前数据的id
    edit(id) {
      this.$emit("edit", {
        isAdd: false,
        id,
      });
    },
    //删除事件
    del(id) {
      this.$confirm("确定要删除该数据吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //调取删除接口
          getMenuDel({ id }).then((res) => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: res.msg,
              });
              //重新调取列表接口
              this.getMenuListAction();
            } else {
              this.$message.error(res.msg);
            }
          });
        })
        // 删除失败
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style  lang="" scoped>
</style>

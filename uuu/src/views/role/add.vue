<template>
  <div>
    <el-dialog
      :before-close="reset"
      :title="isShow.isAdd?'添加角色':'编辑角色'"
      :visible.sync="isShow.dialogShow"
      center
    >
      <el-form :model="menuForm" :rules="rules" ref="ruleForm">
        <el-form-item prop="title" label="角色名称：" :label-width="formLabelWidth">
          <el-input v-model="menuForm.title"></el-input>
        </el-form-item>

        <el-tree
           :data="get_MenuList"
            show-checkbox
            default-expand-all
            node-key="id"
            ref="tree"
            :props="defaultProps"
            :default-checked-keys="defaultChecked"
            check-strictly

        ></el-tree>

        <el-form-item label="状态：" :label-width="formLabelWidth">
          <el-switch
            v-model="menuForm.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="reset">取 消</el-button>
        <el-button @click="add('ruleForm')" type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getMenuAdd, getMenuInfo, getMenuEdit } from "../../util/axios";
export default {
  props: ["isShow"],
  computed: {
    ...mapGetters(["get_MenuList"]),
  },
  data() {
    return {
      editId: 0,
      defaultChecked:[],
      formLabelWidth: "120px", //lable宽度
      roleForm: {
        rolename:'',
        status:1
      },
      //表单验证（根据产品需求制定）
      rules: {
        rolename: [
          //代表加红色星标
          { required: true, message: "请输入角色名称", trigger: "blur" },
          //验证字符数
          { min: 2, max: 9, message: "长度在 2 到 9 个字符", trigger: "blur" },
        ],
        
      },
      defaultProps:{
        // 树结构的显示配置项
        children:'children',
        label:'title'
      }
    };
  },
  mounted(){
    this.getMenuListAction();
    this.getRoleListAction();
  },
  computed:{
    ...mapGetters(['get_MenuList'])
  },
  props:['isShow'],
  methods: {
    //编辑事件
    update(id) {
      //赋值 给调取编辑接口用
      this.editId = id;
      getRoleInfo({ id }).then((res) => {
        if (res.code == 200) {
          this.menuForm = res.list;
        }
      });
    },
    //调取行动
    ...mapActions(["getMenuListAction"]),
    //关闭弹框事件
    //封装一个清空事件
    reset() {
      //方法一
      this.roleForm = {
        rolename:'',
        status:1
      };
      // 清空tree结构的选择状态
      this.$refs.tree.setCheakedKeys([]);
      // 子组件去修改父组件的弹框状态
      this.$emit("closeDialog", false);
    },
    // 触发菜单列表的调取
    ...mapActions(['getMenuListAction','getRoleListAction']),
    // 点击弹框获取一条数据
    update(id){
      this.editId = id;
      getRoleInfo({ id }).then((res) => {
        if (res.code === 200) {
          console.log(res, "一条数据");
          this.roleForm = res.list;
          //得到的数组要做二次转换
          this.defaultChecked = this.roleForm.menus
            ? this.roleForm.menus.split(",")
            : [];
        }
      });
    },
    //添加表单事件
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 菜单权限  存放的是菜单编号，用逗号隔开











          
          if (this.isShow.isAdd) {
            //调取添加接口
            getMenuAdd(this.menuForm).then((res) => {
              console.log(res);
              if (res.code === 200) {
                this.$message.success(res.msg);
                //关闭弹框并清空
                this.reset();
                //重新调取列表
                this.getMenuListAction();
              } else {
                this.$message.error(res.msg);
              }
            });
          } else {
            //id编号，必填项  对数据进行编辑
            this.menuForm.id = this.editId;
            //调取添加接口
            getMenuEdit(this.menuForm).then((res) => {
              if (res.code === 200) {
                this.$message.success(res.msg);
                //关闭弹框并清空
                this.reset();
                //重新调取列表
                this.getMenuListAction();
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style  lang="" scoped>
</style>

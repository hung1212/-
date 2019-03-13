<template>
  <div class="users">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="my-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col :span="8">
        <el-input placeholder="请输入内容" v-model="fromData.query" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="12">
        <el-button type="success" @click="addFormVisiable=true">添加用户</el-button>
      </el-col>
    </el-row>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch
            active-color="#13ce66"
            inactive-color="#ff4949"
            v-model="scope.row.mg_state"
            @change="stateChange(scope.row)"
            class
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="current">
          <el-row>
            <el-button type="primary" icon="el-icon-edit" circle></el-button>
            <el-button type="danger" icon="el-icon-delete" @click="deleteUser(current.row)" circle></el-button>
            <el-button type="success" icon="el-icon-check" circle></el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>
    </div>

    <el-dialog title="添加用户" :visible.sync="addFormVisiable">
      <el-form
        :model="addForm"
        :rules="rules"
        label-position="right"
        label-width="80px"
        class="my-form"
        status-icon
        ref="addForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" type="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="addForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisiable = false">取 消</el-button>
        <el-button type="primary" @click="submitAdduser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
      // 邮箱验证规则
    var checkEmail = (rule, value, callback) => {
      // 延迟延迟
      setTimeout(() => {
        // 定义正则表达式
        let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        // 验证是否匹配
        if (reg.test(value)) {
          // 格式匹配
          callback();
        } else {
          // 不匹配
          callback(new Error("请正确输入邮箱"));
        }
      }, 1000);
    };
    // 验证手机号
    var checkMobile = (rule, value, callback) => {
      if (value != "") {
        // 延迟延迟
        setTimeout(() => {
          // 定义正则表达式
          let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
          // 验证是否匹配
          if (reg.test(value)) {
            // 格式匹配
            callback();
          } else {
            // 不匹配
            callback(new Error("请正确输入手机号"));
          }
        }, 1000);
      } else {
        callback();
      }
    };
    return {
      fromData: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      tableData: [],
      addFormVisiable: false,
      // 新增的表单数据
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ],
        email: [{ validator: checkEmail, trigger: "blur" }],
        mobile: [{ validator: checkMobile, trigger: "blur" }]
      }          
    };
  },
  created() {
    this.search();
  },
  methods: {
    async search() {
      let res = await this.$http.get("users", {
        params: this.fromData
      });
      this.tableData = res.data.data.users;
    },
    async stateChange(item) {
      let res = await this.$http.put(`users/${item.id}/state/${item.mg_state}`);
    },
    deleteUser(current) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete(`users/${current.id}`).then(res => {
            if (res.status === 200) this.search();
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      
    },
    async submitAdduser() {
      this.$refs.addForm.validate(async vali=>{
        if(vali) {
         let res = await this.$http.post("users", this.addForm)
          if(res.data.meta.status === 201) {
            this.addFormVisiable = false
            this.search()
          }
        } else {
          // 数据错误
          this.$message.warning("请正确输入数据");
          return false;
        }
      })
    }
  }
};
</script>

<style lang="less" scoped>
.users {
  .el-breadcrumb.my-breadcrumb {
    line-height: 60px;
    background: rgb(229, 241, 229);
  }
}
</style>

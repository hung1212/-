<template>
  <div class="index">
    <div class="header">
      <div class="logo">
        <img src="../assets/logo.png" alt>
      </div>
      <div class="center">后台管理系统</div>
      <div class="right">
        <el-button type="success" @click="loginOut">退出</el-button>
      </div>
    </div>
    <div class="main">
      <div class="left">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          router
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
              <el-menu-item index="/index/users">用户列表</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
      <div class="right">
          <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  methods: {
    loginOut() {
      window.sessionStorage.removeItem("token");
      this.$router.push("login");
    }
  }
};
</script>
<style lang="less" scoped>
.index {
  display: flex;
  flex-direction: column;
  height: 100vh;
  .header {
    height: 60px;
    background: #b3c0d1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .center {
      font-size: 30px;
      font-weight: 700;
    }
  }
  .main {
    flex: 1;
    display: flex;
    height: 100%;
    .left {
      width: 200px;
      background: #fff;
    }
    .right {
      height: 100%;
      flex: 1;
      background: #e9eef3;
      padding:0 30px;
      
    }
  }
}
</style>

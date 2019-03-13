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
          <el-submenu :index="String(index)" v-for="(item,index) of menusList" :key="index">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
              <el-menu-item v-for="it of item.children" :index="'/index/'+it.path" :key="it.id">{{it.authName}}</el-menu-item>
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
  data() {
    return {
      menusList:'',
    }
    
  },
  methods: {
    loginOut() {
      window.sessionStorage.removeItem("token");
      this.$router.push("login");
    },
    //异步
    async menus() {
      let res = await this.$http.get('menus')
      this.menusList = res.data.data
    }
    // menus() {
    //   let res = this.$http.get('menus')
    //   .then((res)=>{
    //     console.log(res)
    //     this.menusList = res.data.data
    //   })
      
    // }
  },
  created() {
    this.menus()
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

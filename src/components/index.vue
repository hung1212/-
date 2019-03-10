<template>
    <div class="index">
        <div class="header">
            <div class="logo">
                <img src="../assets/logo.png" alt="">
            </div>
            <div class="center">
                后台管理系统
            </div>
            <div class="right">
                <el-button type="success" @click="loginOut">退出</el-button>
            </div>
        </div>
        <div class="main">
            <div class="left">左边</div>
            <div class="right">右边</div>
        </div>
    </div>
</template>

<script>
export default {
    name:"index",
    methods: {
        loginOut() {
            window.sessionStorage.removeItem('token')
            this.$router.push('login')
        }
    }
}
</script>
<style lang="less" scoped>
    .index {
        display: flex;
        flex-direction: column;
        height: 100vh;
        .header {
            height:60px;
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
            flex:1;
            display: flex;
            height: 100%;
            .left {
                width:200px;
                background: #fff;
            }
            .right {
                height: 100%;
                flex:1;
                background:#e9eef3;
            }
        }
    }
</style>

<template>
  <div class="home">
    <h1>请使用邮箱和密码注册或登录</h1>
    <div class="container">
      <b-form-input
        v-model="email"
        type="email"
        placeholder="Enter your email"
      ></b-form-input>
      <b-form-input
        v-model="password"
        type="password"
        placeholder="Enter your password"
      ></b-form-input>
      <b-button-group>
        <b-button @click="signup" variant="success">注册</b-button>
        <b-button @click="login">登录</b-button>
      </b-button-group>
    </div>
  </div>
</template>
<script>
import cloudbase from "@cloudbase/js-sdk";
cloudbase.init({
  env: "cloud1-8g67o253ae1b4cab",
});
export default {
  name: "login",
  data() {
    return {
      email: null,
      password: null,
    };
  },
  methods: {
    async signup() {
      console.log(this);
      await this.$cloudbase
        .auth()
        .signUpWithEmailAndPassword(this.email, this.password)
        .then((res) => {
          console.log("成功", res);

        })
        .catch((err) => {
          console.log("失败", err);
        });
      // 数据库查询
      // const queryResult = await this.$cloudbase.database().collection('users').where({}).get()
      // console.log("queryResult",queryResult);
    },
    async login() {
      await this.$cloudbase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((res) => {
          console.log("成功", res);
          this.$router.push({
            path:'/survey'
          })
        })
        .catch((err) => {
          console.log("失败", err);
        });
    },
  },
};
</script>

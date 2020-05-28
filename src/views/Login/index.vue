<template>
  <div class="login-wrapper">
    <div class="form">
      <div class="form-heander">可视化API工具</div>
      <el-form :model="form" :rules="rules" ref="form" label-width="60px">
        <el-form-item label="账号" prop="username">
          <el-input v-model="form.username" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="form.password"
            placeholder="密码"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loginHandler">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { login } from '../../api/user';
import { mapMutations } from 'vuex';

export default {
  name: 'login',
  data() {
    return {
      rules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入尼玛', trigger: 'blur' }],
      },
      form: {
        password: '123456',
        username: 'xuin',
      },
    };
  },
  methods: {
    ...mapMutations('user', ['setUserInfo']),
    loginHandler() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          try {
            const user = await login(this.form);
            this.setUserInfo(user);
            this.$router.push('/');
          } catch (error) {
            console.error(error.message);
          }
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style lang="stylus" scoped>
.login-wrapper {
  height: 80vh;
  display: flex;
  align-items: center;
  .form-heander {
    height: 180px;
    line-height: 180px;
    text-align: center;
    font-weight: 500;
    font-size: 3rem;
  }
  .form {
    width: 400px;
    margin: auto;
    button {
      width: 100%;
    }
  }
}
</style>

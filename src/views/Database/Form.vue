<template>
  <div class="database-form-wrapper">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="数据源名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入数据源名称"></el-input>
      </el-form-item>
      <el-form-item label="数据库类型" prop="type">
        <el-select
          v-model="form.type"
          placeholder="请选择数据库类型"
          :popper-append-to-body="false"
        >
          <el-option
            v-for="(item, key) in dbType"
            :key="item"
            :label="key"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="主机名" prop="host">
        <el-input v-model="form.host" placeholder="请输入主机名"></el-input>
      </el-form-item>
      <el-form-item label="端口号" prop="port">
        <el-input
          v-model.number="form.port"
          placeholder="请输入端口号"
        ></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="form.password"
          type="password"
          placeholder="请输入用户名"
        />
      </el-form-item>
      <el-form-item label="数据库名称" prop="dbName">
        <el-input
          v-model="form.dbName"
          placeholder="请输入数据库名称"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <div class="button-arr">
          <div>
            <el-button type="primary" @click="submitForm('submit')">
              保存
            </el-button>
            <el-button @click="setFormMessage(false)">重置</el-button>
          </div>
          <div>
            <el-button @click="submitForm('test')">测试连接</el-button>
          </div>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { dbType } from '../../api/constant';

const formRule = function(message, trigger = 'blur') {
  return { required: true, message, trigger };
};
export default {
  data() {
    return {
      form: {
        id: '',
        name: '',
        type: '',
        host: '',
        port: '',
        dbName: '',
        username: '',
        password: '',
      },
      rules: {
        name: [formRule('请输入数据源名称')],
        type: [formRule('请选择数据库类型', 'change')],
        host: [formRule('请输入主机名')],
        port: [
          formRule('请输入端口号'),
          {
            type: 'number',
            message: '必须为数字',
          },
        ],
        dbName: [formRule('请输入数据库名')],
        username: [formRule('请输入用户名')],
        password: [formRule('请输入密码')],
      },
      dbType,
    };
  },
  methods: {
    submitForm(type) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit(type, this.form);
        } else {
          return false;
        }
      });
    },
    setFormMessage(form) {
      this.$refs.form.clearValidate();
      if (form) {
        Object.keys(this.form).forEach((key) => (this.form[key] = form[key]));
      } else {
        this.$refs.form.resetFields();
      }
    },
  },
};
</script>
<style lang="stylus" scoped>
.database-form-wrapper {
  padding: 0 20px;
  .button-arr {
    display: flex;
    justify-content: space-between;
  }
}
</style>

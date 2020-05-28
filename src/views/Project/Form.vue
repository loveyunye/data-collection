<template>
  <div class="project-form-wrapper">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="项目名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入项目名称"></el-input>
      </el-form-item>
      <el-form-item label="项目备注" prop="remark">
        <el-input
          v-model="form.remark"
          type="textarea"
          placeholder="请输入项目备注"
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
        remark: '',
      },
      rules: {
        name: [formRule('请输入项目名')],
        remark: [formRule('请输入备注')],
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
.project-form-wrapper {
  padding: 0 20px;
  .button-arr {
    display: flex;
    justify-content: space-between;
  }
}
</style>

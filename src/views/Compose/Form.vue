<template>
  <div class="API-form-wrapper">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="接口名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入接口名称"></el-input>
      </el-form-item>
      <el-form-item label="接口描述" prop="description">
        <el-input
          v-model="form.description"
          type="textarea"
          placeholder="请输入接口描述"
        ></el-input>
      </el-form-item>
      <el-form-item label="代码" prop="code">
        <Editor
          ref="editor"
          :readOnly="false"
          :isCompose="true"
          :minimap="false"
          language="json"
          @change="handleChange"
        />
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
            <el-button @click="submitForm('test')">测试结果</el-button>
          </div>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        id: '',
        name: '',
        description: '',
        code: '123',
      },
      rules: {
        name: [
          { required: true, message: '请输入数据源名称', trigger: 'blur' },
        ],
        description: [
          { required: true, message: '请输入主机名', trigger: 'blur' },
        ],
        code: [{ required: true, message: '请输入代码', trigger: 'blur' }],
      },
      codes: '',
      current: 1,
    };
  },
  methods: {
    handleChange(value) {
      this.form.code = value;
      this.$refs.form.validateField('code');
    },
    // 提交
    submitForm(type) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit(type, this.form);
        } else {
          return false;
        }
      });
    },
    // 设置
    setFormMessage(form) {
      if (form) {
        Object.keys(this.form).forEach((key) => (this.form[key] = form[key]));
      } else {
        Object.keys(this.form).forEach((key) => (this.form[key] = ''));
      }
      if (this.$refs.editor.editor) {
        this.$refs.editor.setValue('json', form.code || '');
      } else {
        setTimeout(() => {
          this.$refs.editor.initEditor('json', form.code || '');
        }, 500);
      }
      this.$nextTick(() => {
        this.$refs.form.clearValidate();
      });
    },
  },
};
</script>
<style lang="stylus" scoped>
.API-form-wrapper {
  padding: 0 20px;
  .button-arr {
    display: flex;
    justify-content: space-between;
  }
}
</style>

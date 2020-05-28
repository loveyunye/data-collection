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
      <el-form-item label="数据来源" prop="type">
        <el-select
          v-model="form.type"
          placeholder="请选择数据来源"
          :popper-append-to-body="false"
          @change="typeChange"
        >
          <el-option
            v-for="item in apiType"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="数据库" prop="sqlId" v-if="form.type === 'sql'">
        <el-select
          v-model.number="form.sqlId"
          placeholder="请选择数据库"
          :popper-append-to-body="false"
        >
          <el-option
            v-for="item in dataSources"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="URI" prop="url" v-if="form.type === 'url'">
        <el-input v-model="form.url" placeholder="请输入URI"></el-input>
      </el-form-item>
      <el-form-item
        label="代码"
        prop="code"
        v-if="form.type === 'sql' || form.type === 'static'"
      >
        <Editor
          :code="form.code"
          ref="editor"
          :readOnly="false"
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
import { mapState } from 'vuex';
import { apiType } from '../../api/constant';

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
        description: '',
        sqlId: '',
        code: '',
        url: '',
      },
      rules: {
        name: [formRule('请输入接口名称')],
        type: [formRule('请选择接口类型', 'change')],
        description: [formRule('请输入描述')],
        sqlId: [formRule('请输入端口号')],
        code: [formRule('请输入代码')],
        url: [formRule('请输入URI')],
      },
      codes: '',
      current: 1,
      apiType,
    };
  },
  computed: {
    ...mapState('data', ['dataSources']),
  },
  methods: {
    handleChange(value) {
      this.form.code = value;
      this.$refs.form.validateField('code', () => {});
    },
    typeChange(type) {
      if (type === 'url') {
        return;
      }
      this.$nextTick(() => {
        this.$refs.editor ? this.$refs.editor.remove() : null;
        this.$refs.editor.initEditor(
          type === 'sql' ? 'sql' : 'json',
          this.form.code,
        );
      });
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
        // 弹窗有开启动画,等开启动画结束渲染
        setTimeout(() => {
          this.typeChange(form.type);
        }, 500);
      } else {
        Object.keys(this.form).forEach((key) => (this.form[key] = ''));
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

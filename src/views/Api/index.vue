<template>
  <div class="API-wrapper">
    <TitleDiv name="API" :num="filterList.length">
      <Icon type="plus" @click="addHandler" />
    </TitleDiv>
    <div class="page-container">
      <div class="card-item" v-for="item in filterList" :key="item.id">
        <div class="title">
          <span>{{ item.name }}</span>
          <span>
            <Icon type="eye-on" @click="lookView(item.key)" />
            <Icon type="edit" @click="editHandler(item)" />
            <Icon
              type="delete"
              color="#F56C6C"
              @click="deleteHandler(item.id)"
            />
          </span>
        </div>
        <ItemMessage :item="item" />
      </div>
    </div>
    <!-- 弹窗 -->
    <Dialog v-model="dialogVisiable" width="1000px" :title="title">
      <div class="dialog-body">
        <Form
          class="form-sider"
          ref="form"
          @submit="submitHandler"
          @test="testHandler"
        />
        <div class="request-sider">
          结果
          <Editor ref="result" :height="350" :readOnly="true" />
        </div>
      </div>
    </Dialog>
  </div>
</template>
<script>
import ItemMessage from './ItemMessage';
import Form from './Form';
import { list, update, create, del, test } from '../../api/apiSource';
import { list as databaseList } from '../../api/dataSource';
import { BaseURL } from '../../api/constant';
import { mapActions, mapState } from 'vuex';
import { base64encode, base64decode } from 'nodejs-base64';

export default {
  name: 'api-wrapper',
  data() {
    return {
      resultList: [],
      total: 0,
      // 弹窗
      dialogVisiable: false,
      title: '新增api',
      insertStatus: true,
      initResult: true,
    };
  },
  computed: {
    ...mapState('data', ['projectId', 'searchStr']),
    filterList() {
      return this.resultList.filter(
        (item) => item.name.indexOf(this.searchStr) >= 0,
      );
    },
  },
  methods: {
    ...mapActions('data', ['setApiSources', 'setDataSources']),
    // 获取数据
    async getList() {
      const res = await list({
        projectId: this.projectId,
      });
      this.total = res.length;
      this.resultList = res;
      this.setApiSources(res);
    },
    // 查看
    lookView(key) {
      window.open(`${BaseURL}/${key}`);
    },
    async testHandler(data) {
      const form = Object.assign({}, data, {
        code: base64encode(data.code),
      });
      const res = await test(form);
      if (typeof res === 'object') {
        this.$refs.result.setValue('json', JSON.stringify(res));
      } else {
        this.$refs.result.setValue('json', res);
      }
    },
    // 表单提交
    async submitHandler(data) {
      const form = Object.assign({}, data, {
        projectId: this.projectId,
        code: base64encode(data.code),
      });
      if (this.insertStatus) {
        await create(form);
      } else {
        await update(form);
      }
      this.dialogVisiable = false;
      this.getList();
    },
    // 删除
    async deleteHandler(id) {
      await this.$confirm('此操作将永久删除该API, 是否继续?', '提示')
        .then(async () => {
          await del(id);
        })
        .catch(() => {});
      this.getList();
    },
    addHandler() {
      this.dialogVisiable = true;
      this.insertStatus = true;
      this.title = '新增API';
      this.$nextTick(() => {
        this.$refs.form.setFormMessage(false);
      });
      this.registerEdit();
    },
    editHandler(item) {
      this.dialogVisiable = true;
      this.insertStatus = false;
      this.title = `修改API: ${item.name}`;
      this.$nextTick(() => {
        this.$refs.form.setFormMessage(
          Object.assign({}, item, {
            code: item.code ? base64decode(item.code) : '',
          }),
        );
      });
      this.registerEdit();
    },
    registerEdit() {
      if (this.initResult) {
        // 弹窗动画延迟时间
        setTimeout(() => {
          this.$refs.result.initEditor();
          this.initResult = false;
        }, 500);
      }
    },
  },
  async mounted() {
    this.getList();
    const res = await databaseList();
    this.setDataSources(res);
  },
  watch: {
    dialogVisiable(newVal) {
      if (!newVal) {
        this.$refs.result.setValue('json', '');
      }
    },
    projectId() {
      this.getList();
    },
  },
  components: {
    ItemMessage,
    Form,
  },
};
</script>
<style lang="stylus" scoped>
.API-wrapper {
  width: 100%;
  .dialog-body {
    display: flex;
    .form-sider {
      width: 600px;
    }
    .request-sider {
      margin-right: 40px;
      flex: 1;
      // border: 1px solid #ffffff;
      height: 100%;
      border-radius: 4px;
      line-height: 40px;
      padding: 0 15px;
    }
  }
}
</style>

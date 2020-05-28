<template>
  <div class="project-wrapper">
    <TitleDiv name="项目" :num="filterList.length">
      <Icon type="plus" @click="addHandler" />
    </TitleDiv>
    <div class="page-container">
      <div class="card-item" v-for="item in filterList" :key="item.id">
        <div class="title">
          <span>{{ item.name }} ( {{ item.remark }} )</span>
          <span>
            <Icon type="edit" @click="editHandler(item)" />
            <Icon
              type="delete"
              color="#F56C6C"
              @click="deleteHandler(item.id)"
            />
          </span>
        </div>
      </div>
    </div>
    <!-- 弹窗 -->
    <Dialog v-model="dialogVisiable" :title="title">
      <div class="dialog-body">
        <Form class="form-sider" ref="form" @submit="submitHandler" />
      </div>
    </Dialog>
  </div>
</template>

<script>
import { list, update, create, del } from '../../api/project';
import Form from './Form.vue';
import { mapActions, mapState } from 'vuex';
import { Message } from 'element-ui';

export default {
  name: 'project-wrapper',
  data() {
    return {
      resultList: [],
      total: 0,
      // 弹窗
      dialogVisiable: false,
      title: '新增api',
      initResult: true,
    };
  },
  computed: {
    ...mapState('data', ['searchStr', 'projectId']),
    filterList() {
      return this.resultList.filter(
        (item) => item.name.indexOf(this.searchStr) >= 0,
      );
    },
  },
  methods: {
    ...mapActions('data', ['setProjectSources']),
    // 获取数据
    async getList() {
      const res = await list();
      this.total = res.length;
      this.resultList = res;
      this.setProjectSources(res);
    },
    // 表单提交
    async submitHandler(data) {
      if (this.insertStatus) {
        await create(data);
      } else {
        await update(data);
      }
      this.dialogVisiable = false;
      this.getList();
    },
    // 删除
    async deleteHandler(id) {
      if (this.projectId === id) {
        Message.error('当前工作空间处于该项目下, 请切换项目再进行操作。');
        return;
      }
      this.$confirm('此操作将永久删除该项目, 是否继续?', '提示')
        .then(async () => {
          try {
            await del(id);
          } catch {
            return;
          }
          this.getList();
        })
        .catch(() => {});
    },
    addHandler() {
      this.dialogVisiable = true;
      this.insertStatus = true;
      this.title = '新增项目';
      this.$refs.form.setFormMessage(false);
    },
    editHandler(item) {
      this.dialogVisiable = true;
      this.insertStatus = false;
      this.title = `修改项目: ${item.name}`;
      this.$refs.form.setFormMessage(item);
    },
  },
  async mounted() {
    this.getList();
  },
  components: {
    Form,
  },
};
</script>
<style lang="stylus" scoped>
.project-wrapper {
  width: 100%;
  .card-item {
    flex-basis: 100%;
  }
}
</style>

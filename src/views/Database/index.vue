<template>
  <div class="database-wrapper">
    <TitleDiv name="数据源" :num="filterList.length">
      <Icon type="plus" @click="addHandler" />
    </TitleDiv>
    <div class="page-container">
      <div class="card-item" v-for="item in filterList" :key="item.id">
        <div class="title">
          <span>{{ item.name }}</span>
          <span class="edit">
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
    <Dialog v-model="dialogVisiable" :title="title">
      <Form ref="form" @submit="submitHandler" @test="testHandler" />
    </Dialog>
  </div>
</template>
<script>
import ItemMessage from './ItemMessage';
import Form from './Form';
import { list, update, create, del, test } from '../../api/dataSource';
import { mapActions, mapState } from 'vuex';
import { Message } from 'element-ui';

export default {
  name: 'database-wrapper',
  data() {
    return {
      resultList: [],
      total: 0,
      // 弹窗
      dialogVisiable: false,
      title: '新增数据源',
      insertStatus: true,
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
    ...mapActions('data', ['setDataSources']),
    // 获取接口
    async getList() {
      const res = await list({
        projectId: this.projectId,
      });
      this.total = res.length;
      this.resultList = res;
      this.setDataSources(res);
    },
    // 测试连接接口
    async testHandler(data) {
      let vaild = true;
      try {
        await test(data);
      } catch {
        vaild = false;
      }
      vaild ? Message.success('连接成功') : null;
    },
    // 表单提交
    async submitHandler(data) {
      const form = Object.assign(data, {
        projectId: this.projectId,
      });
      if (this.insertStatus) {
        await create(form);
      } else {
        await update(form);
      }
      this.dialogVisiable = false;
      this.getList();
    },
    async deleteHandler(id) {
      this.$confirm('此操作将永久删除该数据源, 是否继续?', '提示')
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
      this.title = '新增数据源';
      this.$nextTick(() => {
        this.$refs.form.setFormMessage(false);
      });
    },
    editHandler(item) {
      this.dialogVisiable = true;
      this.insertStatus = false;
      this.title = `修改数据源: ${item.name}`;
      this.$nextTick(() => {
        this.$refs.form.setFormMessage(item);
      });
    },
  },
  watch: {
    projectId() {
      this.getList();
    },
  },
  mounted() {
    this.getList();
  },
  components: {
    ItemMessage,
    Form,
  },
};
</script>
<style lang="stylus" scoped>
.database-wrapper {
  width: 100%;
}
</style>

<template>
  <div class="project-wrapper">
    <div class="nick">
      <span>{{ projectName }}</span>
    </div>
    <div class="more">
      <div
        v-for="item in projectList"
        :key="item.id + item.name"
        :class="`${projectId === item.id ? 'active' : ''}`"
        @click="setProjectId(item.id)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import { list } from '@/api/project';

export default {
  name: 'project',
  methods: {
    ...mapActions('data', ['setProjectId', 'setProjectSources']),
  },
  computed: {
    ...mapState('data', ['projectId', 'projectSources']),
    projectName() {
      const projectItem = this.projectSources.filter(
        (item) => item.id === this.projectId,
      )[0];
      return projectItem ? projectItem.name : '暂无';
    },
    projectList() {
      return this.projectSources || [];
    },
  },
  async mounted() {
    const res = await list();
    this.setProjectSources(res);
  },
};
</script>
<style lang="stylus" scoped>
.project-wrapper {
  position: relative;
  width: 180px;
  height: 70px;
  color: #17b3ff;
  font-size: 1.6rem;
  text-align: center;
  .nick {
    height: 100%;
    line-height: 70px;
    cursor: pointer;
    span {
      position: relative;
      &::before {
        position: absolute;
        content: " ";
        left: -16px;
        top: 50%;
        transform: translateY(-50%);
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #17b3ff;
      }
    }
  }
  .more {
    background-color: #1c2139;
    position: absolute;
    display: none;
    top: 70px;
    // left: 150px;
    padding: 0 20px;
    left: 0;
    width: 100%;
    line-height: 50px;
    transition: .5s;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: rgba(255, 255, 255, 0.3);
    z-index: 9999;
    div {
      height: 50px;
      cursor: pointer;
      color: #f2f2f2;
      &.active {
        color: #17b3ff;
      }
    }
  }
  &:hover .more{
    display: block;
  }
}
</style>

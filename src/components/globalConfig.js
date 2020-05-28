/**
 * 全局组件注册
 */
import Vue from 'vue';
import {
  Pagination,
  Form,
  FormItem,
  Select,
  Button,
  RadioGroup,
  TimePicker,
  Input,
  CheckboxGroup,
  Checkbox,
  Radio,
  Option,
  MessageBox,
} from 'element-ui';
Vue.prototype.$ELEMENT = { size: 'small' };
Vue.prototype.$confirm = MessageBox;
[
  Pagination,
  Form,
  FormItem,
  Select,
  Button,
  RadioGroup,
  TimePicker,
  Input,
  CheckboxGroup,
  Checkbox,
  Radio,
  Option,
].forEach((item) => {
  Vue.use(item);
});

const requireComponent = require.context('.', true, /^\S+\.vue$/);
requireComponent.keys().forEach((pathName) => {
  const componentName = pathName.split('/')[1].replace(/\.vue$/, '');
  const componentConfig = requireComponent(pathName);
  Vue.component(componentName, componentConfig.default || componentConfig);
});

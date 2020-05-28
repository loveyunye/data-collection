<template>
  <div
    ref="container"
    class="monaco-editor-wrapper"
    :style="`height: ${height}px`"
  />
</template>
<script>
import * as monaco from 'monaco-editor';
import { mapState } from 'vuex';

export default {
  name: 'Editor',
  props: {
    readOnly: {
      type: Boolean,
      default: false,
    },
    minimap: {
      type: Boolean,
      default: false,
    },
    current: Number,
    editorOptions: {
      type: Object,
      default: function() {
        return {
          selectOnLineNumbers: true, // 显示行号
          roundedSelection: false,
          cursorStyle: 'line', // 光标样式
          automaticLayout: false, // 自动布局
          glyphMargin: true, // 字形边缘
          useTabStops: false,
          fontSize: 28, // 字体大小
          autoIndent: true, // 自动布局
        };
      },
    },
    height: {
      type: Number,
      default: 300,
    },
    isCompose: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      editor: null,
      suggestionsDispose: null,
      theme: {
        base: 'vs-dark',
        inherit: true,
        rules: [
          { token: 'custom-info', foreground: 'a3a7a9', background: 'ffffff' },
          { token: 'custom-error', foreground: 'ee4444' },
          { token: 'custom-notice', foreground: '1055af' },
          { token: 'custom-date', foreground: '20aa20' },
        ],
        colors: {
          'editor.background': '#212844',
        },
      },
    };
  },
  methods: {
    initEditor(language = 'json', code = '') {
      monaco.editor.defineTheme('myTheme', this.theme);
      this.editor = monaco.editor.create(this.$refs.container, {
        value: null,
        language: language,
        theme: 'myTheme', // 编辑器主题：vs, hc-black, or vs-dark，更多选择详见官网
        editorOptions: this.editorOptions,
        minimap: {
          enabled: this.minimap,
        },
        readOnly: this.readOnly,
        formatOnType: true,
        formatOnPaste: true,
        detectIndentation: true,
        autoIndent: true,
        tabSize: 2,
        indentSize: 2,
      });
      this.editor.onDidBlurEditorWidget(() => {
        if (this.editor) {
          this.$emit('change', this.editor.getValue());
        }
      });
      this.setSuggestions();
      this.setValue(language, code);
    },
    setValue(language, code) {
      let res;
      try {
        res =
          language === 'json' && code !== ''
            ? JSON.stringify(JSON.parse(code), null, '\t')
            : code;
      } catch {
        res = code;
      }
      this.editor.setValue(res);
    },
    remove() {
      if (this.editor) {
        if (this.editor.getModel()) {
          this.editor.getModel().dispose();
        }
        this.editor.dispose();
        this.editor = null;
      }
    },
    // setSuggestions
    setSuggestions() {
      if (this.apiSources.length && this.isCompose) {
        const vm = this;
        this.suggestionsDispose = monaco.languages.registerCompletionItemProvider(
          'json',
          {
            provideCompletionItems(model, position) {
              const line = position.lineNumber;
              const column = position.column;
              const content = model.getLineContent(line);
              // 通过下标来获取当前光标后一个内容，即为刚输入的内容
              const sym = content[column - 2];
              if (sym === '<') {
                return {
                  suggestions: vm.apiSources.map((item) => {
                    return {
                      label: `<%=${item.key}%>`,
                      kind: monaco.languages.CompletionItemKind['Function'],
                      insertText: `<%=${item.key}%>`,
                      detail: item.name,
                    };
                  }),
                };
              }
            },
            triggerCharacters: ['<'],
          },
        );
      }
    },
  },
  beforeDestroy() {
    this.remove();
    if (this.suggestionsDispose) {
      this.suggestionsDispose.dispose();
    }
  },
  computed: {
    ...mapState('data', ['apiSources']),
  },
};
</script>
<style lang="stylus" scoped>
.monaco-editor-wrapper {
  border-radius: 4px;
  border: 1px solid #ffffff;
  overflow: hidden;
}
</style>

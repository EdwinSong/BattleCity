// 代码编辑器相关功能

// 全局Ace编辑器实例
var editor;

// 初始化Ace编辑器
function initAceEditor() {
  // 初始化Ace编辑器
  editor = ace.edit('code-div');
  editor.setTheme('ace/theme/tomorrow');
  editor.session.setMode('ace/mode/javascript');
  editor.setShowPrintMargin(false);
  editor.setHighlightActiveLine(true);
  editor.setReadOnly(true);
}

// 将Blockly生成的代码输出到Ace编辑器
function updateAceEditor(code) {
  if (editor) {
    editor.setValue(code, -1); // -1 means cursor at start
  }
}

// 页面加载完成后初始化Ace编辑器
window.addEventListener('load', initAceEditor);
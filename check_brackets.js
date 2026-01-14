// 检查括号匹配的简单脚本
const fs = require('fs');

// 读取文件内容
const content = fs.readFileSync('blockly.js', 'utf8');

// 初始化计数器
let brackets = [];
let lineNumber = 1;
let charNumber = 0;

// 遍历每个字符
for (let i = 0; i < content.length; i++) {
  const char = content[i];
  charNumber++;
  
  if (char === '\n') {
    lineNumber++;
    charNumber = 0;
  }
  
  // 处理左括号
  if (char === '{' || char === '(' || char === '[') {
    brackets.push({ type: char, line: lineNumber, char: charNumber });
  }
  
  // 处理右括号
  else if (char === '}' || char === ')' || char === ']') {
    if (brackets.length === 0) {
      console.error(`Error at line ${lineNumber}, char ${charNumber}: Unexpected closing bracket '${char}'`);
      process.exit(1);
    }
    
    const last = brackets.pop();
    const expected = last.type === '{' ? '}' : last.type === '(' ? ')' : ']';
    
    if (char !== expected) {
      console.error(`Error at line ${lineNumber}, char ${charNumber}: Expected '${expected}' but found '${char}'`);
      process.exit(1);
    }
  }
}

// 检查是否有未闭合的括号
if (brackets.length > 0) {
  const last = brackets.pop();
  console.error(`Error at line ${last.line}, char ${last.char}: Unclosed bracket '${last.type}'`);
  process.exit(1);
}

console.log('All brackets are correctly matched!');
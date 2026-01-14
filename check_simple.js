// 简化的括号检查脚本，只检查大括号
const fs = require('fs');

const content = fs.readFileSync('blockly.js', 'utf8');
let braceCount = 0;
let lineNumber = 1;

for (let i = 0; i < content.length; i++) {
  const char = content[i];
  
  if (char === '\n') {
    lineNumber++;
  }
  
  if (char === '{') {
    braceCount++;
  } else if (char === '}') {
    braceCount--;
    
    if (braceCount < 0) {
      console.error(`Error at line ${lineNumber}: Too many closing braces`);
      process.exit(1);
    }
  }
}

if (braceCount > 0) {
  console.error(`Error: Missing ${braceCount} closing braces`);
  process.exit(1);
} else if (braceCount < 0) {
  console.error(`Error: ${Math.abs(braceCount)} too many closing braces`);
  process.exit(1);
} else {
  console.log('All braces are correctly matched!');
}

// 检查圆括号
let parenthesisCount = 0;
lineNumber = 1;

for (let i = 0; i < content.length; i++) {
  const char = content[i];
  
  if (char === '\n') {
    lineNumber++;
  }
  
  if (char === '(') {
    parenthesisCount++;
  } else if (char === ')') {
    parenthesisCount--;
    
    if (parenthesisCount < 0) {
      console.error(`Error at line ${lineNumber}: Too many closing parentheses`);
      process.exit(1);
    }
  }
}

if (parenthesisCount > 0) {
  console.error(`Error: Missing ${parenthesisCount} closing parentheses`);
  process.exit(1);
} else if (parenthesisCount < 0) {
  console.error(`Error: ${Math.abs(parenthesisCount)} too many closing parentheses`);
  process.exit(1);
} else {
  console.log('All parentheses are correctly matched!');
}

console.log('File syntax appears to be correct!');
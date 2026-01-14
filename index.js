const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 设置静态文件目录
app.use(express.static(path.join(__dirname)));

// 主页面路由
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'BattleCity.html'));
});

// 编程指南页面路由
app.get('/guide', (req, res) => {
  res.sendFile(path.join(__dirname, 'programming_guide.html'));
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Battle City 服务器已启动在 http://localhost:${PORT}`);
  console.log(`游戏地址: http://localhost:${PORT}`);
  console.log(`编程指南: http://localhost:${PORT}/guide`);
});

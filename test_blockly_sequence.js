// BattleCity 程序控制坦克测试序列
// 这个序列可以在Blockly中实现，用于测试当前已实现的功能

// 以下是对应的Blockly程序结构说明：
/*
1. 开始编程关卡
2. 等待游戏开始
3. 执行以下操作序列：
   a. 向上移动2秒
   b. 停止移动
   c. 射击1秒
   d. 停止射击
   e. 向左移动2秒
   f. 停止移动
   g. 延迟1秒
   h. 向右移动2秒
   i. 停止移动
4. 检测与敌人的距离
5. 如果距离小于100像素：
   a. 向后移动1秒
   b. 停止移动
6. 否则：
   a. 向下移动2秒
   b. 停止移动
7. 监听敌人接近事件
   a. 当敌人接近时：
      i. 停止移动
      ii. 射击2秒
      iii. 停止射击
*/

// 对应的JavaScript代码实现：
function testBattleCityControl() {
  // 开始编程关卡
  tank.startProgrammingLevel();
  
  // 改进的游戏开始等待机制
  improvedWaitForGameStart(runTestSequence);
}

// 改进的游戏开始等待函数（事件监听 + 轮询双重保险）
function improvedWaitForGameStart(handler) {
  // 标志位确保只执行一次
  let gameStarted = false;
  
  console.log('等待游戏开始...');
  
  // 1. 事件监听
  const gameStartSubscriber = {
    notify: function(event) {
      if (event.name === "Level.Event.GAME_STARTED") {
        console.log('通过事件监听器检测到游戏开始');
        gameStarted = true;
        tank._gameStarted = true;
        cleanup();
        handler();
      }
    }
  };
  
  // 确保Game.eventManager存在
  if (Game && Game.eventManager) {
    Game.eventManager.addSubscriber(gameStartSubscriber, ["Level.Event.GAME_STARTED"]);
  } else {
    console.warn('Game.eventManager不存在，仅使用轮询检测');
  }
  
  // 2. 轮询检测（双重保险）
  let pollCount = 0;
  const maxPollCount = 100; // 最大轮询次数（约5秒）
  const pollInterval = 50; // 轮询间隔（毫秒）
  
  const pollIntervalId = setInterval(function() {
    pollCount++;
    
    // 检查标志位或游戏状态
    if (gameStarted || tank.isGameStarted() || tank._gameStarted) {
      console.log('通过轮询检测到游戏开始');
      gameStarted = true;
      tank._gameStarted = true;
      cleanup();
      handler();
    }
    
    // 超时处理
    if (pollCount >= maxPollCount) {
      console.warn('游戏开始超时，尝试手动触发');
      cleanup();
      
      // 尝试获取当前场景并手动触发
      const currentScene = Game.sceneManager.getScene();
      if (currentScene && currentScene._level) {
        console.log('手动触发游戏开始事件');
        tank._gameStarted = true;
        handler();
      } else {
        console.error('无法触发游戏开始事件，请检查游戏状态');
      }
    }
  }, pollInterval);
  
  // 清理函数
  function cleanup() {
    clearInterval(pollIntervalId);
    if (Game && Game.eventManager) {
      Game.eventManager.removeSubscriber(gameStartSubscriber);
    }
  }
}

function runTestSequence() {
  console.log('开始执行测试序列...');
  
  // 向上移动2秒
  console.log('向上移动2秒');
  tank.moveUp();
  
  setTimeout(function() {
    // 停止移动
    console.log('停止移动');
    tank.stopMoving();
    
    // 射击1秒
    console.log('射击1秒');
    tank.shoot();
    
    setTimeout(function() {
      // 停止射击
      console.log('停止射击');
      tank.stopShooting();
      
      // 向左移动2秒
      console.log('向左移动2秒');
      tank.moveLeft();
      
      setTimeout(function() {
        // 停止移动
        console.log('停止移动');
        tank.stopMoving();
        
        // 延迟1秒
        console.log('延迟1秒');
        
        setTimeout(function() {
          // 向右移动2秒
          console.log('向右移动2秒');
          tank.moveRight();
          
          setTimeout(function() {
            // 停止移动
            console.log('停止移动');
            tank.stopMoving();
            
            // 检测与敌人的距离
            var distance = tank.getClosestEnemyDistance();
            console.log('与最近敌人的距离:', distance, '像素');
            
            // 条件判断
            if (distance > 0 && distance < 100) {
              console.log('敌人距离过近，向后移动');
              tank.moveDown();
              
              setTimeout(function() {
                console.log('停止移动');
                tank.stopMoving();
              }, 1000);
            } else {
              console.log('敌人距离正常，向下移动');
              tank.moveDown();
              
              setTimeout(function() {
                console.log('停止移动');
                tank.stopMoving();
              }, 2000);
            }
          }, 2000);
        }, 1000);
      }, 2000);
    }, 1000);
  }, 2000);
  
  // 监听敌人接近事件
  console.log('开始监听敌人接近事件...');
  tank.onEnemyApproaching(function(distance) {
    console.log('检测到敌人接近，距离:', distance, '像素');
    console.log('执行防御操作：停止移动并射击');
    
    // 停止移动
    tank.stopMoving();
    
    // 射击2秒
    tank.shoot();
    
    setTimeout(function() {
      console.log('停止射击');
      tank.stopShooting();
    }, 2000);
  });
}

// 运行测试序列
testBattleCityControl();

// Blockly实现建议：
// 1. 使用"开始编程关卡"块作为程序入口
// 2. 使用"向上移动"、"向左移动"、"向右移动"、"向下移动"块控制移动
// 3. 使用"停止移动"块停止移动
// 4. 使用"射击"、"停止射击"块控制射击
// 5. 使用"延迟"块控制时间间隔
// 6. 使用"如果"块进行条件判断
// 7. 使用"获取最近敌人距离"块检测距离
// 8. 使用"当敌人接近时"块监听敌人接近事件

// 在Blockly中实现时，需要将这些块按照上述顺序组合起来，形成一个完整的测试程序。
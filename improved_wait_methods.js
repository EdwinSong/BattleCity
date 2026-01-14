// BattleCity 游戏开始等待方法改进方案
// 解决当前等待游戏开始机制可能存在的问题

// 方案一：事件监听 + 轮询双重保险
function waitForGameStart(handler) {
  // 标志位确保只执行一次
  let gameStarted = false;
  
  // 1. 事件监听
  const gameStartSubscriber = {
    notify: function(event) {
      if (event.name === "Level.Event.GAME_STARTED") {
        console.log('通过事件监听器检测到游戏开始');
        gameStarted = true;
        tank._gameStarted = true;
        handler();
      }
    }
  };
  
  // 确保Game.eventManager存在
  if (Game && Game.eventManager) {
    Game.eventManager.addSubscriber(gameStartSubscriber, ["Level.Event.GAME_STARTED"]);
  } else {
    console.warn('Game.eventManager不存在，无法注册事件监听器');
  }
  
  // 2. 轮询检测（双重保险）
  let pollCount = 0;
  const maxPollCount = 100; // 最大轮询次数（约5秒）
  const pollInterval = 50; // 轮询间隔（毫秒）
  
  const pollIntervalId = setInterval(function() {
    pollCount++;
    
    // 检查标志位
    if (tank._gameStarted) {
      console.log('通过轮询检测到游戏开始');
      clearInterval(pollIntervalId);
      if (!gameStarted) {
        gameStarted = true;
        handler();
      }
    }
    
    // 超时处理
    if (pollCount >= maxPollCount) {
      console.warn('游戏开始超时，尝试手动触发');
      clearInterval(pollIntervalId);
      if (!gameStarted) {
        // 尝试获取当前场景并手动触发
        const currentScene = Game.sceneManager.getScene();
        if (currentScene && currentScene._level) {
          console.log('手动触发游戏开始事件');
          tank._gameStarted = true;
          gameStarted = true;
          handler();
        } else {
          console.error('无法触发游戏开始事件，请检查游戏状态');
        }
      }
    }
  }, pollInterval);
  
  return function() {
    clearInterval(pollIntervalId);
    if (Game && Game.eventManager) {
      Game.eventManager.removeSubscriber(gameStartSubscriber);
    }
  };
}

// 方案二：基于时间的延迟方法
function waitForGameStartWithDelay(delayMs, handler) {
  console.log(`等待${delayMs}毫秒后执行（游戏场景加载需要时间）`);
  
  // 设置游戏开始标志（假设延迟后游戏已准备就绪）
  setTimeout(function() {
    tank._gameStarted = true;
    handler();
  }, delayMs);
}

// 方案三：基于场景状态的检测方法
function waitForGameSceneReady(handler) {
  let checkCount = 0;
  const maxCheckCount = 50;
  const checkInterval = 100;
  
  const checkIntervalId = setInterval(function() {
    checkCount++;
    
    // 检查当前场景
    const currentScene = Game.sceneManager.getScene();
    
    if (currentScene && currentScene.constructor.name === 'GameScene') {
      console.log('检测到游戏场景已加载');
      clearInterval(checkIntervalId);
      
      // 再等待一下确保关卡完全初始化
      setTimeout(function() {
        tank._gameStarted = true;
        handler();
      }, 500);
    }
    
    // 超时处理
    if (checkCount >= maxCheckCount) {
      console.error('无法检测到游戏场景，请检查游戏状态');
      clearInterval(checkIntervalId);
    }
  }, checkInterval);
}

// 改进的测试函数示例
function improvedTestBattleCityControl() {
  // 开始编程关卡
  console.log('执行 tank.startProgrammingLevel()');
  tank.startProgrammingLevel();
  
  // 使用方案一：事件监听 + 轮询双重保险
  console.log('开始等待游戏开始...');
  const cleanup = waitForGameStart(function() {
    console.log('游戏已开始，执行测试序列');
    runTestSequence();
    
    // 清理资源
    if (typeof cleanup === 'function') {
      cleanup();
    }
  });
}

// 使用方案二的示例
function testWithDelay() {
  tank.startProgrammingLevel();
  
  // 等待3秒（根据实际加载时间调整）
  waitForGameStartWithDelay(3000, function() {
    console.log('游戏已准备就绪（基于延迟）');
    runTestSequence();
  });
}

// 使用方案三的示例
function testWithSceneCheck() {
  tank.startProgrammingLevel();
  
  // 等待游戏场景加载完成
  waitForGameSceneReady(function() {
    console.log('游戏场景已准备就绪');
    runTestSequence();
  });
}

// 兼容原接口的改进函数
function runTestSequence() {
  console.log('开始执行测试序列...');
  
  // 这里放原有的测试序列代码
  console.log('测试序列执行完成');
}

// 导出函数（可选）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    waitForGameStart,
    waitForGameStartWithDelay,
    waitForGameSceneReady,
    improvedTestBattleCityControl,
    testWithDelay,
    testWithSceneCheck
  };
}

console.log('游戏开始等待方法改进方案已加载');
console.log('可用函数:');
console.log('  improvedTestBattleCityControl() - 使用改进的游戏开始检测');
console.log('  testWithDelay() - 使用延迟方法等待游戏开始');
console.log('  testWithSceneCheck() - 使用场景检测方法等待游戏开始');
console.log('  waitForGameStart(handler) - 通用的游戏开始等待函数');

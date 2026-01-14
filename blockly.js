// Blockly 初始化和配置
window.addEventListener('load', function() {
  // 设置Blockly使用中文语言
  Blockly.setLocale(Blockly.Msg);
});

// 初始化Blockly编辑器
function initBlockly() {
  // 定义块
  // 移动类块
  Blockly.Blocks['tank_forward'] = {
    init: function() {
      this.appendDummyInput()
          .appendField('前进')
          .appendField(new Blockly.FieldNumber(100, 1, 1000, 10), 'DISTANCE')
          .appendField('像素');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(210);
      this.setTooltip('向前移动指定距离');
      this.setHelpUrl('');
    }
  };

  Blockly.Blocks['tank_backward'] = {
    init: function() {
      this.appendDummyInput()
          .appendField('后退')
          .appendField(new Blockly.FieldNumber(100, 1, 1000, 10), 'DISTANCE')
          .appendField('像素');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(210);
      this.setTooltip('向后移动指定距离');
      this.setHelpUrl('');
    }
  };

  Blockly.Blocks['tank_turn'] = {
    init: function() {
      this.appendDummyInput()
          .appendField('转向')
          .appendField(new Blockly.FieldDropdown([['左', 'LEFT'], ['右', 'RIGHT']]), 'DIRECTION')
          .appendField(new Blockly.FieldNumber(90, 1, 360, 1), 'DEGREES')
          .appendField('度');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(210);
      this.setTooltip('向指定方向旋转指定角度');
      this.setHelpUrl('');
    }
  };

  Blockly.Blocks['tank_stop'] = {
    init: function() {
      this.appendDummyInput()
          .appendField('停止');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(210);
      this.setTooltip('停止移动');
      this.setHelpUrl('');
    }
  };

  // 武器控制类块
  Blockly.Blocks['tank_fire'] = {
    init: function() {
      this.appendDummyInput()
          .appendField('发射子弹');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(0);
      this.setTooltip('发射一颗子弹');
      this.setHelpUrl('');
    }
  };

  Blockly.Blocks['tank_fire_interval'] = {
    init: function() {
      this.appendDummyInput()
          .appendField('以')
          .appendField(new Blockly.FieldNumber(500, 100, 2000, 100), 'INTERVAL')
          .appendField('毫秒间隔连续发射子弹');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(0);
      this.setTooltip('以指定时间间隔连续发射子弹');
      this.setHelpUrl('');
    }
  };

  // 状态感知类块
  Blockly.Blocks['tank_has_enemy'] = {
    init: function() {
      this.appendDummyInput()
          .appendField('检测到敌人');
      this.setOutput(true, 'Boolean');
      this.setColour(65);
      this.setTooltip('检测前方是否有敌人');
      this.setHelpUrl('');
    }
  };

  Blockly.Blocks['tank_enemy_distance'] = {
    init: function() {
      this.appendDummyInput()
          .appendField('与最近敌人的距离');
      this.setOutput(true, 'Number');
      this.setColour(65);
      this.setTooltip('获取与最近敌人的距离（像素）');
      this.setHelpUrl('');
    }
  };

  Blockly.Blocks['tank_health'] = {
    init: function() {
      this.appendDummyInput()
          .appendField('生命值');
      this.setOutput(true, 'Number');
      this.setColour(65);
      this.setTooltip('获取当前生命值');
      this.setHelpUrl('');
    }
  };

  Blockly.Blocks['tank_x'] = {
    init: function() {
      this.appendDummyInput()
          .appendField('X坐标');
      this.setOutput(true, 'Number');
      this.setColour(65);
      this.setTooltip('获取坦克当前的X坐标');
      this.setHelpUrl('');
    }
  };

  Blockly.Blocks['tank_y'] = {
    init: function() {
      this.appendDummyInput()
          .appendField('Y坐标');
      this.setOutput(true, 'Number');
      this.setColour(65);
      this.setTooltip('获取坦克当前的Y坐标');
      this.setHelpUrl('');
    }
  };

  // 流程控制类块
  Blockly.Blocks['tank_if_enemy'] = {
    init: function() {
      this.appendDummyInput()
          .appendField('如果前方有敌人');
      this.appendStatementInput('DO')
          .setCheck(null);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(290);
      this.setTooltip('如果前方检测到敌人，则执行内部语句');
      this.setHelpUrl('');
    }
  };

  Blockly.Blocks['tank_if_low_health'] = {
    init: function() {
      this.appendDummyInput()
          .appendField('如果生命值低于')
          .appendField(new Blockly.FieldNumber(20, 0, 100), 'THRESHOLD');
      this.appendStatementInput('DO')
          .setCheck(null);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(290);
      this.setTooltip('如果生命值低于指定阈值，则执行内部语句');
      this.setHelpUrl('');
    }
  };

  Blockly.Blocks['tank_wait'] = {
    init: function() {
      this.appendDummyInput()
          .appendField('等待')
          .appendField(new Blockly.FieldNumber(1000, 0, 10000, 10), 'TIME')
          .appendField('毫秒');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(290);
      this.setTooltip('暂停指定时间后继续执行');
      this.setHelpUrl('');
    }
  };

  // 高级策略类块
  Blockly.Blocks['tank_approach_enemy'] = {
    init: function() {
      this.appendDummyInput()
          .appendField('向最近敌人移动');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(160);
      this.setTooltip('自动计算路径并向最近敌人移动');
      this.setHelpUrl('');
    }
  };

  Blockly.Blocks['tank_patrol'] = {
    init: function() {
      this.appendDummyInput()
          .appendField('从')
          .appendField(new Blockly.FieldTextInput('A点'), 'POINT_A')
          .appendField('到')
          .appendField(new Blockly.FieldTextInput('B点'), 'POINT_B')
          .appendField('巡逻');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(160);
      this.setTooltip('在两点之间自动巡逻');
      this.setHelpUrl('');
    }
  };

  Blockly.Blocks['tank_avoid'] = {
    init: function() {
      this.appendDummyInput()
          .appendField('避开障碍物');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(160);
      this.setTooltip('自动检测并避开前方障碍物');
      this.setHelpUrl('');
    }
  };

  // 游戏控制类块
  Blockly.Blocks['tank_start_programming_level'] = {
    init: function() {
      this.appendDummyInput()
          .appendField('开始游戏');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(120);
      this.setTooltip('开始编程关卡');
      this.setHelpUrl('');
    }
  };

  Blockly.Blocks['tank_wait_game_start'] = {
    init: function() {
      this.appendDummyInput()
          .appendField('等待游戏开始');
      this.appendStatementInput('DO')
          .setCheck(null);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(290);
      this.setTooltip('等待游戏开始后执行内部语句');
      this.setHelpUrl('');
    }
  };

  // 定义toolbox配置
  var toolboxConfig = {
    "kind": "categoryToolbox",
    "contents": [
      {
        "kind": "category",
        "name": "运动控制",
        "colour": 210,
        "contents": [
          {"kind": "block", "type": "tank_forward"},
          {"kind": "block", "type": "tank_backward"},
          {"kind": "block", "type": "tank_turn"},
          {"kind": "block", "type": "tank_stop"}
        ]
      },
      {
        "kind": "category",
        "name": "武器控制",
        "colour": 0,
        "contents": [
          {"kind": "block", "type": "tank_fire"},
          {"kind": "block", "type": "tank_fire_interval"}
        ]
      },
      {
        "kind": "category",
        "name": "状态感知",
        "colour": 65,
        "contents": [
          {"kind": "block", "type": "tank_has_enemy"},
          {"kind": "block", "type": "tank_enemy_distance"},
          {"kind": "block", "type": "tank_health"},
          {"kind": "block", "type": "tank_x"},
          {"kind": "block", "type": "tank_y"}
        ]
      },
      {
        "kind": "category",
        "name": "流程控制",
        "colour": 290,
        "contents": [
          {"kind": "block", "type": "tank_if_enemy"},
          {"kind": "block", "type": "tank_if_low_health"},
          {"kind": "block", "type": "tank_wait"}
        ]
      },
      {
        "kind": "category",
        "name": "高级策略",
        "colour": 160,
        "contents": [
          {"kind": "block", "type": "tank_approach_enemy"},
          {"kind": "block", "type": "tank_patrol"},
          {"kind": "block", "type": "tank_avoid"}
        ]
      },
      {
        "kind": "category",
        "name": "游戏控制",
        "colour": 120,
        "contents": [
          {"kind": "block", "type": "tank_start_programming_level"},
          {"kind": "block", "type": "tank_wait_game_start"}
        ]
      }
    ]
  };

  // 创建Blockly工作区
  var workspace = Blockly.inject('blockly-div', {
    media: 'third-party/blockly/media/',
    toolbox: toolboxConfig,
    theme: Blockly.Themes.Classic,
    scrollbars: true
  });
    
    // 监听工作区变化，实时生成代码
    workspace.addChangeListener(function() {
      var code = Blockly.JavaScript.workspaceToCode(workspace);
      updateAceEditor(code);
    });
    
    // 运行按钮
    var runButton = document.createElement('button');
    runButton.innerHTML = '运行代码';
    runButton.style.marginRight = '10px';
    runButton.onclick = function() {
      var code = Blockly.JavaScript.workspaceToCode(workspace);
      try {
        eval(code);
      } catch (e) {
        console.error('代码执行错误:', e);
      }
    };
    
    // 清空按钮
    var clearButton = document.createElement('button');
    clearButton.innerHTML = '清空';
    clearButton.onclick = function() {
      workspace.clear();
    };
    
    // 将按钮添加到编辑器容器
    document.getElementById('editor-container').insertBefore(runButton, document.getElementById('code-div'));
    document.getElementById('editor-container').insertBefore(clearButton, document.getElementById('code-div'));
  
  // 创建坦克控制的自定义块
  Blockly.Blocks['tank_start'] = {
    init: function() {
      this.appendDummyInput()
          .appendField('开始编程关卡');
      this.appendStatementInput('DO')
          .setCheck(null);
      this.setPreviousStatement(false);
      this.setNextStatement(false);
      this.setColour(330);
      this.setTooltip('开始坦克编程关卡');
      this.setHelpUrl('');
    }
  };

  Blockly.Blocks['tank_move_up'] = {
    init: function() {
      this.appendDummyInput()
          .appendField('向上移动');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(330);
      this.setTooltip('控制坦克向上移动');
      this.setHelpUrl('');
    }
  };

  Blockly.Blocks['tank_move_down'] = {
    init: function() {
      this.appendDummyInput()
          .appendField('向下移动');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(330);
      this.setTooltip('控制坦克向下移动');
      this.setHelpUrl('');
    }
  };

  Blockly.Blocks['tank_move_left'] = {
    init: function() {
      this.appendDummyInput()
          .appendField('向左移动');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(330);
      this.setTooltip('控制坦克向左移动');
      this.setHelpUrl('');
    }
  };

  Blockly.Blocks['tank_move_right'] = {
    init: function() {
      this.appendDummyInput()
          .appendField('向右移动');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(330);
      this.setTooltip('控制坦克向右移动');
      this.setHelpUrl('');
    }
  };

  Blockly.Blocks['tank_stop'] = {
    init: function() {
      this.appendDummyInput()
          .appendField('停止移动');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(330);
      this.setTooltip('停止坦克移动');
      this.setHelpUrl('');
    }
  };

  Blockly.Blocks['tank_shoot'] = {
    init: function() {
      this.appendDummyInput()
          .appendField('开火');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(230);
      this.setTooltip('控制坦克开火');
      this.setHelpUrl('');
    }
  };

  Blockly.Blocks['tank_stop_shoot'] = {
    init: function() {
      this.appendDummyInput()
          .appendField('停止开火');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(230);
      this.setTooltip('停止坦克开火');
      this.setHelpUrl('');
    }
  };

  Blockly.Blocks['tank_delay'] = {
    init: function() {
      this.appendValueInput('TIME')
          .setCheck('Number')
          .appendField('延迟');
      this.appendDummyInput()
          .appendField('毫秒');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(160);
      this.setTooltip('延迟执行后续操作指定的毫秒数');
      this.setHelpUrl('');
    }
  };

  Blockly.Blocks['tank_number'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldNumber(1000), "NUM");
      this.setOutput(true, "Number");
      this.setColour(260);
      this.setTooltip('');
      this.setHelpUrl('');
    }
  };

  Blockly.Blocks['tank_on_enemy_approaching'] = {
    init: function() {
      this.appendStatementInput('DO')
          .setCheck(null)
          .appendField('当敌人接近时');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(290);
      this.setTooltip('当敌人接近时执行操作');
      this.setHelpUrl('');
    }
  };

  Blockly.Blocks['tank_on_enemy_at_distance'] = {
    init: function() {
      this.appendStatementInput('DO')
          .setCheck(null)
          .appendField('当敌人在距离');
      this.appendValueInput('DISTANCE')
          .setCheck('Number');
      this.appendDummyInput()
          .appendField('以内时');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(290);
      this.setTooltip('当敌人在指定距离以内时执行操作');
      this.setHelpUrl('');
    }
  };

  Blockly.Blocks['tank_get_closest_enemy_distance'] = {
    init: function() {
      this.appendDummyInput()
          .appendField('最近敌人距离');
      this.setOutput(true, "Number");
      this.setColour(65);
      this.setTooltip('获取最近敌人的距离');
      this.setHelpUrl('');
    }
  };

  Blockly.Blocks['tank_distance_callback'] = {
    init: function() {
      this.appendDummyInput()
          .appendField('距离值');
      this.setOutput(true, "Number");
      this.setColour(65);
      this.setTooltip('获取回调中的距离值');
      this.setHelpUrl('');
    }
  };

  Blockly.Blocks['tank_on_game_started'] = {
    init: function() {
      this.appendStatementInput('DO')
          .setCheck(null)
          .appendField('当游戏开始时');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(290);
      this.setTooltip('当游戏开始时执行操作');
      this.setHelpUrl('');
    }
  };

  // JavaScript生成器函数
  Blockly.JavaScript['tank_start'] = function(block) {
    var statements_do = Blockly.JavaScript.statementToCode(block, 'DO');
    var code = 'tank.startProgrammingLevel();\n';
    code += 'function onGameStarted() {\n';
    code += statements_do;
    code += '}\n';
    code += 'if (tank.isGameStarted()) {\n';
    code += '  onGameStarted();\n';
    code += '} else {\n';
    code += '  // 等待游戏开始\n';
    code += '  var gameStartSubscriber = {\n';
    code += '    notify: function(event) {\n';
    code += '      if (event.name === "Level.Event.GAME_STARTED") {\n';
    code += '        tank._gameStarted = true;\n';
    code += '        onGameStarted();\n';
    code += '      }\n';
    code += '    }\n';
    code += '  };\n';
    code += '  Game.eventManager.addSubscriber(gameStartSubscriber, ["Level.Event.GAME_STARTED"]);\n';
    code += '}\n';
    return code;
  };

  Blockly.JavaScript['tank_move_up'] = function(block) {
    return 'tank.moveUp();\n';
  };

  Blockly.JavaScript['tank_move_down'] = function(block) {
    return 'tank.moveDown();\n';
  };

  Blockly.JavaScript['tank_move_left'] = function(block) {
    return 'tank.moveLeft();\n';
  };

  Blockly.JavaScript['tank_move_right'] = function(block) {
    return 'tank.moveRight();\n';
  };

  Blockly.JavaScript['tank_stop'] = function(block) {
    return 'tank.stopMoving();\n';
  };

  Blockly.JavaScript['tank_shoot'] = function(block) {
    return 'tank.shoot();\n';
  };

  Blockly.JavaScript['tank_stop_shoot'] = function(block) {
    return 'tank.stopShooting();\n';
  };

  Blockly.JavaScript['tank_delay'] = function(block) {
    var time = Blockly.JavaScript.valueToCode(block, 'TIME', Blockly.JavaScript.ORDER_ATOMIC);
    var statements_do = Blockly.JavaScript.statementToCode(block, 'DO');
    return 'setTimeout(function() {\n' + statements_do + '}, ' + time + ');\n';
  };

  Blockly.JavaScript['tank_number'] = function(block) {
    var num = block.getFieldValue('NUM');
    return [num, Blockly.JavaScript.ORDER_ATOMIC];
  };

  Blockly.JavaScript['tank_on_enemy_approaching'] = function(block) {
    var statements_do = Blockly.JavaScript.statementToCode(block, 'DO');
    var functionName = Blockly.JavaScript.provideFunction_(
        'tank_onEnemyApproachingHandler',
        ['function ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ + '(distance) {',
         statements_do,
         '}']);
    return 'tank.onEnemyApproaching(' + functionName + ');\n';
  };

  Blockly.JavaScript['tank_on_enemy_at_distance'] = function(block) {
    var statements_do = Blockly.JavaScript.statementToCode(block, 'DO');
    var functionName = Blockly.JavaScript.provideFunction_(
        'tank_onEnemyAtDistanceHandler',
        ['function ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ + '(distance) {',
         statements_do,
         '}']);
    return 'tank.onEnemyAtDistance(' + functionName + ');\n';
  };

  Blockly.JavaScript['tank_get_closest_enemy_distance'] = function(block) {
    return ['tank.getClosestEnemyDistance()', Blockly.JavaScript.ORDER_ATOMIC];
  };

  Blockly.JavaScript['tank_distance_callback'] = function(block) {
    return ['distance', Blockly.JavaScript.ORDER_ATOMIC];
  };

  Blockly.JavaScript['tank_on_game_started'] = function(block) {
    var statements_do = Blockly.JavaScript.statementToCode(block, 'DO');
    var functionName = Blockly.JavaScript.provideFunction_(
        'tank_onGameStartedHandler',
        ['function ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ + '() {',
         statements_do,
         '}']);
    return 'tank.onGameStarted(' + functionName + ');\n';
  };

  // 添加新的JavaScript生成器函数
  Blockly.JavaScript['tank_move_forward'] = function(block) {
    var distance = block.getFieldValue('DISTANCE');
    return 'tank.moveForward(' + distance + ');\n';
  };

  Blockly.JavaScript['tank_forward'] = function(block) {
    var distance = block.getFieldValue('DISTANCE');
    return 'tank.forward(' + distance + ');\n';
  };

  Blockly.JavaScript['tank_move_backward'] = function(block) {
    var distance = block.getFieldValue('DISTANCE');
    return 'tank.moveBackward(' + distance + ');\n';
  };

  Blockly.JavaScript['tank_backward'] = function(block) {
    var distance = block.getFieldValue('DISTANCE');
    return 'tank.backward(' + distance + ');\n';
  };

  Blockly.JavaScript['tank_rotate'] = function(block) {
    var direction = block.getFieldValue('DIRECTION');
    var angle = block.getFieldValue('ANGLE');
    return 'tank.rotate("' + direction + '", ' + angle + ');\n';
  };

  Blockly.JavaScript['tank_turn'] = function(block) {
    var direction = block.getFieldValue('DIRECTION');
    var angle = block.getFieldValue('ANGLE');
    return 'tank.turn("' + direction + '", ' + angle + ');\n';
  };

  Blockly.JavaScript['tank_fire'] = function(block) {
    return 'tank.shoot();\n';
  };

  Blockly.JavaScript['tank_set_fire_interval'] = function(block) {
    var interval = block.getFieldValue('INTERVAL');
    return 'tank.setFireInterval(' + interval + ');\n';
  };

  Blockly.JavaScript['tank_fire_interval'] = function(block) {
    var interval = block.getFieldValue('INTERVAL');
    return 'tank.fire_interval(' + interval + ');\n';
  };

  Blockly.JavaScript['tank_detect_enemy'] = function(block) {
    return ['tank.detectEnemy()', Blockly.JavaScript.ORDER_ATOMIC];
  };

  Blockly.JavaScript['tank_has_enemy'] = function(block) {
    return ['tank.has_enemy()', Blockly.JavaScript.ORDER_ATOMIC];
  };

  Blockly.JavaScript['tank_get_distance_to_enemy'] = function(block) {
    return ['tank.getDistanceToEnemy()', Blockly.JavaScript.ORDER_ATOMIC];
  };

  Blockly.JavaScript['tank_enemy_distance'] = function(block) {
    return ['tank.enemy_distance()', Blockly.JavaScript.ORDER_ATOMIC];
  };

  Blockly.JavaScript['tank_get_health'] = function(block) {
    return ['tank.getHealth()', Blockly.JavaScript.ORDER_ATOMIC];
  };

  Blockly.JavaScript['tank_health'] = function(block) {
    return ['tank.health()', Blockly.JavaScript.ORDER_ATOMIC];
  };

  Blockly.JavaScript['tank_get_position_x'] = function(block) {
    return ['tank.getPositionX()', Blockly.JavaScript.ORDER_ATOMIC];
  };

  Blockly.JavaScript['tank_x'] = function(block) {
    return ['tank.x()', Blockly.JavaScript.ORDER_ATOMIC];
  };

  Blockly.JavaScript['tank_get_position_y'] = function(block) {
    return ['tank.getPositionY()', Blockly.JavaScript.ORDER_ATOMIC];
  };

  Blockly.JavaScript['tank_y'] = function(block) {
    return ['tank.y()', Blockly.JavaScript.ORDER_ATOMIC];
  };

  // 添加新的JavaScript生成器函数
  Blockly.JavaScript['tank_approach_enemy'] = function(block) {
    return 'tank.approach_enemy();\n';
  };

  Blockly.JavaScript['tank_avoid'] = function(block) {
    return 'tank.avoid();\n';
  };

  Blockly.JavaScript['tank_patrol'] = function(block) {
    var pointA = block.getFieldValue('POINT_A');
    var pointB = block.getFieldValue('POINT_B');
    return 'tank.patrol("' + pointA + '", "' + pointB + '");\n';
  };

  Blockly.JavaScript['tank_if_enemy'] = function(block) {
    var statements_do = Blockly.JavaScript.statementToCode(block, 'DO');
    return 'if (tank.detectEnemy()) {\n' + statements_do + '}\n';
  };

  Blockly.JavaScript['tank_if_low_health'] = function(block) {
    var threshold = block.getFieldValue('THRESHOLD');
    var statements_do = Blockly.JavaScript.statementToCode(block, 'DO');
    return 'if (tank.getHealth() < ' + threshold + ') {\n' + statements_do + '}\n';
  };

  Blockly.JavaScript['tank_wait'] = function(block) {
    var time = block.getFieldValue('TIME');
    return 'tank.delay(' + time + ', function() {\n';
  };

  // 开始游戏块的JavaScript生成器
  Blockly.JavaScript['tank_start_programming_level'] = function(block) {
    return 'tank.startProgrammingLevel();\n';
  };

  // 等待游戏开始块的JavaScript生成器
  Blockly.JavaScript['tank_wait_game_start'] = function(block) {
    var statements_do = Blockly.JavaScript.statementToCode(block, 'DO');
    var code = 'function waitForGameStart() {\n';
    code += '  if (tank.isGameStarted()) {\n';
    code += statements_do;
    code += '  } else {\n';
    code += '    setTimeout(waitForGameStart, 100);\n';
    code += '  }\n';
    code += '}\n';
    code += 'waitForGameStart();\n';
    return code;
  };
}

// 页面加载完成后初始化Blockly
window.addEventListener('load', initBlockly);
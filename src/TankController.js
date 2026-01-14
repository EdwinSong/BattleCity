function TankController(eventManager, tank) {
  SpriteController.call(this, eventManager, tank);
  this._eventManager.addSubscriber(this, [BaseExplosion.Event.DESTROYED]);
  this._active = true;
}

TankController.subclass(SpriteController);

TankController.prototype.notify = function (event) {
  SpriteController.prototype.notify.call(this, event);
  
  if (event.name == BaseExplosion.Event.DESTROYED) {
    this._sprite.stop();
    this._active = false;
  }
};

TankController.prototype.keyPressed = function (key) {
  if (!this._active) {
    return;
  }
  
  // 移动命令需要检查canMove
  if (key == Keyboard.Key.LEFT || key == Keyboard.Key.RIGHT || 
      key == Keyboard.Key.UP || key == Keyboard.Key.DOWN) {
    if (!this._sprite.canMove()) {
      return;
    }
    SpriteController.prototype.keyPressed.call(this, key);
  }
  
  // 射击命令不需要检查canMove
  if (key == Keyboard.Key.SPACE) {
    // 只在玩家坦克射击时输出日志
    if (this._sprite.isPlayer()) {
      console.log('Player Tank Controller keyPressed for shoot');
    }
    this._sprite.shoot();
  }
};

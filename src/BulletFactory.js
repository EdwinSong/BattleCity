function BulletFactory(eventManager) {
  this._eventManager = eventManager;
  this._eventManager.addSubscriber(this, [Tank.Event.SHOOT]);
}

BulletFactory.prototype.notify = function (event) {
  if (event.name == Tank.Event.SHOOT) {
    this.createBullet(event.tank);
  }
};

BulletFactory.prototype.createBullet = function (tank) {
  // 只在玩家坦克射击时输出详细日志
  if (tank.isPlayer()) {
    console.log('BulletFactory.createBullet() called for player tank:', {
      tankType: tank._type,
      tankPosition: {x: tank._x, y: tank._y},
      tankDirection: tank._direction,
      tankBulletSize: tank.getBulletSize(),
      tankBulletSpeed: tank.getBulletSpeed(),
      tankBulletType: tank.getBulletType()
    });
    
    var bullet = new Bullet(this._eventManager, tank);
    var bulletPosition = this._getBulletPosition(tank);
    console.log('Calculated bullet position:', bulletPosition);
    
    bullet.setPosition(bulletPosition);
    bullet.setDimensions(tank.getBulletSize(), tank.getBulletSize());
    bullet.setDirection(tank.getDirection());
    bullet.setSpeed(tank.getBulletSpeed());
    bullet.setType(tank.getBulletType());
    
    console.log('Bullet created successfully:', {
      position: {x: bullet._x, y: bullet._y},
      dimensions: {width: bullet._w, height: bullet._h},
      direction: bullet._direction,
      speed: bullet._speed
    });
  } else {
    // AI坦克射击时不输出日志，只创建子弹
    var bullet = new Bullet(this._eventManager, tank);
    bullet.setPosition(this._getBulletPosition(tank));
    bullet.setDimensions(tank.getBulletSize(), tank.getBulletSize());
    bullet.setDirection(tank.getDirection());
    bullet.setSpeed(tank.getBulletSpeed());
    bullet.setType(tank.getBulletType());
  }
  
  if (tank.isPlayer()) {
    SoundManager.play("bullet_shot");
  }
  
  return bullet;
};

BulletFactory.prototype._getBulletPosition = function (tank) {
  var x, y;
  var direction = tank.getDirection();
  
  if (direction == Sprite.Direction.RIGHT) {
    x = tank.getRight() - 1;
    y = tank.getTop() + tank.getHeight() / 2 - tank.getBulletSize() / 2;
  }
  else if (direction == Sprite.Direction.LEFT) {
    x = tank.getLeft() + 1;
    y = tank.getTop() + tank.getHeight() / 2 - tank.getBulletSize() / 2;
  }
  else if (direction == Sprite.Direction.UP) {
    x = tank.getLeft() + tank.getWidth() / 2 - tank.getBulletSize() / 2;
    y = tank.getTop() + 1;
  }
  else if (direction == Sprite.Direction.DOWN) {
    x = tank.getLeft() + tank.getWidth() / 2 - tank.getBulletSize() / 2;
    y = tank.getBottom() - 1;
  }
  
  return new Point(x, y);
};

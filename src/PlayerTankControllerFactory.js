function PlayerTankControllerFactory(eventManager) {
  this._eventManager = eventManager;
  this._eventManager.addSubscriber(this, [PlayerTankFactory.Event.PLAYER_TANK_CREATED]);
  this._controllers = [];
}

PlayerTankControllerFactory.prototype.notify = function (event) {
  if (event.name == PlayerTankFactory.Event.PLAYER_TANK_CREATED) {
    this.create(event.tank);
  }
};

PlayerTankControllerFactory.prototype.create = function (tank) {
  var controller = new TankController(this._eventManager, tank);
  this._controllers.push(controller);
  return controller;
};

PlayerTankControllerFactory.prototype.getControllers = function() {
  return this._controllers;
};

PlayerTankControllerFactory.prototype.getLatestController = function() {
  // 确保只返回玩家坦克的控制器
  for (var i = this._controllers.length - 1; i >= 0; i--) {
    var controller = this._controllers[i];
    if (controller._sprite && controller._sprite.isPlayer()) {
      return controller;
    }
  }
  return null;
};

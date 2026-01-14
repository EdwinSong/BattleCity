function DistanceMonitor(eventManager, spriteContainer) {
  this._eventManager = eventManager;
  this._spriteContainer = spriteContainer;
  
  this._approachingDistance = 3 * Globals.UNIT_SIZE; // 接近距离阈值
  this._atDistanceThreshold = 5 * Globals.UNIT_SIZE; // 一定距离阈值
}

DistanceMonitor.prototype.setApproachingDistance = function(distance) {
  this._approachingDistance = distance;
};

DistanceMonitor.prototype.setAtDistanceThreshold = function(threshold) {
  this._atDistanceThreshold = threshold;
};

DistanceMonitor.prototype.getApproachingDistance = function() {
  return this._approachingDistance;
};

DistanceMonitor.prototype.getAtDistanceThreshold = function() {
  return this._atDistanceThreshold;
};

DistanceMonitor.prototype.update = function() {
  var playerTanks = this._getPlayerTanks();
  var enemyTanks = this._spriteContainer.getEnemyTanks();
  
  playerTanks.forEach(function(playerTank) {
    enemyTanks.forEach(function(enemyTank) {
      var distance = this._calculateDistance(playerTank, enemyTank);
      
      if (distance <= this._approachingDistance) {
        this._eventManager.fireEvent({
          name: Tank.Event.ENEMY_APPROACHING,
          playerTank: playerTank,
          enemyTank: enemyTank,
          distance: distance
        });
      }
      
      this._eventManager.fireEvent({
        name: Tank.Event.ENEMY_AT_DISTANCE,
        playerTank: playerTank,
        enemyTank: enemyTank,
        distance: distance
      });
    }, this);
  }, this);
};

DistanceMonitor.prototype._getPlayerTanks = function() {
  return this._spriteContainer.getSprites().filter(function(sprite) {
    return sprite instanceof Tank && sprite.isPlayer();
  });
};

DistanceMonitor.prototype._calculateDistance = function(tank1, tank2) {
  var center1 = tank1.getCenter();
  var center2 = tank2.getCenter();
  
  var dx = center1.getX() - center2.getX();
  var dy = center1.getY() - center2.getY();
  
  return Math.sqrt(dx * dx + dy * dy);
};
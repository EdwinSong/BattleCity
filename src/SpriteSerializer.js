function SpriteSerializer(eventManager) {
  this._eventManager = eventManager;
}

SpriteSerializer.SEPARATOR = ';';

SpriteSerializer.prototype.serializeSprite = function (sprite) {
  return sprite.getClassName() + '(' + sprite.getX() + ',' + sprite.getY() + ')';
};

SpriteSerializer.prototype.serializeSprites = function (sprites) {
  var result = [];
  sprites.forEach(function (sprite) {
    result.push(this.serializeSprite(sprite));
  }, this);
  return result.join(SpriteSerializer.SEPARATOR);
};

SpriteSerializer.prototype.unserializeSprites = function (text) {
  var result = [];
  var strings = text.split(SpriteSerializer.SEPARATOR);
  strings.forEach(function (str) {
    str = str.trim(); // Remove whitespace
    if (!str) return; // Skip empty strings
    
    var matches = str.match(/(\w+)\((\d+),(\d+)\)/);
    if (!matches) return; // Skip invalid format
    
    var className = matches[1];
    var x = parseInt(matches[2]);
    var y = parseInt(matches[3]);
    var sprite = new window[className](this._eventManager);
    sprite.setPosition(new Point(x, y));
    result.push(sprite);
  }, this);
  return result;
};

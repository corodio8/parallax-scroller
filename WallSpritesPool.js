function WallSpritesPool() {
  this.cacheSize = 6;
  this.edgeCacheSize = 2;

  this.createWindows();
  this.createDecorations();
  this.createFrontEdges();
  this.createBackEdges();
};

//Create Window Array
WallSpritesPool.prototype.createWindows = function() {
  this.windows = [];

  this.AddWindowSprites(this.cacheSize,'window_01');
  this.AddWindowSprites(this.cacheSize,'window_02');

  this.shuffle(this.windows);
}; 

//Create Deco Array
WallSpritesPool.prototype.createDecorations = function() {
  this.decorations = [];

  this.AddDecorationSprites(this.cacheSize,'decoration_01');
  this.AddDecorationSprites(this.cacheSize,'decoration_02');
  this.AddDecorationSprites(this.cacheSize,'decoration_03');

  this.shuffle(this.decorations);
};

//Create Front Edge Array
WallSpritesPool.prototype.createFrontEdges = function() {
  this.frontEdges = [];

  this.AddDecorationSprites(this.cacheSize,'edge_01');
  this.AddDecorationSprites(this.cacheSize,'edge_02');

  this.shuffle(this.frontEdges);
};

//Create Back Edge Array
WallSpritesPool.prototype.createBackEdges = function() {
  this.backEdges = [];

  this.AddBackEdgeSprites(this.cacheSize,'edge_01');
  this.AddBackEdgeSprites(this.cacheSize,'edge_02');

  this.shuffle(this.backEdges);
};

//Add Window Sprites
WallSpritesPool.prototype.AddWindowSprites = function(amount, frameId) {
  for (var i = 0; i < amount; i++) {
    var sprite = PIXI.Sprite.fromFrame(frameId);
    this.windows.push(sprite);
  }
};

//Add Deco Sprites
WallSpritesPool.prototype.AddDecorationSprites = function(amount, frameId) {
  for (var i = 0; i < amount; i++) {
    var sprite = PIXI.Sprite.fromFrame(frameId);
    this.decorations.push(sprite);
  }
};

//Add Front Edge Sprites
WallSpritesPool.prototype.AddFrontEdgeSprites = function(amount, frameId) {
  for (var i = 0; i < amount; i++) {
    var sprite = PIXI.Sprite.fromFrame(frameId);
    this.frontEdges.push(sprite);
  }
};

//Add Back Edge Sprites
WallSpritesPool.prototype.AddBackEdgeSprites = function(amount, frameId) {
  for (var i = 0; i < amount; i++) {
    var sprite = PIXI.Sprite.fromFrame(frameId);
    sprite.anchor.x = 1;
    sprite.scale.x = -1;
    this.backEdges.push(sprite);
  }
};

//Borrow-Remove Windows
WallSpritesPool.prototype.borrowWindow = function() {
  return this.windows.shift();
};

WallSpritesPool.prototype.returnWindow = function(sprite) {
  return this.windows.push(sprite);
};

//Borrow-Remove Decorations
WallSpritesPool.prototype.borrowDecoration = function() {
  return this.decorations.shift();
};

WallSpritesPool.prototype.returnDecoration = function(sprite) {
  return this.decorations.push(sprite);
};

//Borrow-Remove Front Edges
WallSpritesPool.prototype.borrowFrontEdge = function() {
  return this.frontEdges.shift();
};

WallSpritesPool.prototype.returnFrontEdge = function(sprite) {
  return this.frontEdges.push(sprite);
};

//Borrow-Remove Back Edges
WallSpritesPool.prototype.borrowBackEdge = function() {
  return this.backEdges.shift();
};

WallSpritesPool.prototype.returnBackEdge = function(sprite) {
  return this.backEdges.push(sprite);
};



//Utlity Functions
WallSpritesPool.prototype.shuffle = function(array) {
  var len = array.length;
  var shuffles = len * 3;
  for (var i = 0; i < shuffles; i++) {
    var wallSlice = array.pop();
    var pos = Math.floor(Math.random() * (len-1));
    array.splice(pos, 0, wallSlice);
  }
};

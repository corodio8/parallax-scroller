function WallSpritesPool() {
  this.cacheSize = 6;
  this.edgeCacheSize = 6;

  this.createWindows();
  this.createDecorations();
  this.createFrontEdges();
  this.createBackEdges();
  this.createSteps();
};

//Create Arrays, this is the actual creation of the pools.
WallSpritesPool.prototype.createWindows = function() {
  this.windows = [];

  this.AddWindowSprites(this.cacheSize,'window_01');
  this.AddWindowSprites(this.cacheSize,'window_02');

  this.shuffle(this.windows);
}; 

WallSpritesPool.prototype.createDecorations = function() {
  this.decorations = [];

  this.AddDecorationSprites(this.cacheSize,'decoration_01');
  this.AddDecorationSprites(this.cacheSize,'decoration_02');
  this.AddDecorationSprites(this.cacheSize,'decoration_03');

  this.shuffle(this.decorations);
};

WallSpritesPool.prototype.createFrontEdges = function() {
  this.frontEdges = [];

  this.AddFrontEdgeSprites(this.cacheSize,'edge_01');
  this.AddFrontEdgeSprites(this.cacheSize,'edge_02');

  this.shuffle(this.frontEdges);
};

WallSpritesPool.prototype.createBackEdges = function() {
  this.backEdges = [];

  this.AddBackEdgeSprites(this.cacheSize,'edge_01');
  this.AddBackEdgeSprites(this.cacheSize,'edge_02');

  this.shuffle(this.backEdges);
};

WallSpritesPool.prototype.createSteps = function() {
  this.steps = [];
  this.AddStepSprites(this.cacheSize, 'step_01');

};

//Add Sprites, these functions contain the code that does the generation of a single element from images/spritesheet resources.
WallSpritesPool.prototype.AddWindowSprites = function(amount, frameId) {
  for (var i = 0; i < amount; i++) {
    var sprite = PIXI.Sprite.fromFrame(frameId);
    this.windows.push(sprite);
  }
};

WallSpritesPool.prototype.AddDecorationSprites = function(amount, frameId) {
  for (var i = 0; i < amount; i++) {
    var sprite = PIXI.Sprite.fromFrame(frameId);
    this.decorations.push(sprite);
  }
};

WallSpritesPool.prototype.AddFrontEdgeSprites = function(amount, frameId) {
  for (var i = 0; i < amount; i++) {
    var sprite = PIXI.Sprite.fromFrame(frameId);
    this.frontEdges.push(sprite);
  }
};

WallSpritesPool.prototype.AddBackEdgeSprites = function(amount, frameId) {
  for (var i = 0; i < amount; i++) {
    var sprite = PIXI.Sprite.fromFrame(frameId);
    sprite.anchor.x = 1;
    sprite.scale.x = -1;
    this.backEdges.push(sprite);
  }
};

WallSpritesPool.prototype.AddStepSprites = function(amount, frameId) {
  for (var i = 0; i < amount; i++) {
    var sprite = PIXI.Sprite.fromFrame(frameId);
    sprite.anchor.y = 0.25;
    this.steps.push(sprite);
  }
};

//Borrow-Remove Sprites from pools
WallSpritesPool.prototype.borrowWindow = function() {
  return this.windows.shift();
};

WallSpritesPool.prototype.returnWindow = function(sprite) {
  return this.windows.push(sprite);
};

WallSpritesPool.prototype.borrowDecoration = function() {
  return this.decorations.shift();
};

WallSpritesPool.prototype.returnDecoration = function(sprite) {
  return this.decorations.push(sprite);
};

WallSpritesPool.prototype.borrowFrontEdge = function() {
  return this.frontEdges.shift();
};

WallSpritesPool.prototype.returnFrontEdge = function(sprite) {
  return this.frontEdges.push(sprite);
};

WallSpritesPool.prototype.borrowBackEdge = function() {
  return this.backEdges.shift();
};

WallSpritesPool.prototype.returnBackEdge = function(sprite) {
  return this.backEdges.push(sprite);
};

WallSpritesPool.prototype.borrowStep = function() {
  return this.steps.shift();
};

WallSpritesPool.prototype.returnStep = function(sprite) {
  return this.steps.push(sprite);
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

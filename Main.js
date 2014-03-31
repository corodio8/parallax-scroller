function Main() {
  this.stage = new PIXI.Stage(0x66FF99);
  this.renderer = new PIXI.autoDetectRenderer(
    512,
    384,
    document.getElementById('game-canvas')
    );
  this.loadSpriteSheet();
}

Main.SCROLL_SPEED = 5;

Main.prototype.update = function() {
  this.scroller.moveViewportX(5);
  this.renderer.render(this.stage);
  requestAnimFrame(this.update.bind(this));
}

Main.prototype.loadSpriteSheet = function() {
  var assetsToLoad = ['resources/wall.json', 'resources/bg-mid.png', 'resources/bg-far.png'];
  loader = new PIXI.AssetLoader(assetsToLoad);
  loader.onComplete = this.spriteSheetLoaded.bind(this);
  loader.load();
}

Main.prototype.spriteSheetLoaded = function() {
  this.scroller = new Scroller(this.stage)
  requestAnimFrame(this.update.bind(this));

  this.pool = new WallSpritesPool();
  this.wallSlices = [];

};

Main.prototype.generateTestWallSpan = function() {
  var lookupTable = [
    this.pool.borrowFrontEdge,
    this.pool.borrowWindow,
    this.pool.borrowDecoration,
    this.pool.borrowStep,
    this.pool.borrowWindow,
    this.pool.borrowBackEdge
  ];

  var yPos = [
    128, 
    128,
    128,
    192,
    192,
    192
  ];

  for (var i = 0; i < lookupTable.length; i++) {
    var func = lookupTable[i];

    var sprite = func.call(this.pool);
    sprite.position.x = 32 + (i * 64);
    sprite.position.y = yPos[i];

    this.wallSlices.push(sprite);

    this.stage.addChild(sprite);
  }
};

Main.prototype.clearTestWallSpan = function() {
  var lookupTable = [
    this.pool.returnFrontEdge,
    this.pool.returnWindow,
    this.pool.returnDecoration,
    this.pool.returnStep,
    this.pool.returnWindow,
    this.pool.returnBackEdge
  ];

  for (var i = 0; i < lookupTable.length; i++) {
    var func = lookupTable[i];
    var sprite = this.wallSlices[i];

    this.stage.removeChild(sprite);
    func.call(this.pool, sprite);
  }

  this.wallSlices = [];

};

Main.prototype.borrowWallSprites = function(num) {
  for (var i = 0; i < num; i++) {
    if (i % 2 == 0) {
      var sprite = this.pool.borrowWindow();
    } else {
      var sprite = this.pool.borrowDecoration();
    }
    sprite.position.x = -32 + (i * 64);
    sprite.position.y = 128;

    this.wallSlices.push(sprite);
    this.stage.addChild(sprite);
  }
};

Main.prototype.returnWallSprites = function() {
  for (var i = 0; i < this.wallSlices.length; i++) {
    var sprite = this.wallSlices[i];
    this.stage.removeChild(sprite);
    if (i % 2 == 0) {
      var sprite = this.pool.returnWindow(sprite);
    } else {
      var sprite = this.pool.returnDecoration(sprite);
    }
  }

  this.wallSlices = [];
};


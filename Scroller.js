function Scroller(stage) {
  this.far = new Far();
  stage.addChild(this.far);

  this.mid = new Mid();
  stage.addChild(this.mid);

  this.front = new Walls();
  stage.addChild(this.front);

  this.viewportX = 0;
}

Scroller.prototype.setViewportX = function(viewportX) {
  this.viewportX = viewportX;
  this.far.setViewportX(viewportX);
  this.mid.setViewportX(viewportX);
}

Scroller.prototype.getViewportX = function() {
  return this.viewportX;
}

Scroller.prototype.moveViewportX = function(moveUnits) {
  var newViewportX = this.getViewportX() + moveUnits;
  this.setViewportX(newViewportX);
}


Scroller.prototype.update = function () {
  this.far.update();
  this.mid.update();
}

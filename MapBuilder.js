function MapBuilder(walls) {
  this.walls = walls;
  this.createMap();
}

MapBuilder.WALL_HEIGHTS = [
  256, //0
  224, //1
  192, //2
  160, //3
  128  //4
];

MapBuilder.MAP_SIZE = 100;
MapBuilder.MAX_WALL_SIZE = 10;
MapBuilder.MIN_WALL_SIZE = 3;
MapBuilder.MAX_GAP_SIZE = 3;

MapBuilder.prototype.createMap = function() {
  var slicesLeft = MapBuilder.MAP_SIZE;
  
  
  while (slicesLeft > 0) {
    var heightIndex = Math.floor(Math.random() * 5)

    if (slicesLeft < MapBuilder.MAX_WALL_SIZE + this.MAX_GAP_SIZE) {
      //no stepped wall for final wall
      this.createWallSpan(heightIndex, slicesLeft, false, true);

      slicesLeft = 0;
    } else {
      var wallLength = Math.ceil(Math.random() * MapBuilder.MAX_WALL_SIZE);
      if (wallLength < MapBuilder.MIN_WALL_SIZE) { wallLength = MapBuilder.MIN_WALL_SIZE};
      
      if (Math.random() * 2 > 1) {
        this.createWallSpan(heightIndex, wallLength); 
      } else {
        spanBLength = Math.ceil(Math.random() * wallLength - 1 )
        //spanBLength accounts for step and back so must be at least 2
        if (spanBLength < 2) { spanBLength = 2 }
        spanALength = wallLength - spanBLength;

        this.createSteppedWallSpan(heightIndex, spanALength, spanBLength);
      }

      slicesLeft = slicesLeft - wallLength;

      var gapLength = Math.ceil(Math.random() * MapBuilder.MAX_GAP_SIZE);

      this.createGap(gapLength);
      slicesLeft = slicesLeft - gapLength;

    }
  }
    

}

MapBuilder.prototype.addWallFront = function(heightIndex) {
  var y = MapBuilder.WALL_HEIGHTS[heightIndex]
  this.walls.addSlice(SliceType.FRONT, y)
}

MapBuilder.prototype.addWallBack = function(heightIndex) {
  var y = MapBuilder.WALL_HEIGHTS[heightIndex]
  this.walls.addSlice(SliceType.BACK, y)
}

MapBuilder.prototype.addWallMid = function(heightIndex, spanLength) {
  var y = MapBuilder.WALL_HEIGHTS[heightIndex]
  for (var i = 0; i < spanLength; i++) {
    if (i % 2) {
      this.walls.addSlice(SliceType.WINDOW, y);
    }
    else {
      this.walls.addSlice(SliceType.DECORATION, y);
    }
  }
}

MapBuilder.prototype.addWallStep = function(heightIndex) {
  var y = MapBuilder.WALL_HEIGHTS[heightIndex];
  this.walls.addSlice(SliceType.STEP, y);
}

MapBuilder.prototype.createGap = function(spanLength) {
  for (var i = 0; i < spanLength; i++) {
    this.walls.addSlice(SliceType.GAP);
  }
}

MapBuilder.prototype.createWallSpan = function(heightIndex, spanLength, noFront, noBack) {
  noFront = noFront || false;
  noBack = noBack || false;

  if (noFront == false && spanLength > 0) {
    this.addWallFront(heightIndex);
    spanLength--;
  }

  var midSpanLength = spanLength - (noBack ? 0 : 1);
  if (midSpanLength > 0) {
    this.addWallMid(heightIndex, midSpanLength);
    spanLength -= midSpanLength;
  }

  if (noBack == false && spanLength > 0) {
    this.addWallBack(heightIndex);
  }

}

MapBuilder.prototype.createSteppedWallSpan = function(heightIndex, spanALength, spanBLength) {
  if (heightIndex < 2) {
    heightIndex = 2;
  }

  this.createWallSpan(heightIndex, spanALength, false, true);
  this.addWallStep(heightIndex - 2);
  this.createWallSpan(heightIndex - 2, spanBLength - 1, true, false);
}



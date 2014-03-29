var util = require('util');

function Human (name) {
  this.name = name;
}

Human.prototype = {
  sayHi : function() {
    console.log("Hello, my name is " + this.name);
  }
}

function doClone () {
  var apples = 'a';
  console.log(boop);
  console.log(apples);
}

function happyHour () {
  boop = 'd';
  doClone();
}

var myHuman = new Human('Adam');

myHuman.sayHi();
happyHour();

(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;

/* Package-scope variables */
var __coffeescriptShare, ReactiveArray;

(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                               //
// packages/manuel_reactivearray/packages/manuel_reactivearray.js                                //
//                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                 //
(function () {                                                                                   // 1
                                                                                                 // 2
////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                            //
// packages/manuel:reactivearray/ReactiveArray.coffee.js                                      //
//                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                              //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var                                                                                              // 10
  __hasProp = {}.hasOwnProperty,                                                                 // 11
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
                                                                                                 // 13
ReactiveArray = (function(_super) {                                                              // 14
  var isArray;                                                                                   // 15
                                                                                                 // 16
  __extends(ReactiveArray, _super);                                                              // 17
                                                                                                 // 18
  isArray = function(obj) {                                                                      // 19
    return obj instanceof Array;                                                                 // 20
  };                                                                                             // 21
                                                                                                 // 22
  function ReactiveArray(p1, p2) {                                                               // 23
    var dep, item, pause, _i, _len;                                                              // 24
    dep = null;                                                                                  // 25
    pause = false;                                                                               // 26
    this.changed = function() {                                                                  // 27
      if (dep && !pause) {                                                                       // 28
        return dep.changed();                                                                    // 29
      }                                                                                          // 30
    };                                                                                           // 31
    this.depend = function() {                                                                   // 32
      return dep.depend();                                                                       // 33
    };                                                                                           // 34
    if (isArray(p1)) {                                                                           // 35
      for (_i = 0, _len = p1.length; _i < _len; _i++) {                                          // 36
        item = p1[_i];                                                                           // 37
        this.push(item);                                                                         // 38
      }                                                                                          // 39
      dep = p2;                                                                                  // 40
    } else {                                                                                     // 41
      dep = p1;                                                                                  // 42
    }                                                                                            // 43
    if (!(dep instanceof Tracker.Dependency)) {                                                  // 44
      dep = new Tracker.Dependency();                                                            // 45
    }                                                                                            // 46
    this.pause = function() {                                                                    // 47
      return pause = true;                                                                       // 48
    };                                                                                           // 49
    this.resume = function() {                                                                   // 50
      pause = false;                                                                             // 51
      return this.changed();                                                                     // 52
    };                                                                                           // 53
  }                                                                                              // 54
                                                                                                 // 55
  ReactiveArray.prototype.array = function() {                                                   // 56
    this.depend();                                                                               // 57
    return Array.prototype.slice.call(this);                                                     // 58
  };                                                                                             // 59
                                                                                                 // 60
  ReactiveArray.prototype.list = function() {                                                    // 61
    this.depend();                                                                               // 62
    return this;                                                                                 // 63
  };                                                                                             // 64
                                                                                                 // 65
  ReactiveArray.prototype.depend = function() {                                                  // 66
    this.depend();                                                                               // 67
    return this;                                                                                 // 68
  };                                                                                             // 69
                                                                                                 // 70
  ReactiveArray.prototype.push = function() {                                                    // 71
    var item;                                                                                    // 72
    item = ReactiveArray.__super__.push.apply(this, arguments);                                  // 73
    this.changed();                                                                              // 74
    return item;                                                                                 // 75
  };                                                                                             // 76
                                                                                                 // 77
  ReactiveArray.prototype.unshift = function() {                                                 // 78
    var item;                                                                                    // 79
    item = ReactiveArray.__super__.unshift.apply(this, arguments);                               // 80
    this.changed();                                                                              // 81
    return item;                                                                                 // 82
  };                                                                                             // 83
                                                                                                 // 84
  ReactiveArray.prototype.pop = function() {                                                     // 85
    var item;                                                                                    // 86
    item = ReactiveArray.__super__.pop.apply(this, arguments);                                   // 87
    this.changed();                                                                              // 88
    return item;                                                                                 // 89
  };                                                                                             // 90
                                                                                                 // 91
  ReactiveArray.prototype.shift = function() {                                                   // 92
    var item;                                                                                    // 93
    item = ReactiveArray.__super__.shift.apply(this, arguments);                                 // 94
    this.changed();                                                                              // 95
    return item;                                                                                 // 96
  };                                                                                             // 97
                                                                                                 // 98
  ReactiveArray.prototype.remove = function(valueOrPredicate) {                                  // 99
    var i, predicate, removedValues, underlyingArray, value;                                     // 100
    underlyingArray = this;                                                                      // 101
    removedValues = [];                                                                          // 102
    predicate = typeof valueOrPredicate === "function" ? valueOrPredicate : function(value) {    // 103
      return value === valueOrPredicate;                                                         // 104
    };                                                                                           // 105
    i = 0;                                                                                       // 106
    while (i < underlyingArray.length) {                                                         // 107
      value = underlyingArray[i];                                                                // 108
      if (predicate(value)) {                                                                    // 109
        removedValues.push(value);                                                               // 110
        underlyingArray.splice(i, 1);                                                            // 111
        i--;                                                                                     // 112
      }                                                                                          // 113
      i++;                                                                                       // 114
    }                                                                                            // 115
    if (removedValues.length) {                                                                  // 116
      this.changed();                                                                            // 117
    }                                                                                            // 118
    return removedValues;                                                                        // 119
  };                                                                                             // 120
                                                                                                 // 121
  ReactiveArray.prototype.clear = function() {                                                   // 122
    while (this.length) {                                                                        // 123
      this.pop();                                                                                // 124
    }                                                                                            // 125
    this.changed();                                                                              // 126
    return this;                                                                                 // 127
  };                                                                                             // 128
                                                                                                 // 129
  ReactiveArray.prototype.concat = function() {                                                  // 130
    var a, ret, _i, _len;                                                                        // 131
    ret = this.array();                                                                          // 132
    for (_i = 0, _len = arguments.length; _i < _len; _i++) {                                     // 133
      a = arguments[_i];                                                                         // 134
      if (a instanceof ReactiveArray) {                                                          // 135
        ret = ret.concat(a.array());                                                             // 136
      } else {                                                                                   // 137
        ret = ret.concat(a);                                                                     // 138
      }                                                                                          // 139
    }                                                                                            // 140
    return new ReactiveArray(ret);                                                               // 141
  };                                                                                             // 142
                                                                                                 // 143
  ReactiveArray.prototype.indexOf = function() {                                                 // 144
    this.depend();                                                                               // 145
    return ReactiveArray.__super__.indexOf.apply(this, arguments);                               // 146
  };                                                                                             // 147
                                                                                                 // 148
  ReactiveArray.prototype.join = function() {                                                    // 149
    this.depend();                                                                               // 150
    return ReactiveArray.__super__.join.apply(this, arguments);                                  // 151
  };                                                                                             // 152
                                                                                                 // 153
  ReactiveArray.prototype.lastIndexOf = function() {                                             // 154
    this.depend();                                                                               // 155
    return ReactiveArray.__super__.lastIndexOf.apply(this, arguments);                           // 156
  };                                                                                             // 157
                                                                                                 // 158
  ReactiveArray.prototype.reverse = function() {                                                 // 159
    ReactiveArray.__super__.reverse.apply(this, arguments);                                      // 160
    this.changed();                                                                              // 161
    return this;                                                                                 // 162
  };                                                                                             // 163
                                                                                                 // 164
  ReactiveArray.prototype.sort = function() {                                                    // 165
    ReactiveArray.__super__.sort.apply(this, arguments);                                         // 166
    this.changed();                                                                              // 167
    return this;                                                                                 // 168
  };                                                                                             // 169
                                                                                                 // 170
  ReactiveArray.prototype.splice = function() {                                                  // 171
    var ret;                                                                                     // 172
    ret = ReactiveArray.__super__.splice.apply(this, arguments);                                 // 173
    this.changed();                                                                              // 174
    return ret;                                                                                  // 175
  };                                                                                             // 176
                                                                                                 // 177
  return ReactiveArray;                                                                          // 178
                                                                                                 // 179
})(Array);                                                                                       // 180
////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                 // 182
}).call(this);                                                                                   // 183
                                                                                                 // 184
///////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['manuel:reactivearray'] = {
  ReactiveArray: ReactiveArray
};

})();

//# sourceMappingURL=manuel_reactivearray.js.map

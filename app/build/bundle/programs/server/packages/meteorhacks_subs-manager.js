(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var _ = Package.underscore._;
var EJSON = Package.ejson.EJSON;

/* Package-scope variables */
var SubsManager;

(function(){

//////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                          //
// packages/meteorhacks_subs-manager/lib/sub_manager.js                                     //
//                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////
                                                                                            //
var FastRender = null;                                                                      // 1
if(Package['meteorhacks:fast-render']) {                                                    // 2
  FastRender = Package['meteorhacks:fast-render'].FastRender;                               // 3
}                                                                                           // 4
                                                                                            // 5
SubsManager = function (options) {                                                          // 6
  var self = this;                                                                          // 7
  self.options = options || {};                                                             // 8
  // maxiumum number of subscriptions are cached                                            // 9
  self.options.cacheLimit = self.options.cacheLimit || 10;                                  // 10
  // maximum time, subscription stay in the cache                                           // 11
  self.options.expireIn = self.options.expireIn || 5;                                       // 12
                                                                                            // 13
  self._cacheMap = {};                                                                      // 14
  self._cacheList = [];                                                                     // 15
  self._ready = false;                                                                      // 16
  self.dep = new Deps.Dependency();                                                         // 17
                                                                                            // 18
  self.computation = self._registerComputation();                                           // 19
};                                                                                          // 20
                                                                                            // 21
SubsManager.prototype.subscribe = function() {                                              // 22
  var self = this;                                                                          // 23
  if(Meteor.isClient) {                                                                     // 24
    var args = _.toArray(arguments);                                                        // 25
    this._addSub(args);                                                                     // 26
                                                                                            // 27
    return {                                                                                // 28
      ready: function() {                                                                   // 29
        self.dep.depend();                                                                  // 30
        return self._ready;                                                                 // 31
      }                                                                                     // 32
    };                                                                                      // 33
  } else {                                                                                  // 34
    // to support fast-render                                                               // 35
    if(Meteor.subscribe) {                                                                  // 36
      return Meteor.subscribe.apply(Meteor, arguments);                                     // 37
    }                                                                                       // 38
  }                                                                                         // 39
};                                                                                          // 40
                                                                                            // 41
SubsManager.prototype._addSub = function(args) {                                            // 42
  var self = this;                                                                          // 43
  var hash = EJSON.stringify(args);                                                         // 44
  var subName = args[0];                                                                    // 45
  var paramsKey = EJSON.stringify(args.slice(1));                                           // 46
                                                                                            // 47
  if(!self._cacheMap[hash]) {                                                               // 48
    var sub = {                                                                             // 49
      args: args,                                                                           // 50
      hash: hash                                                                            // 51
    };                                                                                      // 52
                                                                                            // 53
    this._handleError(sub);                                                                 // 54
                                                                                            // 55
    self._cacheMap[hash] = sub;                                                             // 56
    self._cacheList.push(sub);                                                              // 57
                                                                                            // 58
    // if fast-render comes with this subscription                                          // 59
    // we need to fake the ready message at first                                           // 60
    // This is because we are delaying the actual subscription evaluation                   // 61
    // May be FastRender needs to send full list of subscription args to the client         // 62
    // But, for now this is something working                                               // 63
    if(FastRender && FastRender._subscriptions && FastRender._subscriptions[subName]) {     // 64
      self._ready = self._ready && FastRender._subscriptions[subName][paramsKey];           // 65
    } else {                                                                                // 66
      self._ready = false;                                                                  // 67
    }                                                                                       // 68
                                                                                            // 69
    // to notify the global ready()                                                         // 70
    self._notifyChanged();                                                                  // 71
                                                                                            // 72
    // no need to interfere with the current computation                                    // 73
    self._reRunSubs();                                                                      // 74
  }                                                                                         // 75
                                                                                            // 76
  // add the current sub to the top of the list                                             // 77
  var sub = self._cacheMap[hash];                                                           // 78
  sub.updated = (new Date).getTime();                                                       // 79
                                                                                            // 80
  var index = _.indexOf(self._cacheList, sub);                                              // 81
  self._cacheList.splice(index, 1);                                                         // 82
  self._cacheList.push(sub);                                                                // 83
};                                                                                          // 84
                                                                                            // 85
SubsManager.prototype._reRunSubs = function() {                                             // 86
  var self = this;                                                                          // 87
                                                                                            // 88
  if(Deps.currentComputation) {                                                             // 89
    Deps.afterFlush(function() {                                                            // 90
      self.computation.invalidate();                                                        // 91
    });                                                                                     // 92
  } else {                                                                                  // 93
    self.computation.invalidate();                                                          // 94
  }                                                                                         // 95
};                                                                                          // 96
                                                                                            // 97
SubsManager.prototype._notifyChanged = function() {                                         // 98
  var self = this;                                                                          // 99
  if(Deps.currentComputation) {                                                             // 100
    setTimeout(function() {                                                                 // 101
      self.dep.changed();                                                                   // 102
    }, 0);                                                                                  // 103
  } else {                                                                                  // 104
    self.dep.changed();                                                                     // 105
  }                                                                                         // 106
};                                                                                          // 107
                                                                                            // 108
SubsManager.prototype._applyCacheLimit = function () {                                      // 109
  var self = this;                                                                          // 110
  var overflow = self._cacheList.length - self.options.cacheLimit;                          // 111
  if(overflow > 0) {                                                                        // 112
    var removedSubs = self._cacheList.splice(0, overflow);                                  // 113
    _.each(removedSubs, function(sub) {                                                     // 114
      delete self._cacheMap[sub.hash];                                                      // 115
    });                                                                                     // 116
  }                                                                                         // 117
};                                                                                          // 118
                                                                                            // 119
SubsManager.prototype._applyExpirations = function() {                                      // 120
  var self = this;                                                                          // 121
  var newCacheList = [];                                                                    // 122
                                                                                            // 123
  var expirationTime = (new Date).getTime() - self.options.expireIn * 60 * 1000;            // 124
  _.each(self._cacheList, function(sub) {                                                   // 125
    if(sub.updated >= expirationTime) {                                                     // 126
      newCacheList.push(sub);                                                               // 127
    } else {                                                                                // 128
      delete self._cacheMap[sub.hash];                                                      // 129
    }                                                                                       // 130
  });                                                                                       // 131
                                                                                            // 132
  self._cacheList = newCacheList;                                                           // 133
};                                                                                          // 134
                                                                                            // 135
SubsManager.prototype._registerComputation = function() {                                   // 136
  var self = this;                                                                          // 137
  var computation = Deps.autorun(function() {                                               // 138
    self._applyExpirations();                                                               // 139
    self._applyCacheLimit();                                                                // 140
                                                                                            // 141
    var ready = true;                                                                       // 142
    _.each(self._cacheList, function(sub) {                                                 // 143
      sub.ready = Meteor.subscribe.apply(Meteor, sub.args).ready();                         // 144
      ready = ready && sub.ready;                                                           // 145
    });                                                                                     // 146
                                                                                            // 147
    if(ready) {                                                                             // 148
      self._ready = true;                                                                   // 149
      self._notifyChanged();                                                                // 150
    }                                                                                       // 151
  });                                                                                       // 152
                                                                                            // 153
  return computation;                                                                       // 154
};                                                                                          // 155
                                                                                            // 156
SubsManager.prototype._createIdentifier = function(args) {                                  // 157
  var tmpArgs = _.map(args, function(value) {                                               // 158
    if(typeof value == "string") {                                                          // 159
      return '"' + value + '"';                                                             // 160
    } else {                                                                                // 161
      return value;                                                                         // 162
    }                                                                                       // 163
  });                                                                                       // 164
                                                                                            // 165
  return tmpArgs.join(', ');                                                                // 166
};                                                                                          // 167
                                                                                            // 168
SubsManager.prototype._handleError = function(sub) {                                        // 169
  var args = sub.args;                                                                      // 170
  var lastElement = _.last(args);                                                           // 171
  sub.identifier = this._createIdentifier(args);                                            // 172
                                                                                            // 173
  if(!lastElement) {                                                                        // 174
    args.push({onError: errorHandlingLogic});                                               // 175
  } else if(typeof lastElement == "function") {                                             // 176
    args.pop();                                                                             // 177
    args.push({onReady: lastElement, onError: errorHandlingLogic});                         // 178
  } else if(typeof lastElement.onError == "function") {                                     // 179
    var originalOnError = lastElement.onError;                                              // 180
    lastElement.onError = function(err) {                                                   // 181
      errorHandlingLogic(err);                                                              // 182
      originalOnError(err);                                                                 // 183
    };                                                                                      // 184
  } else if(typeof lastElement.onReady == "function") {                                     // 185
    lastElement.onError = errorHandlingLogic;                                               // 186
  } else {                                                                                  // 187
    args.push({onError: errorHandlingLogic});                                               // 188
  }                                                                                         // 189
                                                                                            // 190
  function errorHandlingLogic (err) {                                                       // 191
    console.log("Error invoking SubsManager.subscribe(%s): ", sub.identifier , err.reason);
    // expire this sub right away.                                                          // 193
    // Then expiration machanism will take care of the sub removal                          // 194
    sub.updated = new Date(1);                                                              // 195
  }                                                                                         // 196
};                                                                                          // 197
                                                                                            // 198
SubsManager.prototype.reset = function() {                                                  // 199
  var self = this;                                                                          // 200
  var oldComputation = self.computation;                                                    // 201
  self.computation = self._registerComputation();                                           // 202
                                                                                            // 203
  // invalidate the new compuation and it will fire new subscriptions                       // 204
  self.computation.invalidate();                                                            // 205
                                                                                            // 206
  // after above invalidation completed, fire stop the old computation                      // 207
  // which then send unsub messages                                                         // 208
  // mergeBox will correct send changed data and there'll be no flicker                     // 209
  Deps.afterFlush(function() {                                                              // 210
    oldComputation.stop();                                                                  // 211
  });                                                                                       // 212
};                                                                                          // 213
                                                                                            // 214
SubsManager.prototype.clear = function() {                                                  // 215
  this._cacheList = [];                                                                     // 216
  this._cacheMap = [];                                                                      // 217
  this._reRunSubs();                                                                        // 218
};                                                                                          // 219
                                                                                            // 220
SubsManager.prototype.ready = function() {                                                  // 221
  this.dep.depend();                                                                        // 222
                                                                                            // 223
  // if there are no items in the cacheList we are not ready yet.                           // 224
  if(this._cacheList.length === 0) {                                                        // 225
    return false;                                                                           // 226
  }                                                                                         // 227
  return this._ready;                                                                       // 228
};                                                                                          // 229
//////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['meteorhacks:subs-manager'] = {
  SubsManager: SubsManager
};

})();

//# sourceMappingURL=meteorhacks_subs-manager.js.map

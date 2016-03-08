(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var HTTP = Package.http.HTTP;
var HTTPInternals = Package.http.HTTPInternals;
var Logger = Package['mrt:log'].Logger;

/* Package-scope variables */
var __coffeescriptShare, ES;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/brishin_meteor-elasticsearch/packages/brishin_meteor-elasticsearch.js                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
(function () {                                                                                                         // 1
                                                                                                                       // 2
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/brishin:meteor-elasticsearch/elasticsearch.coffee.js                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Fiber, elasticsearch, queryDSL;                                                                                    // 10
                                                                                                                       // 11
Fiber = Npm.require('fibers');                                                                                         // 12
                                                                                                                       // 13
elasticsearch = Npm.require('elasticsearch');                                                                          // 14
                                                                                                                       // 15
queryDSL = Npm.require('elastic.js');                                                                                  // 16
                                                                                                                       // 17
ES = new elasticsearch.Client(Meteor.settings.elasticsearch);                                                          // 18
                                                                                                                       // 19
if (Meteor.settings && Meteor.settings.elasticsearch && Meteor.settings.elasticsearch.meteorLogger === "enabled") {    // 20
  Logger.enableLog("elasticsearch");                                                                                   // 21
}                                                                                                                      // 22
                                                                                                                       // 23
ES.queryDSL = queryDSL;                                                                                                // 24
                                                                                                                       // 25
ES.river = {                                                                                                           // 26
                                                                                                                       // 27
  /*                                                                                                                   // 28
    Create River                                                                                                       // 29
    @collection - name of the collection to river                                                                      // 30
    @options - optional object - all the same ones from the mongodb river docs .. and added:                           // 31
      @mapping: optionally specify a mapping configuration                                                             // 32
      @index: optionally specify an index name                                                                         // 33
   */                                                                                                                  // 34
  create: function(collection, options, callback) {                                                                    // 35
    var credentials, filter, gridfs, index, mongodbOptions, putRiver, servers;                                         // 36
    index = options && options.index || Meteor.settings.app_name.replace(/\s+/g, '-').toLowerCase() || "meteor-river";
    mongodbOptions = options && options.options;                                                                       // 38
    servers = null;                                                                                                    // 39
    credentials = null;                                                                                                // 40
    gridfs = null;                                                                                                     // 41
    filter = null;                                                                                                     // 42
    putRiver = function(cb) {                                                                                          // 43
      var db, settings;                                                                                                // 44
      db = process.env.MONGO_URL.split('/');                                                                           // 45
      db = db[db.length - 1];                                                                                          // 46
      if (db.indexOf('?') !== -1) {                                                                                    // 47
        db = db.substring(0, db.indexOf('?'));                                                                         // 48
      }                                                                                                                // 49
      settings = {                                                                                                     // 50
        type: "mongodb",                                                                                               // 51
        mongodb: {                                                                                                     // 52
          db: db,                                                                                                      // 53
          collection: collection,                                                                                      // 54
          options: mongodbOptions                                                                                      // 55
        },                                                                                                             // 56
        index: {                                                                                                       // 57
          name: index,                                                                                                 // 58
          type: collection                                                                                             // 59
        }                                                                                                              // 60
      };                                                                                                               // 61
      if (servers) {                                                                                                   // 62
        settings.mongodb.servers = servers;                                                                            // 63
      }                                                                                                                // 64
      if (credentials) {                                                                                               // 65
        settings.mongodb.credentials = credentials;                                                                    // 66
      }                                                                                                                // 67
      if (gridfs) {                                                                                                    // 68
        settings.mongodb.gridfs = gridfs;                                                                              // 69
      }                                                                                                                // 70
      if (filter) {                                                                                                    // 71
        settings.mongodb.filter = filter;                                                                              // 72
      }                                                                                                                // 73
      return HTTP.put("http://" + Meteor.settings.elasticsearch.host + "/_river/" + collection + "/_meta", {           // 74
        data: settings                                                                                                 // 75
      }, function(err, res) {                                                                                          // 76
        if (err) {                                                                                                     // 77
          return Logger.log("elasticsearch", "Error creating river for " + collection + " collection.");               // 78
        } else {                                                                                                       // 79
          Logger.log("elasticsearch", "Created river for " + collection + " collection.");                             // 80
          return cb(res.content);                                                                                      // 81
        }                                                                                                              // 82
      });                                                                                                              // 83
    };                                                                                                                 // 84
    if (options) {                                                                                                     // 85
      if (options.index) {                                                                                             // 86
        delete options.index;                                                                                          // 87
      }                                                                                                                // 88
      if (options.gridfs) {                                                                                            // 89
        gridfs = options.gridfs;                                                                                       // 90
        delete options.gridfs;                                                                                         // 91
      }                                                                                                                // 92
      if (options.credentials) {                                                                                       // 93
        credentials = options.credentials;                                                                             // 94
        delete options.credentials;                                                                                    // 95
      }                                                                                                                // 96
      if (options.filter) {                                                                                            // 97
        filter = options.filter;                                                                                       // 98
        delete options.filter;                                                                                         // 99
      }                                                                                                                // 100
      if (options.servers) {                                                                                           // 101
        servers = options.servers;                                                                                     // 102
        delete options.servers;                                                                                        // 103
      }                                                                                                                // 104
      if (options.mapping) {                                                                                           // 105
        return ES.indices.putMapping({                                                                                 // 106
          index: index,                                                                                                // 107
          type: collection,                                                                                            // 108
          body: options.mapping                                                                                        // 109
        }, Meteor.bindEnvironment(function(err, result) {                                                              // 110
          Logger.log("elasticsearch", "Put " + collection + " mapping.");                                              // 111
          delete options.mapping;                                                                                      // 112
          return putRiver(function(res) {                                                                              // 113
            if (callback) {                                                                                            // 114
              return callback(null, res);                                                                              // 115
            }                                                                                                          // 116
          });                                                                                                          // 117
        }), function(err) {                                                                                            // 118
          return console.log(err);                                                                                     // 119
        });                                                                                                            // 120
      } else {                                                                                                         // 121
        return putRiver(function(res) {                                                                                // 122
          if (callback) {                                                                                              // 123
            return callback(null, res);                                                                                // 124
          }                                                                                                            // 125
        });                                                                                                            // 126
      }                                                                                                                // 127
    } else {                                                                                                           // 128
      return putRiver(function(res) {                                                                                  // 129
        if (callback) {                                                                                                // 130
          return callback(null, res);                                                                                  // 131
        }                                                                                                              // 132
      });                                                                                                              // 133
    }                                                                                                                  // 134
  },                                                                                                                   // 135
                                                                                                                       // 136
  /*                                                                                                                   // 137
    Destroy River                                                                                                      // 138
    @collection - name of the collection of the river to destroy                                                       // 139
   */                                                                                                                  // 140
  destroy: function(collection, callback) {                                                                            // 141
    return HTTP.del("http://" + Meteor.settings.elasticsearch.host + "/_river/" + collection, function(err, res) {     // 142
      Logger.log("elasticsearch", "Destroyed river for " + collection + " collection.");                               // 143
      if (callback) {                                                                                                  // 144
        return callback(err, res);                                                                                     // 145
      }                                                                                                                // 146
    });                                                                                                                // 147
  },                                                                                                                   // 148
                                                                                                                       // 149
  /*                                                                                                                   // 150
    Delete Type                                                                                                        // 151
    @collection - name of the collection of the river to destroy                                                       // 152
   */                                                                                                                  // 153
  "delete": function(index, collection, callback) {                                                                    // 154
    return HTTP.del("http://" + Meteor.settings.elasticsearch.host + "/" + index + "/" + collection, function(err, res) {
      Logger.log("elasticsearch", "Deleted river data for " + collection + " collection.");                            // 156
      if (callback) {                                                                                                  // 157
        return callback(err, res);                                                                                     // 158
      }                                                                                                                // 159
    });                                                                                                                // 160
  },                                                                                                                   // 161
                                                                                                                       // 162
  /*                                                                                                                   // 163
    Reriver                                                                                                            // 164
    @collection - name of the collection to river                                                                      // 165
    @options - optional object                                                                                         // 166
      @fields = array of fields to river into ES                                                                       // 167
   */                                                                                                                  // 168
  reriver: function(collection, options, callback) {                                                                   // 169
    var index;                                                                                                         // 170
    index = options && options.index || Meteor.settings.app_name.replace(/\s+/g, '-').toLowerCase() || "meteor-river";
    return this.destroy(collection, (function(_this) {                                                                 // 172
      return function(err, res) {                                                                                      // 173
        return _this["delete"](index, collection, function(err, res) {                                                 // 174
          return _this.create(collection, options, function(err, res) {                                                // 175
            if (callback) {                                                                                            // 176
              return callback(err, res);                                                                               // 177
            }                                                                                                          // 178
          });                                                                                                          // 179
        });                                                                                                            // 180
      };                                                                                                               // 181
    })(this));                                                                                                         // 182
  }                                                                                                                    // 183
};                                                                                                                     // 184
                                                                                                                       // 185
this.ES = ES;                                                                                                          // 186
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       // 188
}).call(this);                                                                                                         // 189
                                                                                                                       // 190
                                                                                                                       // 191
                                                                                                                       // 192
                                                                                                                       // 193
                                                                                                                       // 194
                                                                                                                       // 195
(function () {                                                                                                         // 196
                                                                                                                       // 197
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/brishin:meteor-elasticsearch/methods.coffee.js                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Future;                                                                                                            // 205
                                                                                                                       // 206
Future = Npm.require('fibers/future');                                                                                 // 207
                                                                                                                       // 208
Meteor.methods({                                                                                                       // 209
                                                                                                                       // 210
  /*                                                                                                                   // 211
    Search                                                                                                             // 212
    @query: string value to search for                                                                                 // 213
    @options: optional object with optional params                                                                     // 214
      @collection: name of the collection to search                                                                    // 215
      @fileds: array of field names to search                                                                          // 216
      @size: number of results to return                                                                               // 217
   */                                                                                                                  // 218
  search: function(searchQuery, options) {                                                                             // 219
    var f, field, future, index, query, _i, _len, _ref;                                                                // 220
    index = options && options.index || Meteor.settings.app_name.replace(/\s+/g, '-').toLowerCase() || "meteor-river";
    query = {                                                                                                          // 222
      index: index,                                                                                                    // 223
      body: {                                                                                                          // 224
        query: {                                                                                                       // 225
          match: {                                                                                                     // 226
            name: searchQuery                                                                                          // 227
          }                                                                                                            // 228
        }                                                                                                              // 229
      }                                                                                                                // 230
    };                                                                                                                 // 231
    if (options) {                                                                                                     // 232
      if (options.collection) {                                                                                        // 233
        query.type = options.collection;                                                                               // 234
      }                                                                                                                // 235
      if (options.fields) {                                                                                            // 236
        query.body.query = {                                                                                           // 237
          bool: {                                                                                                      // 238
            should: []                                                                                                 // 239
          }                                                                                                            // 240
        };                                                                                                             // 241
        _ref = options.fields;                                                                                         // 242
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {                                                            // 243
          field = _ref[_i];                                                                                            // 244
          f = {                                                                                                        // 245
            match: {}                                                                                                  // 246
          };                                                                                                           // 247
          f.match[field] = searchQuery;                                                                                // 248
          query.body.query.bool.should.push(f);                                                                        // 249
        }                                                                                                              // 250
      }                                                                                                                // 251
      if (options.size) {                                                                                              // 252
        query.body.size = options.size;                                                                                // 253
      }                                                                                                                // 254
    }                                                                                                                  // 255
    future = new Future();                                                                                             // 256
    ES.search(query).then(function(resp) {                                                                             // 257
      var hits;                                                                                                        // 258
      hits = resp.hits.hits;                                                                                           // 259
      Logger.log("elasticsearch", 'Search results for "' + searchQuery + '" returned', resp);                          // 260
      return future["return"](hits);                                                                                   // 261
    }, function(err) {                                                                                                 // 262
      return console.trace(err.message);                                                                               // 263
    });                                                                                                                // 264
    return future.wait();                                                                                              // 265
  }                                                                                                                    // 266
});                                                                                                                    // 267
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       // 269
}).call(this);                                                                                                         // 270
                                                                                                                       // 271
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['brishin:meteor-elasticsearch'] = {
  ES: ES
};

})();

//# sourceMappingURL=brishin_meteor-elasticsearch.js.map

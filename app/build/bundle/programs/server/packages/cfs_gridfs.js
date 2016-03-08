(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var FS = Package['cfs:base-package'].FS;

(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/cfs_gridfs/packages/cfs_gridfs.js                                                                     //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
(function () {                                                                                                    // 1
                                                                                                                  // 2
/////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 3
//                                                                                                         //     // 4
// packages/cfs:gridfs/gridfs.server.js                                                                    //     // 5
//                                                                                                         //     // 6
/////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 7
                                                                                                           //     // 8
var path = Npm.require('path');                                                                            // 1   // 9
var mongodb = Npm.require('mongodb');                                                                      // 2   // 10
var ObjectID = Npm.require('mongodb').ObjectID;                                                            // 3   // 11
var Grid = Npm.require('gridfs-stream');                                                                   // 4   // 12
//var Grid = Npm.require('gridfs-locking-stream');                                                         // 5   // 13
                                                                                                           // 6   // 14
var chunkSize = 1024*1024*2; // 256k is default GridFS chunk size, but performs terribly for largish files // 7   // 15
                                                                                                           // 8   // 16
/**                                                                                                        // 9   // 17
 * @public                                                                                                 // 10  // 18
 * @constructor                                                                                            // 11  // 19
 * @param {String} name - The store name                                                                   // 12  // 20
 * @param {Object} options                                                                                 // 13  // 21
 * @param {Function} [options.beforeSave] - Function to run before saving a file from the server. The context of the function will be the `FS.File` instance we're saving. The function may alter its properties.
 * @param {Number} [options.maxTries=5] - Max times to attempt saving a file                               // 15  // 23
 * @returns {FS.StorageAdapter} An instance of FS.StorageAdapter.                                          // 16  // 24
 *                                                                                                         // 17  // 25
 * Creates a GridFS store instance on the server. Inherits from FS.StorageAdapter                          // 18  // 26
 * type.                                                                                                   // 19  // 27
 */                                                                                                        // 20  // 28
                                                                                                           // 21  // 29
FS.Store.GridFS = function(name, options) {                                                                // 22  // 30
  var self = this;                                                                                         // 23  // 31
  options = options || {};                                                                                 // 24  // 32
                                                                                                           // 25  // 33
  var gridfsName = name;                                                                                   // 26  // 34
  var mongoOptions = options.mongoOptions || {};                                                           // 27  // 35
                                                                                                           // 28  // 36
  if (!(self instanceof FS.Store.GridFS))                                                                  // 29  // 37
    throw new Error('FS.Store.GridFS missing keyword "new"');                                              // 30  // 38
                                                                                                           // 31  // 39
  if (!options.mongoUrl) {                                                                                 // 32  // 40
    options.mongoUrl = process.env.MONGO_URL;                                                              // 33  // 41
    // When using a Meteor MongoDB instance, preface name with "cfs_gridfs."                               // 34  // 42
    gridfsName = "cfs_gridfs." + name;                                                                     // 35  // 43
  }                                                                                                        // 36  // 44
                                                                                                           // 37  // 45
  if (!options.mongoOptions) {                                                                             // 38  // 46
    options.mongoOptions = { db: { native_parser: true }, server: { auto_reconnect: true }};               // 39  // 47
  }                                                                                                        // 40  // 48
                                                                                                           // 41  // 49
  if (options.chunkSize) {                                                                                 // 42  // 50
    chunkSize = options.chunkSize;                                                                         // 43  // 51
  }                                                                                                        // 44  // 52
                                                                                                           // 45  // 53
  return new FS.StorageAdapter(name, options, {                                                            // 46  // 54
                                                                                                           // 47  // 55
    typeName: 'storage.gridfs',                                                                            // 48  // 56
    fileKey: function(fileObj) {                                                                           // 49  // 57
      // We should not have to mount the file here - We assume its taken                                   // 50  // 58
      // care of - Otherwise we create new files instead of overwriting                                    // 51  // 59
      var key = {                                                                                          // 52  // 60
        _id: null,                                                                                         // 53  // 61
        filename: null                                                                                     // 54  // 62
      };                                                                                                   // 55  // 63
                                                                                                           // 56  // 64
      // If we're passed a fileObj, we retrieve the _id and filename from it.                              // 57  // 65
      if (fileObj) {                                                                                       // 58  // 66
        var info = fileObj._getInfo(name, {updateFileRecordFirst: false});                                 // 59  // 67
        key._id = info.key || null;                                                                        // 60  // 68
        key.filename = info.name || fileObj.name({updateFileRecordFirst: false}) || (fileObj.collectionName + '-' + fileObj._id);
      }                                                                                                    // 62  // 70
                                                                                                           // 63  // 71
      // If key._id is null at this point, createWriteStream will let GridFS generate a new ID             // 64  // 72
      return key;                                                                                          // 65  // 73
    },                                                                                                     // 66  // 74
    createReadStream: function(fileKey, options) {                                                         // 67  // 75
      options = options || {};                                                                             // 68  // 76
                                                                                                           // 69  // 77
      // Init GridFS                                                                                       // 70  // 78
      var gfs = new Grid(self.db, mongodb);                                                                // 71  // 79
                                                                                                           // 72  // 80
      // Set the default streamning settings                                                               // 73  // 81
      var settings = {                                                                                     // 74  // 82
        _id: new ObjectID(fileKey._id),                                                                    // 75  // 83
        root: gridfsName                                                                                   // 76  // 84
      };                                                                                                   // 77  // 85
                                                                                                           // 78  // 86
      // Check if this should be a partial read                                                            // 79  // 87
      if (typeof options.start !== 'undefined' && typeof options.end !== 'undefined' ) {                   // 80  // 88
        // Add partial info                                                                                // 81  // 89
        settings.range = {                                                                                 // 82  // 90
          startPos: options.start,                                                                         // 83  // 91
          endPos: options.end                                                                              // 84  // 92
        };                                                                                                 // 85  // 93
      }                                                                                                    // 86  // 94
                                                                                                           // 87  // 95
      FS.debug && console.log('GRIDFS', settings);                                                         // 88  // 96
                                                                                                           // 89  // 97
      return gfs.createReadStream(settings);                                                               // 90  // 98
                                                                                                           // 91  // 99
    },                                                                                                     // 92  // 100
    createWriteStream: function(fileKey, options) {                                                        // 93  // 101
      options = options || {};                                                                             // 94  // 102
                                                                                                           // 95  // 103
      // Init GridFS                                                                                       // 96  // 104
      var gfs = new Grid(self.db, mongodb);                                                                // 97  // 105
                                                                                                           // 98  // 106
      var opts = {                                                                                         // 99  // 107
        filename: fileKey.filename,                                                                        // 100
        mode: 'w',                                                                                         // 101
        root: gridfsName,                                                                                  // 102
        chunk_size: options.chunk_size || chunkSize,                                                       // 103
        // We allow aliases, metadata and contentType to be passed in via                                  // 104
        // options                                                                                         // 105
        aliases: options.aliases || [],                                                                    // 106
        metadata: options.metadata || null,                                                                // 107
        content_type: options.contentType || 'application/octet-stream'                                    // 108
      };                                                                                                   // 109
                                                                                                           // 110
      if (fileKey._id) {                                                                                   // 111
        opts._id = new ObjectID(fileKey._id);                                                              // 112
      }                                                                                                    // 113
                                                                                                           // 114
      var writeStream = gfs.createWriteStream(opts);                                                       // 115
                                                                                                           // 116
      writeStream.on('close', function(file) {                                                             // 117
        if (!file) {                                                                                       // 118
          // gridfs-stream will emit "close" without passing a file                                        // 119
          // if there is an error. We can simply exit here because                                         // 120
          // the "error" listener will also be called in this case.                                        // 121
          return;                                                                                          // 122
        }                                                                                                  // 123
                                                                                                           // 124
        if (FS.debug) console.log('SA GridFS - DONE!');                                                    // 125
                                                                                                           // 126
        // Emit end and return the fileKey, size, and updated date                                         // 127
        writeStream.emit('stored', {                                                                       // 128
          // Set the generated _id so that we know it for future reads and writes.                         // 129
          // We store the _id as a string and only convert to ObjectID right before                        // 130
          // reading, writing, or deleting. If we store the ObjectID itself,                               // 131
          // Meteor (EJSON?) seems to convert it to a LocalCollection.ObjectID,                            // 132
          // which GFS doesn't understand.                                                                 // 133
          fileKey: file._id.toString(),                                                                    // 134
          size: file.length,                                                                               // 135
          storedAt: file.uploadDate || new Date()                                                          // 136
        });                                                                                                // 137
      });                                                                                                  // 138
                                                                                                           // 139
      writeStream.on('error', function(error) {                                                            // 140
        console.log('SA GridFS - ERROR!', error);                                                          // 141
      });                                                                                                  // 142
                                                                                                           // 143
      return writeStream;                                                                                  // 144
                                                                                                           // 145
    },                                                                                                     // 146
    remove: function(fileKey, callback) {                                                                  // 147
      // Init GridFS                                                                                       // 148
      var gfs = new Grid(self.db, mongodb);                                                                // 149
                                                                                                           // 150
      try {                                                                                                // 151
        gfs.remove({ _id: new ObjectID(fileKey._id), root: gridfsName }, callback);                        // 152
      } catch(err) {                                                                                       // 153
        callback(err);                                                                                     // 154
      }                                                                                                    // 155
    },                                                                                                     // 156
                                                                                                           // 157
    // Not implemented                                                                                     // 158
    watch: function() {                                                                                    // 159
      throw new Error("GridFS storage adapter does not support the sync option");                          // 160
    },                                                                                                     // 161
                                                                                                           // 162
    init: function(callback) {                                                                             // 163
      mongodb.MongoClient.connect(options.mongoUrl, mongoOptions, function (err, db) {                     // 164
        if (err) { return callback(err); }                                                                 // 165
        self.db = db;                                                                                      // 166
        callback(null);                                                                                    // 167
      });                                                                                                  // 168
    }                                                                                                      // 169
  });                                                                                                      // 170
};                                                                                                         // 171
                                                                                                           // 172
/////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 181
                                                                                                                  // 182
}).call(this);                                                                                                    // 183
                                                                                                                  // 184
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['cfs:gridfs'] = {};

})();

//# sourceMappingURL=cfs_gridfs.js.map

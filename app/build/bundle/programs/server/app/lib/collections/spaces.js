(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// lib/collections/spaces.js                                           //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Spaces = new Mongo.Collection('spaces');                               // 1
var Schemas = {};                                                      // 2
Schemas.Space = new SimpleSchema({                                     // 3
  venue_id: {                                                          // 4
    type: String,                                                      // 5
    label: 'Venue ID'                                                  // 6
  },                                                                   //
  type: {                                                              // 8
    type: String,                                                      // 9
    label: 'Space Type',                                               // 10
    optional: true                                                     // 11
  },                                                                   //
  instant: {                                                           // 13
    type: Boolean,                                                     // 14
    label: 'Enable Instant Booking',                                   // 15
    optional: true                                                     // 16
  },                                                                   //
  name: {                                                              // 18
    type: String,                                                      // 19
    label: 'Space Name'                                                // 20
  },                                                                   //
  poster: {                                                            // 22
    type: String,                                                      // 23
    label: 'Space Poster',                                             // 24
    optional: true                                                     // 25
  },                                                                   //
  quantity: {                                                          // 27
    type: String,                                                      // 28
    label: 'Space Quantity',                                           // 29
    optional: true                                                     // 30
  },                                                                   //
  detail: {                                                            // 32
    type: String,                                                      // 33
    label: 'Space Detail',                                             // 34
    optional: true                                                     // 35
  },                                                                   //
  per_hour: {                                                          // 37
    type: String,                                                      // 38
    label: 'Space Cost Per hour',                                      // 39
    optional: true                                                     // 40
  },                                                                   //
  per_day: {                                                           // 42
    type: String,                                                      // 43
    label: 'Space Cost Per Day',                                       // 44
    optional: true                                                     // 45
  },                                                                   //
  per_month: {                                                         // 47
    type: String,                                                      // 48
    label: 'Space Cost Per Month',                                     // 49
    optional: true                                                     // 50
  },                                                                   //
  createdBy: {                                                         // 52
    type: String,                                                      // 53
    optional: true                                                     // 54
  },                                                                   //
  createdAt: {                                                         // 56
    type: Date,                                                        // 57
    optional: true                                                     // 58
  },                                                                   //
  updatedBy: {                                                         // 60
    type: String,                                                      // 61
    optional: true                                                     // 62
  },                                                                   //
  updatedAt: {                                                         // 64
    type: Date,                                                        // 65
    optional: true                                                     // 66
  }                                                                    //
});                                                                    //
                                                                       //
Spaces.attachSchema(Schemas.Space);                                    // 70
if (Meteor.isServer) {                                                 // 71
  Spaces.allow({                                                       // 72
    insert: function (userId, doc) {                                   // 73
      return true;                                                     // 74
    },                                                                 //
                                                                       //
    update: function (userId, doc, fieldNames, modifier) {             // 77
      return true;                                                     // 78
    },                                                                 //
                                                                       //
    remove: function (userId, doc) {                                   // 81
      return true;                                                     // 82
    }                                                                  //
  });                                                                  //
                                                                       //
  Spaces.deny({                                                        // 86
    insert: function (userId, doc) {                                   // 87
      return false;                                                    // 88
    },                                                                 //
                                                                       //
    update: function (userId, doc, fieldNames, modifier) {             // 91
      return false;                                                    // 92
    },                                                                 //
                                                                       //
    remove: function (userId, doc) {                                   // 95
      return false;                                                    // 96
    }                                                                  //
  });                                                                  //
}                                                                      //
Spaces.after.insert(function (userId, doc) {                           // 100
  var venue = Venues.findOne(doc.venue_id);                            // 101
  HTTP.call('PUT', 'http://localhost:9200/cowscastle/space/' + doc._id, {
    data: {                                                            // 103
      "space": doc,                                                    // 104
      "venue": venue                                                   // 105
    }                                                                  //
  }, function (error, response) {                                      //
    if (error) {                                                       // 108
      console.log(error);                                              // 109
    } else {                                                           //
      console.log(response);                                           // 111
    }                                                                  //
  });                                                                  //
});                                                                    //
Spaces.after.update(function (userId, doc, fieldNames, modifier, options) {
  var venue = Venues.findOne(doc.venue_id);                            // 116
  HTTP.call('POST', 'http://localhost:9200/cowscastle/space/' + doc._id + '/_update', {
    data: {                                                            // 118
      "doc": {                                                         // 119
        "space": doc,                                                  // 120
        "venue": venue                                                 // 121
      }                                                                //
    }                                                                  //
  }, function (error, response) {                                      //
    if (error) {                                                       // 125
      console.log(error);                                              // 126
    } else {                                                           //
      console.log(response);                                           // 128
    }                                                                  //
  });                                                                  //
}, { fetchPrevious: false });                                          //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=spaces.js.map

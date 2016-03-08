(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// lib/collections/bookings.js                                         //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Bookings = new Mongo.Collection('bookings');                           // 1
var Schemas = {};                                                      // 2
Schemas.Booking = new SimpleSchema({                                   // 3
  space_id: {                                                          // 4
    type: String,                                                      // 5
    label: 'Space ID'                                                  // 6
  },                                                                   //
  date: {                                                              // 8
    type: Number,                                                      // 9
    label: 'Booking date'                                              // 10
  },                                                                   //
  duration: {                                                          // 12
    type: String,                                                      // 13
    label: 'Booking Duration'                                          // 14
  },                                                                   //
  amount: {                                                            // 16
    type: String,                                                      // 17
    label: 'Booking Amount'                                            // 18
  },                                                                   //
  type: {                                                              // 20
    type: String,                                                      // 21
    label: 'Booking Type'                                              // 22
  },                                                                   //
  createdBy: {                                                         // 24
    type: String,                                                      // 25
    optional: true                                                     // 26
  },                                                                   //
  createdAt: {                                                         // 28
    type: Date,                                                        // 29
    optional: true                                                     // 30
  },                                                                   //
  updatedBy: {                                                         // 32
    type: String,                                                      // 33
    optional: true                                                     // 34
  },                                                                   //
  updatedAt: {                                                         // 36
    type: Date,                                                        // 37
    optional: true                                                     // 38
  }                                                                    //
});                                                                    //
                                                                       //
Bookings.attachSchema(Schemas.Booking);                                // 42
if (Meteor.isServer) {                                                 // 43
  Bookings.allow({                                                     // 44
    insert: function (userId, doc) {                                   // 45
      return true;                                                     // 46
    },                                                                 //
                                                                       //
    update: function (userId, doc, fieldNames, modifier) {             // 49
      return true;                                                     // 50
    },                                                                 //
                                                                       //
    remove: function (userId, doc) {                                   // 53
      return true;                                                     // 54
    }                                                                  //
  });                                                                  //
                                                                       //
  Bookings.deny({                                                      // 58
    insert: function (userId, doc) {                                   // 59
      return false;                                                    // 60
    },                                                                 //
                                                                       //
    update: function (userId, doc, fieldNames, modifier) {             // 63
      return false;                                                    // 64
    },                                                                 //
                                                                       //
    remove: function (userId, doc) {                                   // 67
      return false;                                                    // 68
    }                                                                  //
  });                                                                  //
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=bookings.js.map

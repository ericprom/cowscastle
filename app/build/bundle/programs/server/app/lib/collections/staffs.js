(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// lib/collections/staffs.js                                           //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Staffs = new Mongo.Collection('staffs');                               // 1
var Schemas = {};                                                      // 2
Schemas.Staff = new SimpleSchema({                                     // 3
  team_id: {                                                           // 4
    type: String,                                                      // 5
    label: 'Team ID'                                                   // 6
  },                                                                   //
  staff_id: {                                                          // 8
    type: String,                                                      // 9
    label: 'Staff ID'                                                  // 10
  },                                                                   //
  role: {                                                              // 12
    type: String,                                                      // 13
    label: 'Staff Role',                                               // 14
    optional: true                                                     // 15
  },                                                                   //
  accepted: {                                                          // 17
    type: Boolean,                                                     // 18
    label: 'Invitation accepted',                                      // 19
    optional: true                                                     // 20
  },                                                                   //
  createdBy: {                                                         // 22
    type: String,                                                      // 23
    optional: true                                                     // 24
  },                                                                   //
  createdAt: {                                                         // 26
    type: Date,                                                        // 27
    optional: true                                                     // 28
  },                                                                   //
  updatedBy: {                                                         // 30
    type: String,                                                      // 31
    optional: true                                                     // 32
  },                                                                   //
  updatedAt: {                                                         // 34
    type: Date,                                                        // 35
    optional: true                                                     // 36
  }                                                                    //
});                                                                    //
                                                                       //
Staffs.attachSchema(Schemas.Staff);                                    // 40
if (Meteor.isServer) {                                                 // 41
  Staffs.allow({                                                       // 42
    insert: function (userId, doc) {                                   // 43
      return true;                                                     // 44
    },                                                                 //
                                                                       //
    update: function (userId, doc, fieldNames, modifier) {             // 47
      return true;                                                     // 48
    },                                                                 //
                                                                       //
    remove: function (userId, doc) {                                   // 51
      return true;                                                     // 52
    }                                                                  //
  });                                                                  //
                                                                       //
  Staffs.deny({                                                        // 56
    insert: function (userId, doc) {                                   // 57
      return false;                                                    // 58
    },                                                                 //
                                                                       //
    update: function (userId, doc, fieldNames, modifier) {             // 61
      return false;                                                    // 62
    },                                                                 //
                                                                       //
    remove: function (userId, doc) {                                   // 65
      return false;                                                    // 66
    }                                                                  //
  });                                                                  //
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=staffs.js.map

(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// lib/collections/teams.js                                            //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Teams = new Mongo.Collection('teams');                                 // 1
var Schemas = {};                                                      // 2
Schemas.Team = new SimpleSchema({                                      // 3
  venue_id: {                                                          // 4
    type: String,                                                      // 5
    label: 'Venue ID'                                                  // 6
  },                                                                   //
  team_name: {                                                         // 8
    type: String,                                                      // 9
    label: 'Team Name',                                                // 10
    optional: true                                                     // 11
  },                                                                   //
  team_logo: {                                                         // 13
    type: String,                                                      // 14
    label: 'Team Logo',                                                // 15
    optional: true                                                     // 16
  },                                                                   //
  createdBy: {                                                         // 18
    type: String,                                                      // 19
    optional: true                                                     // 20
  },                                                                   //
  createdAt: {                                                         // 22
    type: Date,                                                        // 23
    optional: true                                                     // 24
  },                                                                   //
  updatedBy: {                                                         // 26
    type: String,                                                      // 27
    optional: true                                                     // 28
  },                                                                   //
  updatedAt: {                                                         // 30
    type: Date,                                                        // 31
    optional: true                                                     // 32
  }                                                                    //
});                                                                    //
                                                                       //
Teams.attachSchema(Schemas.Team);                                      // 36
if (Meteor.isServer) {                                                 // 37
  Teams.allow({                                                        // 38
    insert: function (userId, doc) {                                   // 39
      return true;                                                     // 40
    },                                                                 //
                                                                       //
    update: function (userId, doc, fieldNames, modifier) {             // 43
      return true;                                                     // 44
    },                                                                 //
                                                                       //
    remove: function (userId, doc) {                                   // 47
      return true;                                                     // 48
    }                                                                  //
  });                                                                  //
                                                                       //
  Teams.deny({                                                         // 52
    insert: function (userId, doc) {                                   // 53
      return false;                                                    // 54
    },                                                                 //
                                                                       //
    update: function (userId, doc, fieldNames, modifier) {             // 57
      return false;                                                    // 58
    },                                                                 //
                                                                       //
    remove: function (userId, doc) {                                   // 61
      return false;                                                    // 62
    }                                                                  //
  });                                                                  //
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=teams.js.map

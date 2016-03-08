(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// lib/collections/payments.js                                         //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Payments = new Mongo.Collection('payments');                           // 1
var Schemas = {};                                                      // 2
Schemas.Payment = new SimpleSchema({                                   // 3
  venue_id: {                                                          // 4
    type: String,                                                      // 5
    label: 'Venue ID'                                                  // 6
  },                                                                   //
  bank_name: {                                                         // 8
    type: String,                                                      // 9
    label: 'Bank Name'                                                 // 10
  },                                                                   //
  account_name: {                                                      // 12
    type: String,                                                      // 13
    label: 'Account Name'                                              // 14
  },                                                                   //
  account_number: {                                                    // 16
    type: String,                                                      // 17
    label: 'Account Number'                                            // 18
  },                                                                   //
  createdBy: {                                                         // 20
    type: String,                                                      // 21
    optional: true                                                     // 22
  },                                                                   //
  createdAt: {                                                         // 24
    type: Date,                                                        // 25
    optional: true                                                     // 26
  },                                                                   //
  updatedBy: {                                                         // 28
    type: String,                                                      // 29
    optional: true                                                     // 30
  },                                                                   //
  updatedAt: {                                                         // 32
    type: Date,                                                        // 33
    optional: true                                                     // 34
  }                                                                    //
});                                                                    //
                                                                       //
Payments.attachSchema(Schemas.Payment);                                // 38
if (Meteor.isServer) {                                                 // 39
  Payments.allow({                                                     // 40
    insert: function (userId, doc) {                                   // 41
      return true;                                                     // 42
    },                                                                 //
                                                                       //
    update: function (userId, doc, fieldNames, modifier) {             // 45
      return true;                                                     // 46
    },                                                                 //
                                                                       //
    remove: function (userId, doc) {                                   // 49
      return true;                                                     // 50
    }                                                                  //
  });                                                                  //
                                                                       //
  Payments.deny({                                                      // 54
    insert: function (userId, doc) {                                   // 55
      return false;                                                    // 56
    },                                                                 //
                                                                       //
    update: function (userId, doc, fieldNames, modifier) {             // 59
      return false;                                                    // 60
    },                                                                 //
                                                                       //
    remove: function (userId, doc) {                                   // 63
      return false;                                                    // 64
    }                                                                  //
  });                                                                  //
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=payments.js.map

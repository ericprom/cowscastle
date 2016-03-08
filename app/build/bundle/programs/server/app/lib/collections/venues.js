(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// lib/collections/venues.js                                           //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Venues = new Mongo.Collection('venues');                               // 1
var Schemas = {};                                                      // 2
Schemas.VenueLocation = new SimpleSchema({                             // 3
  address: {                                                           // 4
    type: String,                                                      // 5
    label: 'Venue Address',                                            // 6
    optional: true                                                     // 7
  },                                                                   //
  latlng: {                                                            // 9
    type: [Number],                                                    // 10
    decimal: true                                                      // 11
  },                                                                   //
  district: {                                                          // 13
    type: String,                                                      // 14
    label: 'Venue District',                                           // 15
    optional: true                                                     // 16
  },                                                                   //
  city: {                                                              // 18
    type: String,                                                      // 19
    label: 'Venue City',                                               // 20
    optional: true                                                     // 21
  },                                                                   //
  province: {                                                          // 23
    type: String,                                                      // 24
    label: 'Venue Province',                                           // 25
    optional: true                                                     // 26
  },                                                                   //
  zipcode: {                                                           // 28
    type: String,                                                      // 29
    label: 'Venue Zipcode',                                            // 30
    optional: true                                                     // 31
  },                                                                   //
  phone: {                                                             // 33
    type: String,                                                      // 34
    label: 'Venue Phone Number',                                       // 35
    optional: true                                                     // 36
  },                                                                   //
  email: {                                                             // 38
    type: String,                                                      // 39
    label: 'Venue Email',                                              // 40
    optional: true                                                     // 41
  },                                                                   //
  website: {                                                           // 43
    type: String,                                                      // 44
    label: 'Venue Website',                                            // 45
    optional: true                                                     // 46
  }                                                                    //
});                                                                    //
Schemas.VenueDetail = new SimpleSchema({                               // 49
  slogan: {                                                            // 50
    type: String,                                                      // 51
    label: 'Venue Slogan',                                             // 52
    optional: true                                                     // 53
  },                                                                   //
  description: {                                                       // 55
    type: String,                                                      // 56
    label: 'Venue Description',                                        // 57
    optional: true                                                     // 58
  },                                                                   //
  floors: {                                                            // 60
    type: String,                                                      // 61
    label: 'Venue Floor',                                              // 62
    optional: true                                                     // 63
  },                                                                   //
  areas: {                                                             // 65
    type: String,                                                      // 66
    label: 'Venue Areas',                                              // 67
    optional: true                                                     // 68
  },                                                                   //
  rooms: {                                                             // 70
    type: String,                                                      // 71
    label: 'Venue Rooms',                                              // 72
    optional: true                                                     // 73
  },                                                                   //
  desks: {                                                             // 75
    type: String,                                                      // 76
    label: 'Venue Desks',                                              // 77
    optional: true                                                     // 78
  }                                                                    //
});                                                                    //
Schemas.VenueFacility = new SimpleSchema({                             // 81
  facility_id: {                                                       // 82
    type: String,                                                      // 83
    label: 'Facility ID',                                              // 84
    optional: true                                                     // 85
  },                                                                   //
  status: {                                                            // 87
    type: Boolean,                                                     // 88
    label: 'Facility status',                                          // 89
    optional: true                                                     // 90
  }                                                                    //
});                                                                    //
Schemas.Venue = new SimpleSchema({                                     // 93
  name: {                                                              // 94
    type: String,                                                      // 95
    label: 'Venue Name'                                                // 96
  },                                                                   //
  logo: {                                                              // 98
    type: String,                                                      // 99
    label: 'Venue Logo',                                               // 100
    optional: true                                                     // 101
  },                                                                   //
  gallery: {                                                           // 103
    type: [Object],                                                    // 104
    label: 'Venue Gallaery',                                           // 105
    optional: true,                                                    // 106
    blackbox: true                                                     // 107
  },                                                                   //
  location: {                                                          // 109
    type: Schemas.VenueLocation,                                       // 110
    label: 'Venue Location',                                           // 111
    optional: true                                                     // 112
  },                                                                   //
  detail: {                                                            // 114
    type: Schemas.VenueDetail,                                         // 115
    label: 'Venue Detail',                                             // 116
    optional: true                                                     // 117
  },                                                                   //
  facility: {                                                          // 119
    type: [Schemas.VenueFacility],                                     // 120
    label: 'Venue Detail',                                             // 121
    optional: true                                                     // 122
  },                                                                   //
  createdBy: {                                                         // 124
    type: String,                                                      // 125
    optional: true                                                     // 126
  },                                                                   //
  createdAt: {                                                         // 128
    type: Date,                                                        // 129
    optional: true                                                     // 130
  },                                                                   //
  updatedBy: {                                                         // 132
    type: String,                                                      // 133
    optional: true                                                     // 134
  },                                                                   //
  updatedAt: {                                                         // 136
    type: Date,                                                        // 137
    optional: true                                                     // 138
  }                                                                    //
});                                                                    //
                                                                       //
Venues.attachSchema(Schemas.Venue);                                    // 142
if (Meteor.isServer) {                                                 // 143
  Venues.allow({                                                       // 144
    insert: function (userId, doc) {                                   // 145
      return true;                                                     // 146
    },                                                                 //
                                                                       //
    update: function (userId, doc, fieldNames, modifier) {             // 149
      return true;                                                     // 150
    },                                                                 //
                                                                       //
    remove: function (userId, doc) {                                   // 153
      return true;                                                     // 154
    }                                                                  //
  });                                                                  //
                                                                       //
  Venues.deny({                                                        // 158
    insert: function (userId, doc) {                                   // 159
      return false;                                                    // 160
    },                                                                 //
                                                                       //
    update: function (userId, doc, fieldNames, modifier) {             // 163
      return false;                                                    // 164
    },                                                                 //
                                                                       //
    remove: function (userId, doc) {                                   // 167
      return false;                                                    // 168
    }                                                                  //
  });                                                                  //
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=venues.js.map

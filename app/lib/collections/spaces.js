Spaces = new Mongo.Collection('spaces');
var Schemas = {};
Schemas.Space = new SimpleSchema({
    venue_id: {
      type: String,
      label: 'Venue ID'
    },
    type: {
      type: String,
      label: 'Space Type',
      optional: true
    },
    instant: {
      type: Boolean,
      label: 'Enable Instant Booking',
      optional: true
    },
    name: {
      type: String,
      label: 'Space Name'
    },
    poster: {
      type: String,
      label: 'Space Poster',
      optional: true
    },
    quantity: {
      type: String,
      label: 'Space Quantity',
      optional: true
    },
    detail: {
      type: String,
      label: 'Space Detail',
      optional: true
    },
    per_hour: {
      type: String,
      label: 'Space Cost Per hour',
      optional: true
    },
    per_day: {
      type: String,
      label: 'Space Cost Per Day',
      optional: true
    },
    per_month: {
      type: String,
      label: 'Space Cost Per Month',
      optional: true
    },
    createdBy:{
      type: String,
      optional: true
    },
    createdAt:{
      type: Date,
      optional: true
    },
    updatedBy:{
      type: String,
      optional: true
    },
    updatedAt:{
      type: Date,
      optional: true
    },
});

Spaces.attachSchema(Schemas.Space);
if (Meteor.isServer) {
  Spaces.allow({
    insert: function (userId, doc) {
      return true;
    },

    update: function (userId, doc, fieldNames, modifier) {
      return true;
    },

    remove: function (userId, doc) {
      return true;
    }
  });

  Spaces.deny({
    insert: function (userId, doc) {
      return false;
    },

    update: function (userId, doc, fieldNames, modifier) {
      return false;
    },

    remove: function (userId, doc) {
      return false;
    }
  });
}
Spaces.after.insert(function (userId, doc) {
    var venue = Venues.findOne(doc.venue_id);
    HTTP.call( 'PUT', 'http://localhost:9200/cowscastle/space/'+doc._id, {
      data: {
        "space": doc,
        "venue" : venue
      }
    }, function( error, response ) {
      if ( error ) {
        console.log( error );
      } else {
        console.log( response );
      }
    });
});
Spaces.after.update(function (userId, doc, fieldNames, modifier, options) {
    var venue = Venues.findOne(doc.venue_id);
    HTTP.call( 'POST', 'http://localhost:9200/cowscastle/space/'+doc._id+'/_update', {
      data: {
        "doc" : {
            "space": doc,
            "venue" : venue
        }
      }
    }, function( error, response ) {
      if ( error ) {
        console.log( error );
      } else {
        console.log( response );
      }
    });
}, {fetchPrevious:false});

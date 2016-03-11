Bookings = new Mongo.Collection('bookings');
var Schemas = {};
Schemas.Booking = new SimpleSchema({
    space_id: {
      type: String,
      label: 'Space ID'
    },
    date: {
      type: Number,
      label: 'Booking date'
    },
    duration: {
      type: String,
      label: 'Booking Duration'
    },
    amount: {
      type: String,
      label: 'Booking Amount'
    },
    type: {
      type: String,
      label: 'Booking Type'
    },
    confirm: {
      type: Boolean,
      label: 'Confirm status',
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

Bookings.attachSchema(Schemas.Booking);
if (Meteor.isServer) {
  Bookings.allow({
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

  Bookings.deny({
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

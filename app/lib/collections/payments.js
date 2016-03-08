Payments = new Mongo.Collection('payments');
var Schemas = {};
Schemas.Payment = new SimpleSchema({
    venue_id: {
      type: String,
      label: 'Venue ID'
    },
    bank_name: {
      type: String,
      label: 'Bank Name'
    },
    account_name: {
      type: String,
      label: 'Account Name'
    },
    account_number: {
      type: String,
      label: 'Account Number'
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

Payments.attachSchema(Schemas.Payment);
if (Meteor.isServer) {
  Payments.allow({
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

  Payments.deny({
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

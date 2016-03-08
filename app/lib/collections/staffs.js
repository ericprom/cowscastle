Staffs = new Mongo.Collection('staffs');
var Schemas = {};
Schemas.Staff = new SimpleSchema({
    team_id: {
      type: String,
      label: 'Team ID'
    },
    staff_id: {
      type: String,
      label: 'Staff ID'
    },
    role: {
      type: String,
      label: 'Staff Role',
      optional: true
    },
    accepted: {
      type: Boolean,
      label: 'Invitation accepted',
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

Staffs.attachSchema(Schemas.Staff);
if (Meteor.isServer) {
  Staffs.allow({
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

  Staffs.deny({
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

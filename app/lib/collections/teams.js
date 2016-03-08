Teams = new Mongo.Collection('teams');
var Schemas = {};
Schemas.Team = new SimpleSchema({
    venue_id: {
      type: String,
      label: 'Venue ID'
    },
    team_name: {
      type: String,
      label: 'Team Name',
      optional: true
    },
    team_logo: {
      type: String,
      label: 'Team Logo',
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

Teams.attachSchema(Schemas.Team);
if (Meteor.isServer) {
  Teams.allow({
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

  Teams.deny({
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

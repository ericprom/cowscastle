Venues = new Mongo.Collection('venues');
var Schemas = {};
Schemas.VenueLocation = new SimpleSchema({
  address: {
      type: String,
      label: 'Venue Address',
      optional: true
    },
    latlng: {
      type: [Number],
      decimal: true,
      optional: true
    },
    district: {
      type: String,
      label: 'Venue District',
      optional: true
    },
    city: {
      type: String,
      label: 'Venue City',
      optional: true
    },
    province: {
      type: String,
      label: 'Venue Province',
      optional: true
    },
    zipcode: {
      type: String,
      label: 'Venue Zipcode',
      optional: true
    },
    phone: {
      type: String,
      label: 'Venue Phone Number',
      optional: true
    },
    email: {
      type: String,
      label: 'Venue Email',
      optional: true
    },
    website: {
      type: String,
      label: 'Venue Website',
      optional: true
    },
});
Schemas.VenueDetail = new SimpleSchema({
    slogan: {
      type: String,
      label: 'Venue Slogan',
      optional: true
    },
    description: {
      type: String,
      label: 'Venue Description',
      optional: true
    },
    floors: {
      type: String,
      label: 'Venue Floor',
      optional: true
    },
    areas: {
      type: String,
      label: 'Venue Areas',
      optional: true
    },
    rooms: {
      type: String,
      label: 'Venue Rooms',
      optional: true
    },
    desks: {
      type: String,
      label: 'Venue Desks',
      optional: true
    },
    openhour:{
      type: [Object],
      optional:true,
      blackbox:true
    },
    nearby:{
      type: [Object],
      optional:true,
      blackbox:true
    },
});
Schemas.Venue = new SimpleSchema({
    name: {
      type: String,
      label: 'Venue Name'
    },
    logo: {
      type: String,
      label: 'Venue Logo',
      optional: true
    },
    gallery: {
      type: [Object],
      label: 'Venue Gallaery',
      optional: true,
      blackbox:true
    },
    location: {
      type: Schemas.VenueLocation,
      label: 'Venue Location',
      optional: true
    },
    detail: {
      type: Schemas.VenueDetail,
      label: 'Venue Detail',
      optional: true
    },
    facility:{
      type: [Object],
      optional:true,
      blackbox:true
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

Venues.attachSchema(Schemas.Venue);
if (Meteor.isServer) {
  Venues.allow({
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

  Venues.deny({
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

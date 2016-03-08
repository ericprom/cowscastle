var csLogo = new FS.Store.GridFS("Logos");
Logos = new FS.Collection("Logos",{
  stores: [csLogo]
});
if (Meteor.isServer) {
  Logos.allow({
    insert: function(userId, doc) {
            return true;
        },
        update: function(userId, doc, fieldNames, modifier) {
            return true;
        },
        remove: function(userId, doc) {
            return true;
        },
        download: function() {
            return true;
        }
  });

  Logos.deny({
    insert: function(userId, doc) {
            return false;
        },
        update: function(userId, doc, fieldNames, modifier) {
            return false;
        },
        remove: function(userId, doc) {
            return false;
        },
        download: function() {
            return false;
        }
  });
}

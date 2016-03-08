var csPoster = new FS.Store.GridFS("Posters");
Posters = new FS.Collection("Posters",{
  stores: [csPoster]
});
if (Meteor.isServer) {
  Posters.allow({
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

  Posters.deny({
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


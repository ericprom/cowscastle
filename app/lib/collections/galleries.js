var csGallery = new FS.Store.GridFS("Galleries");
Galleries = new FS.Collection("Galleries",{
  stores: [csGallery]
});
if (Meteor.isServer) {
  Galleries.allow({
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

  Galleries.deny({
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

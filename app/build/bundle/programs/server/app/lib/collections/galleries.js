(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// lib/collections/galleries.js                                        //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
var csGallery = new FS.Store.GridFS("Galleries");                      // 1
Galleries = new FS.Collection("Galleries", {                           // 2
    stores: [csGallery]                                                // 3
});                                                                    //
if (Meteor.isServer) {                                                 // 5
    Galleries.allow({                                                  // 6
        insert: function (userId, doc) {                               // 7
            return true;                                               // 8
        },                                                             //
        update: function (userId, doc, fieldNames, modifier) {         // 10
            return true;                                               // 11
        },                                                             //
        remove: function (userId, doc) {                               // 13
            return true;                                               // 14
        },                                                             //
        download: function () {                                        // 16
            return true;                                               // 17
        }                                                              //
    });                                                                //
                                                                       //
    Galleries.deny({                                                   // 21
        insert: function (userId, doc) {                               // 22
            return false;                                              // 23
        },                                                             //
        update: function (userId, doc, fieldNames, modifier) {         // 25
            return false;                                              // 26
        },                                                             //
        remove: function (userId, doc) {                               // 28
            return false;                                              // 29
        },                                                             //
        download: function () {                                        // 31
            return false;                                              // 32
        }                                                              //
    });                                                                //
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=galleries.js.map
